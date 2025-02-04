package com.warehouse.inver.repository;

import com.warehouse.inver.model.Customer;
import com.warehouse.inver.model.Product;
import com.warehouse.inver.model.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    Page<Supplier> findAll(Pageable pageable);

    @Query("SELECT s FROM Supplier s WHERE " +
            "LOWER(s.name) LIKE %:searchTerm% ")
    Page<Supplier> searchSupplier(@Param("searchTerm") String searchTerm, Pageable pageable);
    List<Supplier> findByName(String name);
    List<Supplier> findByEmail(String brand);
    List<Supplier> findByPhone(String phone);
    List<Supplier> findByAddress(String address);
}
