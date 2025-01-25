package com.warehouse.inver.repository;

import com.warehouse.inver.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByOrderStatus(String status);
    Optional<Order> findByOrderNumber(String orderNumber);

    @Query("SELECT o.orderStatus, COUNT(o) FROM Order o GROUP BY o.orderStatus")
    List<Object[]> findOrderCountByStatus();

    @Query("SELECT TO_CHAR(o.orderDate, 'YYYY-MM') AS month, COUNT(o) FROM Order o GROUP BY month ORDER BY month")
    List<Object[]> findMonthlyOrders();
}
