import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { CatalogContext } from './data/catalog';
import Cart from './screens/Cart';
import Catalog from './screens/Catalog';
import { CartContext, CartManagerContext } from './data/cart';
import { LaterStoreContext, LaterStoreManagerContext } from './data/later';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orders from './screens/Orders';

export default function App() {
  const [cart, setCart] = useState({'items': {'1': 10}, 'promo': null});
  const [later, setLater] = useState(['2']);
  const catalog = {
    '1': { name: 'Item 1', description: 'Description 1', price: 111.11 },
    '2': { name: 'Item 2', description: 'Description 2', price: 222.22 },
    '3': { name: 'Item 3', description: 'Description 3', price: 333.33 },
    '4': { name: 'Item 4', description: 'Description 4', price: 444.44 },
    '5': { name: 'Item 5', description: 'Description 5', price: 555.55 },
  };
  const [page, setPage] = useState('catalog');

  useEffect(() => {
    AsyncStorage.getItem('cart').then((value) => setCart(value != null ? JSON.parse(value) : {'items': {'1': 10}}));
    AsyncStorage.getItem('later').then((value) => setLater(value != null ? JSON.parse(value) : ['2']));
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar style="auto" />
        <CatalogContext.Provider value={catalog}>
          <CartContext.Provider value={cart}>
            <CartManagerContext.Provider value={async (v) => {setCart(v); await AsyncStorage.setItem('cart', JSON.stringify(v))}}>
              <LaterStoreContext.Provider value={later}>
                <LaterStoreManagerContext.Provider value={async (v) => {setLater(v); await AsyncStorage.setItem('later', JSON.stringify(v))}}>
                  <View style={styles.container}>
                    {page === 'catalog' && <Catalog />}
                    {page === 'cart' && <Cart />}
                    {page === 'orders' && <Orders />}
                  </View>
                  <View style={{gap: 10, display: "flex", flexWrap: "wrap", flexDirection: "row", marginTop: 20, padding: 10, borderTopWidth: 1}}>
                    <Button title="Каталог" onPress={() => setPage('catalog')} />
                    <Button title="Корзина" onPress={() => setPage('cart')} />
                    <Button title="Заказы" onPress={() => setPage('orders')} />
                  </View>
                </LaterStoreManagerContext.Provider>
              </LaterStoreContext.Provider>
            </CartManagerContext.Provider>
          </CartContext.Provider>
        </CatalogContext.Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
});
