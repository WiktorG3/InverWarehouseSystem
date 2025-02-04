package com.warehouse.inver.repository;

import com.warehouse.inver.model.Order;
import com.warehouse.inver.model.Product;
import com.warehouse.inver.model.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findAll(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.name) LIKE %:searchTerm% ")
    Page<Product> searchProduct(@Param("searchTerm") String searchTerm, Pageable pageable);
    List<Product> findByCategory(String category);
    List<Product> findByBrand(String brand);
    List<Product> findByCategoryAndBrand(String category, String brand);
    List<Product> findBySupplier(Supplier supplier);
}
