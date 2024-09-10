package com.app.webnongsan.repository;

import com.app.webnongsan.domain.Cart;
import com.app.webnongsan.domain.CartId;
import com.app.webnongsan.domain.response.cart.CartItemDTO;
import com.app.webnongsan.domain.response.wishlist.WishlistItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, CartId>, JpaSpecificationExecutor<Cart> {
    @Query("SELECT COUNT(c) > 0 FROM Cart c WHERE c.user.id = :userId AND c.product.id = :productId")
    boolean existsByUserIdAndProductId(@Param("userId") Long userId, @Param("productId") Long productId);
    @Query("SELECT new com.app.webnongsan.domain.response.cart.CartItemDTO" +
            "(p.id, p.product_name, p.price, c.quantity, p.imageUrl) " +
            "FROM Cart c JOIN c.product p " +
            "WHERE c.user.id = :userId " +
            "ORDER BY c.timestamp DESC")
    Page<CartItemDTO> findCartItemsByUserId(@Param("userId") Long userId, Pageable pageable);
}
