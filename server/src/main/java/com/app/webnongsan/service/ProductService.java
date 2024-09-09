package com.app.webnongsan.service;

import com.app.webnongsan.domain.Product;
import com.app.webnongsan.domain.response.PaginationDTO;
import com.app.webnongsan.domain.response.product.ResProductDTO;
import com.app.webnongsan.repository.CategoryRepository;
import com.app.webnongsan.repository.ProductRepository;
import com.app.webnongsan.util.PaginationHelper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProductService{
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final PaginationHelper paginationHelper;

    public boolean checkValidCategoryId(long categoryId){
        return this.categoryRepository.existsById(categoryId);
    }

    public Product create(Product p){
        return this.productRepository.save(p);
    }


    public boolean checkValidProductId(long id) {
        return this.productRepository.existsById(id);
    }

    public Product get(long id) {
        return this.productRepository.findById(id).orElse(null);
    }

    public void delete(long id){
        this.productRepository.deleteById(id);
    }

    public PaginationDTO getAll(Specification<Product> spec, Pageable pageable){
        return this.paginationHelper.fetchAllEntities(spec, pageable, productRepository);
    }

    public Product findById(long id){
        return this.productRepository.findById(id).orElse(null);
    }

    public Product update(Product p){
        Product curr = this.findById(p.getId());
        if (curr != null){
            curr.setProduct_name(p.getProduct_name());
            curr.setPrice(p.getPrice());
            curr.setImageUrl(p.getImageUrl());
            curr.setDescription(p.getDescription());
            curr.setQuantity(p.getQuantity());
            curr.setUnit(p.getUnit());
        }
        assert curr != null;
        return this.productRepository.save(curr);
    }
}
