package com.arthur.portfolio.exception;

/**
 * Lancada quando o honeypot do formulario de contato vem preenchido,
 * indicando fortemente que a requisicao foi feita por um bot.
 */
public class SpamDetectedException extends RuntimeException {
    public SpamDetectedException(String message) {
        super(message);
    }
}
