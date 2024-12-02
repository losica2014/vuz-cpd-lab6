import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import StoreItem from './components/CartItem';
import { CatalogContext } from './data/catalog';
import Cart from './screens/Cart';
import Catalog from './screens/Catalog';
import { CartContext, CartManagerContext } from './data/cart';

export default function App() {
  const [cart, setCart] = useState({'items': {'1': 10}, 'promo': null});
  const catalog = {
    '1': { name: 'Item 1', description: 'Description 1', price: 111.11 },
    '2': { name: 'Item 2', description: 'Description 2', price: 222.22 },
    '3': { name: 'Item 3', description: 'Description 3', price: 333.33 },
    '4': { name: 'Item 4', description: 'Description 4', price: 444.44 },
    '5': { name: 'Item 5', description: 'Description 5', price: 555.55 },
  };
  const [page, setPage] = useState('catalog');
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar style="auto" />
        <CatalogContext.Provider value={catalog}>
          <CartContext.Provider value={cart}>
            <CartManagerContext.Provider value={setCart}>
              <View style={styles.container}>
                {page === 'catalog' && <Catalog />}
                {page === 'cart' && <Cart />}
              </View>
              <View style={{gap: 10, display: "flex", flexWrap: "wrap", flexDirection: "row", marginTop: 20, padding: 10, borderTopWidth: 1}}>
                <Button title="Каталог" onPress={() => setPage('catalog')} />
                <Button title="Корзина" onPress={() => setPage('cart')} />
              </View>
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
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20
  },
});
