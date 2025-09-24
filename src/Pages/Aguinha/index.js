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
import Icon from "react-native-vector-icons/Ionicons";

import styles from "./styles";

export default function Aguinha() {
  const [peso, setPeso] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcularAgua = () => {
    Keyboard.dismiss();

    if (!peso) {
      Alert.alert("Erro", "Por favor, preencha seu peso.");
      return;
    }

    const pesoNum = parseFloat(peso.replace(",", "."));

    if (isNaN(pesoNum) || pesoNum <= 0) {
      Alert.alert("Erro", "Insira um peso válido.");
      return;
    }

    const litros = (pesoNum * 35) / 1000;
    setResultado(litros.toFixed(2));
  };

  const limparCampos = () => {
    setPeso("");
    setResultado(null);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Icon name="water" size={90} color="#007BFF" style={styles.icon} />

      <Text style={styles.title}>Calculadora de Água</Text>

      <Text style={styles.subtitle}>
        {resultado
          ? `Você precisa de ${resultado} litros de água por dia.`
          : "Descubra a sua necessidade diária de água"}
      </Text>

      <View style={styles.inputContainer}>
        <Icon name="body-outline" size={24} color="#555" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Seu peso (kg)"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
          placeholderTextColor="#999"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={calcularAgua}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={limparCampos}>
        <Icon name="broom" size={18} color="#202561" />
        <Text style={styles.resetButtonText}>Limpar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
