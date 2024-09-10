package com.app.webnongsan.domain.response.wishlist;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class WishlistItemDTO {
    private Long productId;
    private String productName;
    private Double productPrice;
    private String productImageUrl;
}
