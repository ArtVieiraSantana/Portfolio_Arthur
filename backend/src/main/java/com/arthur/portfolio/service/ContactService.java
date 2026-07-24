package com.arthur.portfolio.service;

import com.arthur.portfolio.dto.ContactRequest;
import com.arthur.portfolio.exception.SpamDetectedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final JavaMailSender mailSender;

    @Value("${app.contact.email-enabled:false}")
    private boolean emailEnabled;

    @Value("${app.contact.destination-email}")
    private String destinationEmail;

    public ContactService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void processarMensagem(ContactRequest request) {
        // Honeypot preenchido = quase certamente um bot preenchendo todos os campos do form
        if (request.getWebsite() != null && !request.getWebsite().isBlank()) {
            throw new SpamDetectedException("Campo honeypot preenchido");
        }

        String nomeSanitizado = sanitizar(request.getName());
        String mensagemSanitizada = sanitizar(request.getMessage());

        log.info("Nova mensagem de contato recebida de {} <{}>", nomeSanitizado, request.getEmail());

        if (emailEnabled) {
            enviarEmail(nomeSanitizado, request.getEmail(), mensagemSanitizada);
        }
    }

    private void enviarEmail(String nome, String emailRemetente, String mensagem) {
        try {
            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(destinationEmail);
            email.setSubject("Novo contato pelo portfolio - " + nome);
            email.setText("Nome: " + nome + "\nEmail: " + emailRemetente + "\n\nMensagem:\n" + mensagem);
            mailSender.send(email);
        } catch (Exception e) {
            // Nao propagamos o erro de envio de e-mail para o usuario final;
            // a mensagem ja foi validada e registrada no log do servidor.
            log.error("Falha ao enviar e-mail de notificacao de contato", e);
        }
    }

    /**
     * Remove caracteres de controle e limita espacos, evitando injecao de
     * cabecalhos/log forging a partir de entradas do usuario.
     */
    private String sanitizar(String valor) {
        if (valor == null) {
            return "";
        }
        return valor.replaceAll("[\\r\\n\\t]", " ").trim();
    }
}
