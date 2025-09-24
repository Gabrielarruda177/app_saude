import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, Modal, Animated, Alert, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { loginUsuario } from "../../services/usuarioService";

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagemModal, setMensagemModal] = useState('');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animarPress = () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(recuperarDados);
  };

  const recuperarDados = async () => {
    try {
      const res = await loginUsuario(email, senha);
      if (res && res.success) {
        await AsyncStorage.setItem("usuarioLogado", JSON.stringify(res.usuario));
        navigation.replace("Home");
      } else {
        mostrarModal("Email ou senha incorretos");
      }
    } catch (e) {
      console.error(e);
      mostrarModal("Erro ao conectar ao servidor");
    }
  };

  const mostrarModal = (mensagem) => {
    setMensagemModal(mensagem);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.text}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Text style={styles.text}>Senha:</Text>
        <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Pressable style={styles.btn} onPress={animarPress}>
            <Text style={styles.btnText}>Entrar</Text>
          </Pressable>
        </Animated.View>
        <Text style={{ color: '#03045e', marginTop: 20 }}>
          Não tem conta?{' '}
          <Text style={{ color: '#03045e', textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Cadastro')}>
            Cadastre-se
          </Text>
        </Text>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalFundo}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTexto}>{mensagemModal}</Text>
            <Pressable style={styles.modalBotao} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalBotaoTexto}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
} 