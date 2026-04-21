package com.project.e_commerace.service;

import com.project.e_commerace.model.Order;
import com.project.e_commerace.model.User;
import com.project.e_commerace.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EmailService emailService;

    public Order placeOrder(Order order, User user) {
        // Set Tracking and Delivery Info
        order.setTrackingNumber("TRK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setEstimatedDeliveryDate(LocalDateTime.now().plusDays(4));
        order.setOrderStatus("ORDERED"); // Step 1: Ordered
        
        // Save order logic
        Order savedOrder = orderRepository.save(order);

        // Send Email to User
        emailService.sendOrderConfirmation(user.getEmail(), savedOrder.getId(), savedOrder.getTotalAmount());
        
        // Send Admin Notification to varshithka@gmail.com
        emailService.sendAdminNotification(savedOrder.getId(), savedOrder.getTotalAmount());

        return savedOrder;
    }

    public Order updateStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setOrderStatus(status);
        return orderRepository.save(order);
    }
}
