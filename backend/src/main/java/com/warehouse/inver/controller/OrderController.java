package com.warehouse.inver.controller;

import com.warehouse.inver.dto.order.CreateOrderRequest;
import com.warehouse.inver.dto.order.OrderItemResponse;
import com.warehouse.inver.dto.order.OrderResponse;
import com.warehouse.inver.model.Order;
import com.warehouse.inver.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public Page<OrderResponse> getAllOrders(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(required = false) String searchTerm) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> orders;

        if (searchTerm != null && !searchTerm.isEmpty()) {
            orders = orderService.searchOrders(searchTerm, pageable);
        } else {
            orders = orderService.getAllOrders(pageable);
        }

        return orders.map(this::mapToOrderResponse);
    }

    @GetMapping("/{id}")
    public OrderResponse getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return mapToOrderResponse(order);
    }

    @PostMapping
    public Order createOrder(@RequestBody CreateOrderRequest request) {
        return orderService.createOrder(request.getCustomerId(), request.getOrderItems());
    }

    private OrderResponse mapToOrderResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setOrderNumber(order.getOrderNumber());
        response.setOrderDate(order.getOrderDate());
        response.setOrderAmount(order.getOrderAmount());
        response.setOrderStatus(order.getOrderStatus());
        response.setCustomerName(order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName());
        response.setItems(order.getOrderItems()
                .stream()
                .map(item -> new OrderItemResponse(item.getProduct().getName(),
                        item.getQuantity(),
                        item.getUnitPrice()))
                .collect(Collectors.toList()));
        return response;
    }
}
