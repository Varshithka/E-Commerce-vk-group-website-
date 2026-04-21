package com.project.e_commerace.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOrderConfirmation(String toEmail, Long orderId, Double totalAmount) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Order Confirmation - Order #" + orderId);
        message.setText("Dear Customer,\n\nYour order #" + orderId + " has been placed successfully.\nTotal Amount: $" + totalAmount + "\n\nThank you for shopping with us!");
        
        try {
            mailSender.send(message);
        } catch(Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

    public void sendAdminNotification(Long orderId, Double totalAmount) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("varshithka@gmail.com");
        message.setSubject("New Order Placed - Order #" + orderId);
        message.setText("A new order #" + orderId + " has been placed successfully.\nTotal Amount: $" + totalAmount + "\n\nPlease review in the admin dashboard.");
        
        try {
            mailSender.send(message);
        } catch(Exception e) {
            System.err.println("Failed to send admin email: " + e.getMessage());
        }
    }
}
