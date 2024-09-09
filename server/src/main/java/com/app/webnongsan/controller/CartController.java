package com.app.webnongsan.controller;

import com.app.webnongsan.domain.Cart;
import com.app.webnongsan.service.CartService;
import com.app.webnongsan.util.SecurityUtil;
import com.app.webnongsan.util.annotation.ApiMessage;
import com.app.webnongsan.util.exception.IdInvalidException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v2")
@AllArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping("cart")
    @ApiMessage("Add to cart")
    public ResponseEntity<Cart> add(@RequestBody Cart cart) throws IdInvalidException {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.cartService.addToCart(cart));
    }

    @GetMapping("test")
    public ResponseEntity<Optional<String>> test(){
        return ResponseEntity.ok(SecurityUtil.getCurrentUserLogin());
    }
}
