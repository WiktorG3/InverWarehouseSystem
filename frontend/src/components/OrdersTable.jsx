import React from 'react';

const OrdersTable = ({ orders }) => {
    if (!Array.isArray(orders) || orders.length === 0) {
        return <div>No orders found.</div>;
    }
    return (
        <div className="orders-table-container">
            <table className="orders-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Order Number</th>
                    <th>Order Date</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                    <th>Customer</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.orderNumber}</td>
                        <td>
                            {order.orderDate}
                        </td>
                        <td>{order.orderAmount?.toFixed(2)}</td>
                        <td>{order.orderStatus}</td>
                        <td>{order.customerName}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;