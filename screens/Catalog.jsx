import { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { CatalogContext } from "../data/catalog";
import { CartContext, CartManagerContext } from "../data/cart";
import CatalogItem from "../components/CatalogItem";
import { LaterStoreContext, LaterStoreManagerContext } from "../data/later";

export default function Catalog() {
    const catalog = useContext(CatalogContext);
    const cart = useContext(CartContext);
    const setCart = useContext(CartManagerContext);
    const later = useContext(LaterStoreContext);
    const setLater = useContext(LaterStoreManagerContext);
    
    const removeItem = (id) => setCart({...cart, items: Object.fromEntries(Object.entries(cart.items).filter((item) => item[0] !== id))});

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Каталог</Text>
            <ScrollView>
                {Object.entries(catalog).map(([key, value]) => <CatalogItem
                    key={key}
                    {...value}
                    amount={cart.items[key] || 0}
                    setAmount={amount => {
                        amount > 0 ? setCart({...cart, items: {...cart.items, [key]: amount}}) : removeItem(key)
                    }}
                    isStoredForLater={later.includes(key)}
                    setIsStoredForLater={(v) => setIsStoredForLater(key, v)}
                />)}
            </ScrollView>
        </View>
    );

    function setIsStoredForLater(key, include) {
        setLater(include ? (later.includes(key) ? later : [...later, key]) : later.filter(k => k !== key));
        if(include) setCart({ ...cart, items: Object.fromEntries(Object.entries(cart.items).filter((item) => item[0] !== key)) });
    }
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
    }
});