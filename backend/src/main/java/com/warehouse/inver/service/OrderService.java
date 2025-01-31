package com.warehouse.inver.service;

import com.warehouse.inver.dto.order.OrderItemRequest;
import com.warehouse.inver.model.Customer;
import com.warehouse.inver.model.Order;
import com.warehouse.inver.model.OrderItem;
import com.warehouse.inver.model.Product;
import com.warehouse.inver.repository.CustomerRepository;
import com.warehouse.inver.repository.OrderItemRepository;
import com.warehouse.inver.repository.OrderRepository;
import com.warehouse.inver.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, ProductRepository productRepository, CustomerRepository customerRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
    }

    public Order getOrderById(Long id){
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    public Order createOrder(Long customerId, List<OrderItemRequest> orderItems){
        Order order = new Order();
        order.setOrderNumber(generateOrderNumber());
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus("NEW");
        order.setOrderAmount(BigDecimal.ZERO);

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        order.setCustomer(customer);
        orderRepository.save(order);

        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : orderItems) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getQuantity() < itemRequest.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(itemRequest.getQuantity());
            item.setUnitPrice(product.getPrice());
            orderItemRepository.save(item);

            BigDecimal lineTotal = product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            total = total.add(lineTotal);

            product.setQuantity(product.getQuantity() - itemRequest.getQuantity());
            productRepository.save(product);
        }

        order.setOrderAmount(total);
        return orderRepository.save(order);
    }

    public Order updateOrderStatus(Long id, Order orderDetails){
        Order order = getOrderById(id);
        order.setOrderStatus(orderDetails.getOrderStatus());
        return orderRepository.save(order);
    }

    public void deleteOrder(Long id){
        Order order = getOrderById(id);
        orderRepository.delete(order);
    }

    private String generateOrderNumber(){
        long count = orderRepository.count() + 1;
        return "ORDER-" + LocalDateTime.now().getYear() + "-" + LocalDateTime.now().getMonth() + "-" + count;
    }

    public List<Map<String, Object>> getOrdersByStatus() {
        return orderRepository.findOrderCountByStatus().stream()
                .map(row -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("status", row[0]);
                    result.put("count", row[1]);
                    return result;
                }).toList();
    }

    public List<Order> getOrdersByDate(LocalDate date) {
        return orderRepository.findAll().stream()
                .filter(order -> order.getOrderDate().toLocalDate().equals(date)).collect(Collectors.toList());
    }

    public List<Map<String, Object>> getMonthlyOrders() {
        return orderRepository.findMonthlyOrders().stream()
                .map(row -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("month", (String) row[0]);
                    result.put("count", (Long) row[1]);
                    return result;
                }).toList();
    }
}