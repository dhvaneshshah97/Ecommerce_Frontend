import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
// import { Link } from 'react-router-dom';
import { listOrders } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([])

    const { user, token } = isAuthenticated()

    const loadOrders = async () => {
        try{
            const data = await listOrders(user._id, token);
            setOrders(data);    
        } catch(error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        loadOrders()
    }, [])

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return(
            <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
            )
        } else {
            return <h1 className="text-danger">No orders</h1>
        }
    }

    return (
        <Layout title="Orders" description={`Hi ${user.name}, you can manage all the orders here`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    
                    {orders.map((o, oIndex) => {
                        return (
                            <div className="mt-5" key={oIndex} style={{borderBottom: "5px solid indigo"}}>
                                <h2 className="mb-5">
                                    <span className="bg-primary">Order ID: {o._id} </span>
                                </h2>

                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        Status: {o.status}
                                    </li>
                                    <li className="list-group-item">
                                        Transaction ID: {o.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered By: {o.user.name}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on: {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery Address: {o.address}
                                    </li>
                                </ul>

                                <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order: {o.products.length}
                                </h3>
                            </div>
                        )
                    })}
                </div>

            </div>
        </Layout>
    ); 
}

export default Orders