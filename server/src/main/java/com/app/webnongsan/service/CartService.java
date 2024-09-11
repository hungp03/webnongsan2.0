package com.app.webnongsan.service;

import com.app.webnongsan.domain.*;
import com.app.webnongsan.domain.response.PaginationDTO;
import com.app.webnongsan.domain.response.cart.CartItemDTO;
import com.app.webnongsan.repository.CartRepository;
import com.app.webnongsan.repository.ProductRepository;
import com.app.webnongsan.repository.UserRepository;
import com.app.webnongsan.util.PaginationHelper;
import com.app.webnongsan.util.SecurityUtil;
import com.app.webnongsan.util.exception.ResourceInvalidException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PaginationHelper paginationHelper;

    public Cart addToCart(Cart cart) throws ResourceInvalidException {
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        User u = this.userRepository.findByEmail(email);
        if (u == null){
            throw new ResourceInvalidException("User không tồn tại");
        }
        Product p = this.productRepository.findById(cart.getId().getProductId()).orElseThrow(()-> new ResourceInvalidException("Product không tồn tại"));
        if (cart.getQuantity() > p.getQuantity()){
            throw new ResourceInvalidException("Số lượng hàng không đủ");
        }
        cart.setUser(u);
        cart.setProduct(p);
        return this.cartRepository.save(cart);
    }

    public void deleteFromCart(long productId) throws ResourceInvalidException {
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        User user = this.userRepository.findByEmail(email);

        if (user == null) {
            throw new ResourceInvalidException("User không tồn tại");
        }

        boolean exists = this.cartRepository.existsByUserIdAndProductId(user.getId(), productId);
        if (!exists) {
            throw new ResourceInvalidException("Sản phẩm không tồn tại trong giỏ hàng");
        }

        CartId cartId = new CartId(user.getId(), productId);
        this.cartRepository.deleteById(cartId);
    }

    public PaginationDTO getCartByCurrentUser(Pageable pageable) throws ResourceInvalidException {
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        User user = this.userRepository.findByEmail(email);

        if (user == null) {
            throw new ResourceInvalidException("User không tồn tại");
        }

        Page<CartItemDTO> cartItems = this.cartRepository.findCartItemsByUserId(user.getId(), pageable);
        return this.paginationHelper.fetchAllEntities(cartItems);
    }

    public Cart updateProductQuantity(long productId, int newQuantity) throws ResourceInvalidException {
        long userId = SecurityUtil.getUserId();
        CartId cartId = new CartId(userId, productId);
        Optional<Cart> optionalCart = cartRepository.findById(cartId);

        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            Product product = this.productRepository.findById(productId)
                    .orElseThrow(() -> new ResourceInvalidException("Product không tồn tại"));

            if (newQuantity > product.getQuantity()) {
                throw new ResourceInvalidException("Số lượng hàng không đủ");
            }

            cart.setQuantity(newQuantity);
            return cartRepository.save(cart);
        } else {
            throw new ResourceInvalidException("Sản phẩm không tồn tại trong giỏ hàng");
        }
    }

}
