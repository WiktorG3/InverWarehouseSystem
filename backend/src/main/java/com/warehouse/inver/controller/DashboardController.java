package com.warehouse.inver.controller;

import com.warehouse.inver.service.CustomerService;
import com.warehouse.inver.service.OrderService;
import com.warehouse.inver.service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.warehouse.inver.model.Order;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final OrderService orderService;
    private final ProductService productService;
    private final CustomerService customerService;

    public DashboardController(OrderService orderService, ProductService productService, CustomerService customerService) {
        this.orderService = orderService;
        this.productService = productService;
        this.customerService = customerService;
    }

    @GetMapping
    public Map<String, Object> getDashboardData() {
        Map<String, Object> data = new HashMap<>();
        data.put("totalCustomers", customerService.getAllCustomers().size());
        data.put("totalOrders", orderService.getTotalOrderAmount());
        data.put("totalProducts", productService.getAllProducts().size());
        data.put("todayOrders", orderService.getOrdersByDate(LocalDate.now()).size());
        return data;
    }
}
