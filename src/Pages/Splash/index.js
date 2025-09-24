import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Text, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

export default function SplashScreen() {
  const navigation = useNavigation();
  const translateY = useRef(new Animated.Value(-100)).current; // Inicia a animação fora da tela, acima
  const opacity = useRef(new Animated.Value(0)).current; // Inicia com opacidade 0

  useEffect(() => {
    // Animação de entrada do texto
    const textAnimation = Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0, // Posição final na tela
        duration: 1500, // Duração da animação
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1, // Opacidade final 100%
        duration: 1500,
        useNativeDriver: true,
      }),
    ]);

    // Executa a animação do texto
    textAnimation.start();

    const checkLogin = async () => {
      const usuarioSalvo = await AsyncStorage.getItem('usuarioLogado');
      if (usuarioSalvo) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    };

    const timer = setTimeout(checkLogin, 3500);
    return () => clearTimeout(timer);
  }, [navigation, opacity, translateY]);

  return (
    <View style={styles.fundo}>
      <Image
        source={require('../../../assets/coracao.gif')}
        style={styles.gif}
        resizeMode="contain"
      />

      <Animated.View style={{ transform: [{ translateY: translateY }], opacity: opacity }}>
        <Text style={styles.Tittle}>Bem-Vindo ao MonitoraSaúde!</Text>
      </Animated.View>

    </View>
  );
}