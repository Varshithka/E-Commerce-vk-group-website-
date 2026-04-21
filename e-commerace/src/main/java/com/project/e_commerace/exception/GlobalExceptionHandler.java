package com.project.e_commerace.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<com.project.e_commerace.dto.ErrorResponse> handleGlobalException(Exception ex, WebRequest request) {
        com.project.e_commerace.dto.ErrorResponse error = new com.project.e_commerace.dto.ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                ex.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<com.project.e_commerace.dto.ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        com.project.e_commerace.dto.ErrorResponse error = new com.project.e_commerace.dto.ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(org.springframework.security.authentication.BadCredentialsException.class)
    public ResponseEntity<com.project.e_commerace.dto.ErrorResponse> handleBadCredentialsException(org.springframework.security.authentication.BadCredentialsException ex) {
        com.project.e_commerace.dto.ErrorResponse error = new com.project.e_commerace.dto.ErrorResponse(
                HttpStatus.UNAUTHORIZED.value(),
                "Invalid email or password"
        );
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    // Add more specific handlers as needed (e.g., for BadCredentials, Validation, etc.)
}
