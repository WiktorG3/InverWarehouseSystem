package com.warehouse.inver.repository;

import com.warehouse.inver.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Page<Customer> findAll(Pageable pageable);

    @Query("SELECT c FROM Customer c WHERE " +
            "LOWER(c.firstName) LIKE %:searchTerm% OR " +
            "LOWER(c.lastName) LIKE %:searchTerm%")
    Page<Customer> searchCustomer(@Param("searchTerm") String searchTerm, Pageable pageable);
    Customer findByEmail(String email);
    Customer findByFirstNameAndLastName(String firstName, String lastName);
    Customer findByPhone(String phoneNumber);
}
