package com.project.e_commerace.config;

import com.project.e_commerace.model.Category;
import com.project.e_commerace.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        initializeCategories();
    }

    private void initializeCategories() {
        List<String> categories = Arrays.asList("clothes", "food", "electronics", "lifestyle");

        for (String catName : categories) {
            if (categoryRepository.findAll().stream().noneMatch(c -> c.getName().equalsIgnoreCase(catName))) {
                Category category = new Category();
                category.setName(catName);
                categoryRepository.save(category);
                System.out.println("Initialized category: " + catName);
            }
        }
    }
}
