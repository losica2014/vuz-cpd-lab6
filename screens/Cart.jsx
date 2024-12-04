import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import StoreItem from '../components/CartItem';
import { CatalogContext } from '../data/catalog';
import { CartContext, CartManagerContext } from '../data/cart';

const coefs = {'free': 0, '50': 0.5};

export default function Cart() {
    const cart = useContext(CartContext);
    const setCart = useContext(CartManagerContext);

    const catalog = useContext(CatalogContext);

    const removeItem = (id) => setCart({...cart, items: Object.fromEntries(Object.entries(cart.items).filter((item) => item[0] !== id))});

    return (
        <View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Корзина</Text>
            <ScrollView>
                {Object.entries(cart.items).map(([key, value]) => <StoreItem key={key} {...catalog[key]} amount={value} setAmount={amount => amount > 0 ? setCart({...cart, items: {...cart.items, [key]: amount}}) : removeItem(key)} />)}
                {Object.entries(cart.items).length === 0 && <Text style={{fontSize: 16, marginVertical: 20}}>Корзина пуста</Text>}
            </ScrollView>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Итого: {(Object.entries(cart.items).reduce((total, [key, value]) => total + value * catalog[key].price, 0) * (coefs[cart.promo] ?? 1)).toFixed(2)} ₽</Text>
            <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 16}}>Скидка: {(1 - (coefs[cart.promo] ?? 1)) * 100}%</Text>
                <TextInput style={{borderWidth: 1, borderRadius: 5, borderColor: '#aaa', padding: 10, margin: 10}} placeholder='Промокод' value={cart.promo} onChangeText={text => setCart({...cart, promo: text.toLowerCase()})} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    
});