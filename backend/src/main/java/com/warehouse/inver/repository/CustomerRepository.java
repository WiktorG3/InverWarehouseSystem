package com.warehouse.inver.repository;

import com.warehouse.inver.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByEmail(String email);
    Customer findByFirstNameAndLastName(String firstName, String lastName);
    Customer findByPhone(String phoneNumber);
}
