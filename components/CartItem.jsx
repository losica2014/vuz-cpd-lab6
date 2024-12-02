import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function StoreItem({name, description, price, amount, setAmount}) {
    return (
        <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20}}>
            {/* <View style={{flexDirection: 'column'}}> */}
                <Text style={{fontSize: 16}}>{name}</Text>
                {/* <Text style={{fontSize: 12}}>{description}</Text> */}
            {/* </View> */}
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Text>{price * amount} ₽</Text>
                <View style={styles.buttons}>
                    <Button title='-' onPress={() => setAmount(Math.max(amount - 1, 0))} />
                    <Text>{amount}</Text>
                    <Button title='+' onPress={() => setAmount(amount + 1)} />
                    <Button title='X' onPress={() => setAmount(0)} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
    },
});

export default StoreItem;