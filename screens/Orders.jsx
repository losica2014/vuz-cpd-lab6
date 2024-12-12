import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import OrderItem from '../components/OrderItem';

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/carts')
        .then(res => res.json())
        .then(res => setOrders(res.carts.map(cart => ({id: cart.id, amount: cart.totalProducts, total: cart.total}))));
    }, []);

    const removeItem = (id) => {
        fetch(`https://dummyjson.com/carts/${id}`, {
            method: 'DELETE'
        });
        setOrders(orders.filter(order => order.id !== id));
    }

    return (
        <View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Заказы</Text>
            <ScrollView>
                {orders.map(order => <OrderItem key={order.id} {...order} remove={() => removeItem(order.id)} />)}
                {orders.length === 0 && <Text style={{fontSize: 16, marginVertical: 20}}>Заказов нет</Text>}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    
});