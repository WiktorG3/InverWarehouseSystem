package com.warehouse.inver.service;

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
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
    }

    public Order getOrderById(Long id){
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    public Order createOrder(List<Long> productIds, List<Integer> quantities){
        Order order = new Order();
        order.setOrderNumber(generateOrderNumber());
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus("NEW");
        order.setOrderAmount(BigDecimal.ZERO);
        orderRepository.save(order);

        BigDecimal total = BigDecimal.ZERO;
        for(int i = 0; i < productIds.size(); i++){
            Long productId = productIds.get(i);
            Integer quantity = quantities.get(i);

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            BigDecimal price = product.getPrice();
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(quantity);
            item.setUnitPrice(price);
            orderItemRepository.save(item);

            BigDecimal lineTotal = price.multiply(BigDecimal.valueOf(quantity));
            total = total.add(lineTotal);
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
}