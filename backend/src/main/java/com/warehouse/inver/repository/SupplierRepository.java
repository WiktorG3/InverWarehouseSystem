package com.warehouse.inver.repository;

import com.warehouse.inver.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    List<Supplier> findByName(String name);
    List<Supplier> findByEmail(String brand);
    List<Supplier> findByPhone(String phone);
    List<Supplier> findByAddress(String address);
}
