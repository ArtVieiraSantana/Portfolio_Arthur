package com.arthur.portfolio.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Filtro simples de rate limiting em memoria, aplicado apenas ao endpoint
 * de contato (POST /api/contact), para evitar flood/spam.
 *
 * Para producao com multiplas instancias, o ideal seria usar um contador
 * centralizado (ex: Redis) em vez de memoria local - aqui optamos por uma
 * solucao simples e didatica, suficiente para um portfolio pessoal.
 */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final ConcurrentHashMap<String, RequestWindow> requestsByIp = new ConcurrentHashMap<>();

    @Value("${app.contact.rate-limit.max-requests:5}")
    private int maxRequests;

    @Value("${app.contact.rate-limit.window-minutes:15}")
    private long windowMinutes;

    private static final String PROTECTED_PATH = "/api/contact";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        boolean isProtectedPost = "POST".equalsIgnoreCase(request.getMethod())
                && request.getRequestURI().startsWith(PROTECTED_PATH);

        if (!isProtectedPost) {
            filterChain.doFilter(request, response);
            return;
        }

        String clientIp = resolveClientIp(request);
        RequestWindow window = requestsByIp.computeIfAbsent(clientIp, ip -> new RequestWindow());

        if (window.isExpired(windowMinutes)) {
            window.reset();
        }

        int count = window.increment();

        if (count > maxRequests) {
            response.setStatus(429);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(
                    "{\"success\":false,\"message\":\"Muitas tentativas. Aguarde alguns minutos antes de enviar novamente.\"}"
            );
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String resolveClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private static class RequestWindow {
        private volatile Instant start = Instant.now();
        private final AtomicInteger count = new AtomicInteger(0);

        boolean isExpired(long windowMinutes) {
            return Duration.between(start, Instant.now()).toMinutes() >= windowMinutes;
        }

        void reset() {
            start = Instant.now();
            count.set(0);
        }

        int increment() {
            return count.incrementAndGet();
        }
    }
}
