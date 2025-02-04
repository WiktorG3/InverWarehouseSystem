package com.warehouse.inver.service;

import com.warehouse.inver.model.Product;
import com.warehouse.inver.model.Supplier;
import com.warehouse.inver.repository.SupplierRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {
    private final SupplierRepository supplierRepository;

    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public Supplier getSupplier(Long id){
        return supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
    }

    public Page<Supplier> getAllSuppliers(Pageable pageable){
        return supplierRepository.findAll(pageable);
    }

    public Page<Supplier> searchSupplier(String searchTerm, Pageable pageable) {
        return supplierRepository.searchSupplier(searchTerm.toLowerCase(), pageable);
    }

    public Supplier createSupplier(Supplier supplier){
        return supplierRepository.save(supplier);
    }

    public Supplier updateSupplier(Long id, Supplier supplierDetails){
        Supplier supplier = getSupplier(id);
        supplier.setName(supplierDetails.getName());
        supplier.setEmail(supplierDetails.getEmail());
        supplier.setPhone(supplierDetails.getPhone());
        supplier.setAddress(supplierDetails.getAddress());
        return supplierRepository.save(supplier);
    }

    public void deleteSupplier(Long id){
        Supplier supplier = getSupplier(id);
        supplierRepository.delete(supplier);
    }
}