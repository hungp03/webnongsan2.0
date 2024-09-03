package com.app.webnongsan.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "categories")
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    private String imageUrl;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category")
    private List<Product> products;
}
