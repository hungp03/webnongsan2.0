package com.app.webnongsan.domain.response.cart;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CartItemDTO {
    private Long productId;
    private String productName;
    private Double productPrice;
    private int quantity;
    private String productImageUrl;
}
