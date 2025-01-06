package com.warehouse.inver.controller;

import com.warehouse.inver.dto.order.CreateOrderRequest;
import com.warehouse.inver.dto.order.OrderItemResponse;
import com.warehouse.inver.dto.order.OrderResponse;
import com.warehouse.inver.model.Order;
import com.warehouse.inver.service.OrderService;
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
    public List<OrderResponse> getAllOrders() {
        return orderService.getAllOrders()
                            .stream()
                .map(this::mapToOrderResponse)
                .collect(Collectors.toList());
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
