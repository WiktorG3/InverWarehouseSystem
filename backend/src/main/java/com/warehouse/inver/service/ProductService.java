package com.warehouse.inver.service;

import com.warehouse.inver.model.Order;
import com.warehouse.inver.model.Product;
import com.warehouse.inver.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product getProduct(Long id){
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Page<Product> getAllProducts(Pageable pageable){
        return productRepository.findAll(pageable);
    }

    public Page<Product> searchProduct(String searchTerm, Pageable pageable) {
        return productRepository.searchProduct(searchTerm.toLowerCase(), pageable);
    }

    public long getTotalProductCount() {
        return productRepository.count();
    }

    public Product createProduct(Product product){
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails){
        Product product = getProduct(id);
        product.setName(productDetails.getName());
        product.setCategory(productDetails.getCategory());
        product.setPrice(productDetails.getPrice());
        product.setBrand(productDetails.getBrand());
        product.setSupplier(productDetails.getSupplier());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id){
        Product product = getProduct(id);
        productRepository.delete(product);
    }
}