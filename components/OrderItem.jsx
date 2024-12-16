import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function OrderItem({id, total, amount, remove}) {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const d = new Date();
        d.setTime(Math.random() * 1E13);
        setDate(d);
    }, []);

    return (
        <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20}}>
            <View>
                <Text style={{fontSize: 16}}>Заказ №{id} на {date.toLocaleDateString()}</Text>
                <Text>{(total).toFixed(2)} ₽</Text>
                <Text>{amount} шт.</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <View style={styles.buttons}>
                    <Button title='X' onPress={remove} />
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
        gap: 5
    },
});