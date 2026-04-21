package com.project.e_commerace.controller;

import com.project.e_commerace.dto.OrderRequest;
import com.project.e_commerace.model.Address;
import com.project.e_commerace.model.Order;
import com.project.e_commerace.model.User;
import com.project.e_commerace.repository.AddressRepository;
import com.project.e_commerace.repository.UserRepository;
import com.project.e_commerace.repository.OrderRepository;
import com.project.e_commerace.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest orderRequest, org.springframework.security.core.Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElse(null);
        Address address = addressRepository.findById(orderRequest.getAddressId()).orElse(null);

        if (user == null || address == null) {
            return ResponseEntity.badRequest().body("User or Address not found!");
        }

        Order order = new Order();
        order.setUser(user);
        order.setAddress(address);
        order.setTotalAmount(orderRequest.getTotalAmount());
        order.setOrderStatus("PENDING");
        // Random tracking number for imitation
        order.setTrackingNumber("TRK" + System.currentTimeMillis());
        order.setEstimatedDeliveryDate(java.time.LocalDateTime.now().plusDays(5));

        Order finalOrder = orderService.placeOrder(order, user);

        return ResponseEntity.ok(finalOrder);
    }

    @GetMapping("/my-orders")
    public ResponseEntity<java.util.List<Order>> getMyOrders(org.springframework.security.core.Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        return ResponseEntity.ok(orderRepository.findByUserId(user.getId()));
    }

    @GetMapping("/track/{trackingNumber}")
    public ResponseEntity<?> trackOrder(@PathVariable String trackingNumber) {
        Optional<Order> order = orderRepository.findByTrackingNumber(trackingNumber);
        if (order.isPresent()) {
            return ResponseEntity.ok(order.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
