import React, { useEffect, useRef } from 'react';
import { View, Animated, Text, Easing, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

export default function SplashScreen() {
  const navigation = useNavigation();
  
  // Animações
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeTitle = useRef(new Animated.Value(0)).current;
  const fadeSubtitle = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animação do ícone principal
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.parallel([
        // Rotação sutil
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        // Fade do título
        Animated.timing(fadeTitle, {
          toValue: 1,
          duration: 600,
          delay: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Animação do subtítulo
    Animated.timing(fadeSubtitle, {
      toValue: 1,
      duration: 600,
      delay: 1000,
      useNativeDriver: true,
    }).start();

    // Animação da barra de progresso
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2500,
      delay: 800,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    // Animação de pulso contínua
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    const checkLogin = async () => {
      const usuarioSalvo = await AsyncStorage.getItem('usuarioLogado');
      navigation.replace(usuarioSalvo ? 'Home' : 'Login');
    };

    const timer = setTimeout(checkLogin, 3500);
    return () => clearTimeout(timer);
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5B21B6" />
      
      {/* Background com gradiente simulado */}
      <View style={styles.gradientTop} />
      <View style={styles.gradientBottom} />

      {/* Círculos decorativos de fundo */}
      <View style={styles.circleDecor1} />
      <View style={styles.circleDecor2} />
      <View style={styles.circleDecor3} />

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        {/* Ícone Principal com animação */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [
                { scale: scaleAnim },
                { rotate: rotate },
              ],
            },
          ]}
        >
          <View style={styles.iconBackground}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Icon name="heart-pulse" size={80} color="#FFF" />
            </Animated.View>
          </View>
        </Animated.View>

        {/* Título */}
        <Animated.View style={[styles.titleContainer, { opacity: fadeTitle }]}>
          <Text style={styles.title}>MonitoraSaúde</Text>
          <View style={styles.titleUnderline} />
        </Animated.View>

        {/* Subtítulo */}
        <Animated.View style={[styles.subtitleContainer, { opacity: fadeSubtitle }]}>
          <Icon name="shield-check" size={20} color="#A78BFA" />
          <Text style={styles.subtitle}>Sua saúde em boas mãos</Text>
        </Animated.View>

        {/* Barra de Progresso */}
        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              { width: progressWidth },
            ]}
          />
        </View>

        {/* Versão */}
        <Animated.Text style={[styles.version, { opacity: fadeSubtitle }]}>
          Versão 1.0.0
        </Animated.Text>
      </View>

      {/* Ícones decorativos flutuantes */}
      <Animated.View style={[styles.floatingIcon1, { opacity: fadeSubtitle }]}>
        <Icon name="water" size={30} color="rgba(255, 255, 255, 0.3)" />
      </Animated.View>
      <Animated.View style={[styles.floatingIcon2, { opacity: fadeSubtitle }]}>
        <Icon name="heart" size={25} color="rgba(255, 255, 255, 0.3)" />
      </Animated.View>
      <Animated.View style={[styles.floatingIcon3, { opacity: fadeSubtitle }]}>
        <Icon name="pill" size={28} color="rgba(255, 255, 255, 0.3)" />
      </Animated.View>
      <Animated.View style={[styles.floatingIcon4, { opacity: fadeSubtitle }]}>
        <Icon name="medical-bag" size={26} color="rgba(255, 255, 255, 0.3)" />
      </Animated.View>
    </View>
  );
}