import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CatalogContext } from "../data/catalog";
import { CartContext, CartManagerContext } from "../data/cart";
import CatalogItem from "../components/CatalogItem";

export default function Catalog() {
    const catalog = useContext(CatalogContext);
    const cart = useContext(CartContext);
    const setCart = useContext(CartManagerContext);

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Каталог</Text>
            <View style={{gap: 10, display: "flex", flexWrap: "wrap", flexDirection: "row"}}>
                {Object.entries(catalog).map(([key, value]) => <CatalogItem key={key} {...value} amount={cart.items[key] || 0} setAmount={amount => setCart({...cart, items: {...cart.items, [key]: amount}})} />)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10
    }
});