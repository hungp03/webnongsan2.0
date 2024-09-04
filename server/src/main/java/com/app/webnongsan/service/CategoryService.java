package com.app.webnongsan.service;

import com.app.webnongsan.domain.Category;
import com.app.webnongsan.domain.response.PaginationDTO;
import com.app.webnongsan.repository.CategoryRepository;
import com.app.webnongsan.repository.ProductRepository;
import com.app.webnongsan.util.exception.IdInvalidException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public boolean isCategoryExisted(String name){
        return this.categoryRepository.existsByName(name);
    }
    public Category create(Category category){
        return this.categoryRepository.save(category);
    }

    public boolean isCategoryNameUnique(Long id, String name) {
        return !categoryRepository.existsByNameAndNotId(name, id);
    }

    public Category findById(long id){
        return this.categoryRepository.findById(id).orElse(null);
    }
    public Category update(Category category){
        Category curr = this.findById(category.getId());
        if (curr != null){
            curr.setName(category.getName());
            curr.setImageUrl(category.getImageUrl());
        }
        assert curr != null;
        return categoryRepository.save(curr);
    }



    public void delete(long id) throws IdInvalidException {
        if (productRepository.existsByCategoryId(id)) {
            throw new IdInvalidException("Không thể xóa vì category này vẫn còn sản phẩm liên quan.");
        }

        // Nếu không có sản phẩm nào liên quan, thực hiện xóa
        categoryRepository.deleteById(id);
    }

    public PaginationDTO fetchAllCategories(Specification<Category> specification, Pageable pageable) {
        Page<Category> categories = this.categoryRepository.findAll(specification, pageable);
        PaginationDTO rs = new PaginationDTO();
        PaginationDTO.Meta meta = new PaginationDTO.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(categories.getTotalPages());
        meta.setTotal(categories.getTotalElements());

        rs.setMeta(meta);
        rs.setResult(categories.getContent());
        return rs;
    }
}
