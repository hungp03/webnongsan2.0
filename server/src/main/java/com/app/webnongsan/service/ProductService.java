package com.app.webnongsan.service;

import com.app.webnongsan.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProductService{
    private final ProductRepository productRepository;

}
