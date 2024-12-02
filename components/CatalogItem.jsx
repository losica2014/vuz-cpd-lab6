import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function CatalogItem({name, description, price, amount, setAmount}) {
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{name}</Text>
            <Text style={{fontSize: 14}}>{description}</Text>
            <View style={styles.buttons}>
                <Text>{price * amount} ₽</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Button title='-' onPress={() => setAmount(Math.max(amount - 1, 0))} />
                    <Text>{amount}</Text>
                    <Button title='+' onPress={() => setAmount(amount + 1)} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        // width: 300,
        // flexGrow: 1,
        flex: 1,
        gap: 10
    },
    buttons: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
    },
});