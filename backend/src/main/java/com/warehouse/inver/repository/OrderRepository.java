package com.warehouse.inver.repository;

import com.warehouse.inver.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByOrderStatus(String status);
    Optional<Order> findByOrderNumber(String orderNumber);
}
