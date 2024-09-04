package com.app.webnongsan.controller;

import com.app.webnongsan.domain.Category;
import com.app.webnongsan.domain.response.category.CategoryDTO;
import com.app.webnongsan.service.CategoryService;
import com.app.webnongsan.util.annotation.ApiMessage;
import com.app.webnongsan.util.exception.IdInvalidException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v2")
@AllArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("categories")
    @ApiMessage("Create category")
    public ResponseEntity<CategoryDTO> create(@Valid @RequestBody Category category) throws IdInvalidException {
        if (this.categoryService.isCategoryExisted(category.getName())){
            throw new IdInvalidException("Category đã tồn tại");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(this.categoryService.create(category));
    }

    @PutMapping("categories")
    @ApiMessage("Update category")
    public ResponseEntity<CategoryDTO> update(@Valid @RequestBody Category category) throws IdInvalidException {
        if (!this.categoryService.isCategoryNameUnique(category.getId(), category.getName())){
            throw new IdInvalidException("Category bị trùng");
        }
        return ResponseEntity.ok(this.categoryService.update(category));
    }
}
