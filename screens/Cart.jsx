import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import StoreItem from '../components/CartItem';
import { CatalogContext } from '../data/catalog';
import { CartContext, CartManagerContext } from '../data/cart';
import DateTimePicker from '@react-native-community/datetimepicker';


const coefs = {'free': 0, '50': 0.5};

export default function Cart() {
    const cart = useContext(CartContext);
    const setCart = useContext(CartManagerContext);

    const [coords, setCoords] = useState({lat: 0, long: 0});
    const [date, setDate] = useState(new Date());

    const catalog = useContext(CatalogContext);

    const removeItem = (id) => setCart({...cart, items: Object.fromEntries(Object.entries(cart.items).filter((item) => item[0] !== id))});

    const placeOrder = () => {
        if(Object.entries(cart.items).length === 0) return;
        fetch('https://dummyjson.com/carts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                "userId": 1,
                "products": Object.entries(cart.items).map(([key, value]) => ({id: key, quantity: value}))
            }
        });
        setDate(new Date());
        setCoords({lat: 0, long: 0});
        setCart({items: {}});
    }

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
            <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 16}}>Широта: </Text>
                <TextInput style={{borderWidth: 1, borderRadius: 5, borderColor: '#aaa', padding: 10, margin: 10}} placeholder='Широта' inputMode='numeric' value={coords.lat} onChangeText={text => setCoords({...coords, lat: Number.parseFloat(text)})} />
            </View>
            <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 16}}>Долгота: </Text>
                <TextInput style={{borderWidth: 1, borderRadius: 5, borderColor: '#aaa', padding: 10, margin: 10}} placeholder='Долгота' inputMode='numeric' value={coords.long} onChangeText={text => setCoords({...coords, long: Number.parseFloat(text)})} />
            </View>
            <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 16}}>Адрес: {coords.lat} {coords.long}</Text>
            </View>
            <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 16}}>Дата доставки: </Text>
                <DateTimePicker value={date} mode='date' onChange={(event, selectedDate) => selectedDate && setDate(selectedDate)} />
            </View>
            <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                <Button title='Оформить заказ' onPress={placeOrder} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    
});