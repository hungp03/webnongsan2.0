package com.app.webnongsan.service;

import com.app.webnongsan.domain.Cart;
import com.app.webnongsan.domain.Product;
import com.app.webnongsan.domain.User;
import com.app.webnongsan.repository.CartRepository;
import com.app.webnongsan.repository.ProductRepository;
import com.app.webnongsan.repository.UserRepository;
import com.app.webnongsan.util.SecurityUtil;
import com.app.webnongsan.util.exception.IdInvalidException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public Cart addToCart(Cart cart) throws IdInvalidException {
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        User u = this.userRepository.findByEmail(email);
        if (u == null){
            throw new IdInvalidException("User không tồn tại");
        }
        Product p = this.productRepository.findById(cart.getId().getProductId()).orElseThrow(()-> new IdInvalidException("Product không tồn tại"));
        cart.setUser(u);
        cart.setProduct(p);
        return this.cartRepository.save(cart);
    }
}
