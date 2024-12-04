import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Animated, useAnimatedValue, Easing } from 'react-native';

export default function CatalogItem({name, description, price, amount, setAmount, isStoredForLater, setIsStoredForLater}) {
    const anim = useAnimatedValue(0);

    useEffect(() => {
        if(isStoredForLater) anim.setValue(70);
    }, [])

    return (
        <Animated.View style={[styles.container, {backgroundColor: anim.interpolate({inputRange: [0, 100], outputRange: ['hsl(40, 0%, 100%)', 'hsl(80, 70%, 90%)']})}]}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{name}</Text>
            <Text style={{fontSize: 14}}>{description}</Text>
            <View style={styles.buttons}>
                <Text>{(price * amount).toFixed(2)} ₽</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Button title='-' onPress={() => {
                        if(amount - 1 >= 1) Animated.timing(
                            anim,
                            {
                                toValue: 0,
                                duration: 150,
                                useNativeDriver: true
                            }
                        ).start()
                        setIsStoredForLater(false);
                        setAmount(Math.max(amount - 1, 0));
                    }} />
                    <Text>{amount}</Text>
                    <Button title='+' onPress={() => {
                        if(amount + 1 >= 1) Animated.timing(
                            anim,
                            {
                                toValue: 0,
                                duration: 150,
                                useNativeDriver: true
                            }
                        ).start()
                        setAmount(amount + 1);
                        setIsStoredForLater(false);
                    }} />
                </View>
            </View>
            <View style={styles.buttons}>
                <Button title={isStoredForLater ? 'Убрать из отложенных' : 'Переместить в отложенные'} onPress={() => {
                    Animated.timing(
                        anim,
                        {
                            toValue: !isStoredForLater ? 70 : 0,
                            duration: 300,
                            useNativeDriver: true
                        }
                    ).start()
                    setIsStoredForLater(!isStoredForLater);
                }} />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
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