import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Text, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

export default function SplashScreen() {
  const navigation = useNavigation();
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    const checkLogin = async () => {
      const usuarioSalvo = await AsyncStorage.getItem('usuarioLogado');
      navigation.replace(usuarioSalvo ? 'Home' : 'Login');
    };

    const timer = setTimeout(checkLogin, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.fundo}>
      <Image source={require('../../../assets/coracao.gif')} style={styles.gif} resizeMode="contain" />
      <Animated.View style={{ transform: [{ translateY }], opacity }}>
        <Text style={styles.Tittle}>Bem-Vindo ao MonitoraSaúde!</Text>
      </Animated.View>
    </View>
  );
}
