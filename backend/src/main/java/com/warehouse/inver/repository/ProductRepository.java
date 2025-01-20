package com.warehouse.inver.repository;

import com.warehouse.inver.model.Product;
import com.warehouse.inver.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByBrand(String brand);
    List<Product> findByCategoryAndBrand(String category, String brand);
    List<Product> findBySupplier(Supplier supplier);
}
