package com.arthur.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Dados recebidos do formulario de contato do portfolio.
 * O campo "website" e um honeypot: deve chegar sempre vazio.
 * Se vier preenchido, a requisicao e tratada como spam (ver ContactService).
 */
public class ContactRequest {

    @NotBlank(message = "O nome e obrigatorio")
    @Size(min = 2, max = 100, message = "O nome deve ter entre 2 e 100 caracteres")
    private String name;

    @NotBlank(message = "O e-mail e obrigatorio")
    @Email(message = "Informe um e-mail valido")
    @Size(max = 150, message = "O e-mail informado e muito longo")
    private String email;

    @NotBlank(message = "A mensagem e obrigatoria")
    @Size(min = 10, max = 2000, message = "A mensagem deve ter entre 10 e 2000 caracteres")
    private String message;

    // Honeypot anti-spam - nao deve ser exibido nem preenchido por humanos
    @Size(max = 0, message = "Requisicao invalida")
    private String website = "";

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }
}
