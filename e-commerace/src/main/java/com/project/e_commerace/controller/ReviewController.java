package com.project.e_commerace.controller;

import com.project.e_commerace.model.Product;
import com.project.e_commerace.model.Review;
import com.project.e_commerace.model.User;
import com.project.e_commerace.repository.ProductRepository;
import com.project.e_commerace.repository.ReviewRepository;
import com.project.e_commerace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getProductReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewRepository.findByProductId(productId));
    }

    @PostMapping("/product/{productId}")
    public ResponseEntity<?> addReview(@PathVariable Long productId, @RequestBody Review review, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        review.setUser(user);
        review.setProduct(product);
        Review savedReview = reviewRepository.save(review);
        
        return ResponseEntity.ok(savedReview);
    }
}
