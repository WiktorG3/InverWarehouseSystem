package com.warehouse.inver.repository;

import com.warehouse.inver.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findAll(Pageable pageable);

    @Query("SELECT o FROM Order o WHERE " +
            "LOWER(o.orderNumber) LIKE %:searchTerm% OR " +
            "LOWER(o.orderStatus) LIKE %:searchTerm%")
    Page<Order> searchOrders(@Param("searchTerm") String searchTerm, Pageable pageable);


    @Query("SELECT SUM(o.orderAmount) FROM Order o")
    BigDecimal getTotalOrderAmount();
    List<Order> findByOrderStatus(String status);
    Optional<Order> findByOrderNumber(String orderNumber);

    @Query("SELECT o.orderStatus, COUNT(o) FROM Order o GROUP BY o.orderStatus")
    List<Object[]> findOrderCountByStatus();

    @Query("SELECT TO_CHAR(o.orderDate, 'YYYY-MM') AS month, COUNT(o) FROM Order o GROUP BY month ORDER BY month")
    List<Object[]> findMonthlyOrders();



    @Query("SELECT TO_CHAR(o.orderDate, 'YYYY-MM'), SUM(oi.quantity * oi.unitPrice), SUM(o.orderAmount) " +
            "FROM Order o JOIN OrderItem oi ON o.id = oi.order.id " +
            "GROUP BY TO_CHAR(o.orderDate, 'YYYY-MM') ORDER BY TO_CHAR(o.orderDate, 'YYYY-MM')")
    List<Object[]> getMonthlyRevenueAndCosts();

}
