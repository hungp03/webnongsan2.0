package com.app.webnongsan.service;

import com.app.webnongsan.domain.Category;
import com.app.webnongsan.domain.response.category.CategoryDTO;
import com.app.webnongsan.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public boolean isCategoryExisted(String name){
        return this.categoryRepository.existsByName(name);
    }
    public CategoryDTO create(Category category){
        return convertToDTO(this.categoryRepository.save(category));
    }

    public boolean isCategoryNameUnique(Long id, String name) {
        return !categoryRepository.existsByNameAndNotId(name, id);
    }

    public Category findById(long id){
        return this.categoryRepository.findById(id).orElse(null);
    }
    public CategoryDTO update(Category category){
        Category curr = this.findById(category.getId());
        if (curr != null){
            curr.setName(category.getName());
            curr.setImageUrl(category.getImageUrl());
        }
        assert curr != null;
        return convertToDTO(categoryRepository.save(curr));
    }

    public CategoryDTO convertToDTO(Category c){
        return new CategoryDTO(c.getId(), c.getName(), c.getImageUrl());
    }
}
