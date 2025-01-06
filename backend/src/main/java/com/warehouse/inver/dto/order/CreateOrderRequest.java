package com.warehouse.inver.dto.order;

import com.warehouse.inver.repository.OrderItemRepository;

import java.util.List;

public class CreateOrderRequest {
    private Long customerId;
    private List<OrderItemRequest> orderItems;

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public List<OrderItemRequest> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemRequest> orderItems) {
        this.orderItems = orderItems;
    }
}
