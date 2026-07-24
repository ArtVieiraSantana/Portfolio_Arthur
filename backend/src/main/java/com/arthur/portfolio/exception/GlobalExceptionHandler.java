package com.arthur.portfolio.exception;

import com.arthur.portfolio.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> erros = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(fieldError ->
                erros.put(fieldError.getField(), fieldError.getDefaultMessage())
        );

        ApiResponse<Map<String, String>> body =
                ApiResponse.fail("Verifique os campos do formulario e tente novamente.");
        body.setData(erros);

        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(SpamDetectedException.class)
    public ResponseEntity<ApiResponse<Void>> handleSpam(SpamDetectedException ex) {
        log.warn("Requisicao de contato bloqueada por suspeita de spam: {}", ex.getMessage());
        // Retornamos 200 "de mentira" para nao dar dica a bots sobre a deteccao,
        // mas sem processar a mensagem de fato.
        return ResponseEntity.ok(ApiResponse.ok("Mensagem recebida com sucesso!"));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneric(Exception ex) {
        log.error("Erro inesperado na API", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.fail("Ocorreu um erro inesperado. Tente novamente mais tarde."));
    }
}
