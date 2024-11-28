import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function StoreItem({name, description, price, amount, setAmount}) {
    return (
        <View style={{padding: 10, alignContent: 'space-between'}}>
            <View style={{flexDirection: 'column'}}>
                <Text style={{fontWeight: 'bold'}}>{name}</Text>
                <Text style={{fontSize: 12}}>{description}</Text>
            </View>
            <Text>{price} ₽ * {amount} шт.</Text>
            <View>
                <Button title='-' onPress={() => setAmount(Math.max(amount - 1, 0))} />
                <Text>{amount}</Text>
                <Button title='+' onPress={() => setAmount(amount + 1)} />
                <Button title='X' onPress={() => setAmount(0)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    
});

export default StoreItem;