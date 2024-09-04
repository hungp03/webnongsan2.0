package com.app.webnongsan.domain.response.category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CategoryDTO {
    private long id;
    private String name;
    private String imageUrl;
}
