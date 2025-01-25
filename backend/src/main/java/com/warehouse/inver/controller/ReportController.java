package com.warehouse.inver.controller;

import com.warehouse.inver.model.Order;
import com.warehouse.inver.service.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final OrderService orderService;

    public ReportController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/orders-by-status")
    public List<Map<String, Object>> getOrdersByStatus() {
        return orderService.getOrdersByStatus();
    }

    @GetMapping("/monthly-orders")
    public List<Map<String, Object>> getMonthlyOrders() {
        return orderService.getMonthlyOrders();
    }
}
