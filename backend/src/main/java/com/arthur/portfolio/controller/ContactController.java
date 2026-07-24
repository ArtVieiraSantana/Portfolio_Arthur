package com.arthur.portfolio.controller;

import com.arthur.portfolio.dto.ApiResponse;
import com.arthur.portfolio.dto.ContactRequest;
import com.arthur.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> receberMensagem(@Valid @RequestBody ContactRequest request) {
        contactService.processarMensagem(request);
        return ResponseEntity.ok(ApiResponse.ok("Mensagem enviada com sucesso! Obrigado pelo contato."));
    }
}
