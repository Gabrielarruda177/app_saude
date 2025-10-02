import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal, Alert, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { Ionicons } from '@expo/vector-icons';
import { createUsuario } from "../../services/usuarioService";
import styles from './styles';

const TIPOS_SANGUINEOS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Não sei'];

// Função de formatação para Data: DD/MM/AAAA
const formatDataNasc = (text) => {
  let cleaned = text.replace(/[^0-9]/g, '');
  if (cleaned.length > 2 && cleaned.length <= 4) {
    cleaned = cleaned.substring(0, 2) + '/' + cleaned.substring(2);
  } else if (cleaned.length > 4) {
    cleaned = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4) + '/' + cleaned.substring(4, 8);
  }
  return cleaned;
};

// Função para validar e converter a data para o formato YYYY-MM-DD
const parseAndValidateDate = (dateString) => {
    const parts = dateString.split('/');
    if (parts.length === 3) {
        const [day, month, year] = parts.map(p => parseInt(p, 10));
        if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= new Date().getFullYear()) {
            // Retorna no formato ISO (YYYY-MM-DD) para o banco de dados
            const monthStr = month.toString().padStart(2, '0');
            const dayStr = day.toString().padStart(2, '0');
            return `${year}-${monthStr}-${dayStr}`;
        }
    }
    return null; // Data inválida
};


export default function Cadastro({ navigation }) {
  const [form, setForm] = useState({
    nome: '',
    data_nasc: '', // <-- NOVO CAMPO
    peso: '',
    altura: '',
    tipo_sanguineo: TIPOS_SANGUINEOS[0] 
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (name, value) => {
    if (name === 'data_nasc') {
        value = formatDataNasc(value); // Formata a data enquanto digita
    }
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const salvarDados = async () => {
    const dataIso = parseAndValidateDate(form.data_nasc);

    if (!form.nome.trim() || !dataIso || !form.peso || !form.altura) { // <-- VALIDAÇÃO DA DATA
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente (incluindo Data de Nascimento no formato DD/MM/AAAA)!');
      return;
    }

    const payload = {
      nome: form.nome,
      data_nasc: dataIso, // <-- ENVIA A DATA FORMATADA PARA ISO
      peso: parseFloat(form.peso.replace(',', '.')), 
      altura: parseFloat(form.altura.replace(',', '.')), 
      tipo_sanguineo: form.tipo_sanguineo,
      cep: null, logradouro: null, complemento: null,
      bairro: null, cidade: null, estado: null,
      email: "", senha: ""
    };

    try {
      const res = await createUsuario(payload);
      const userId = res.id;
      if (!userId) {
        Alert.alert("Erro", "Não foi possível obter o ID do usuário.");
        return;
      }
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.replace("Cadastro2", { userId });
      }, 600);
      
    } catch (e) {
      console.error("Erro no cadastro:", e.response?.data || e.message);
      Alert.alert('Erro', 'Não foi possível salvar os dados no servidor.');
    }
  };

  return (
    <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.form}>
          <Text style={styles.title}>Cadastro Inicial</Text>

          {/* Nome */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Nome</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                value={form.nome} 
                onChangeText={txt => handleChange('nome', txt)} 
                placeholder="Digite seu nome" 
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>
          
          {/* Data de Nascimento <-- NOVO CAMPO */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Data de Nascimento (DD/MM/AAAA)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="calendar-outline" size={20} style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                value={form.data_nasc} 
                onChangeText={txt => handleChange('data_nasc', txt)} 
                placeholder="Ex: 01/01/2000" 
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
          </View>

          {/* Peso */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Peso (kg)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="fitness-outline" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={form.peso}
                onChangeText={txt => handleChange('peso', txt)}
                placeholder="Ex: 75.5"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Altura */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Altura (m)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="body-outline" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={form.altura}
                onChangeText={txt => handleChange('altura', txt)}
                placeholder="Ex: 1.75"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Tipo Sanguíneo */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Tipo Sanguíneo</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={form.tipo_sanguineo}
                onValueChange={(itemValue) => handleChange('tipo_sanguineo', itemValue)}
                style={{ color: "#03045e" }}
              >
                {TIPOS_SANGUINEOS.map((tipo) => (
                  <Picker.Item key={tipo} label={tipo} value={tipo} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Botão */}
          <Pressable onPress={salvarDados} style={styles.btn}>
            <Text style={styles.btnText}>Continuar</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Dados pessoais salvos com sucesso!</Text>
          </View>
        </View>
      </Modal>
      
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}