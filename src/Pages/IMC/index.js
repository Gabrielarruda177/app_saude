import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

export default function IMC() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState("");

  const calcularIMC = () => {
    Keyboard.dismiss();

    if (!peso || !altura) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const pesoNum = parseFloat(peso.replace(",", "."));
    const alturaNum = parseFloat(altura.replace(",", "."));

    if (isNaN(pesoNum) || isNaN(alturaNum) || alturaNum <= 0) {
      Alert.alert("Erro", "Insira valores numéricos válidos.");
      return;
    }

    const resultado = pesoNum / (alturaNum * alturaNum);
    setImc(resultado.toFixed(2));

    if (resultado < 18.5) {
      setClassificacao("Abaixo do peso");
    } else if (resultado < 24.9) {
      setClassificacao("Peso normal");
    } else if (resultado < 29.9) {
      setClassificacao("Sobrepeso");
    } else if (resultado < 34.9) {
      setClassificacao("Obesidade grau I");
    } else if (resultado < 39.9) {
      setClassificacao("Obesidade grau II");
    } else {
      setClassificacao("Obesidade grau III");
    }
  };

  const limparCampos = () => {
    setPeso("");
    setAltura("");
    setImc(null);
    setClassificacao("");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Icon name="scale-balance" size={80} color="#007BFF" style={styles.icon} />

      <Text style={styles.title}>Calculadora de IMC</Text>

      <Text style={styles.subtitle}>
        {imc ? `Seu IMC é: ${imc}` : "Calcule seu Índice de Massa Corporal"}
      </Text>

      {classificacao ? (
        <Text style={styles.classificacaoText}>
          Classificação: {classificacao}
        </Text>
      ) : null}

      <View style={styles.inputContainer}>
        <Icon name="weight-kilogram" size={24} color="#555" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="human-male-height" size={24} color="#555" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Altura (m)"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={calcularIMC}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={limparCampos}>
        <Icon name="broom" size={18} color="#202561" />
        <Text style={styles.resetButtonText}>Limpar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
