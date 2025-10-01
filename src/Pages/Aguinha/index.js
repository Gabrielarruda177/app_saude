import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import styles from "./styles";

export default function Aguinha() {
  const [peso, setPeso] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const calcularAgua = () => {
    Keyboard.dismiss();
    setError(null);
    setResultado(null); // Limpa o resultado anterior

    if (!peso || peso.trim() === "") {
      setError("Por favor, preencha seu peso.");
      return;
    }

    // Tenta converter o peso (aceitando "," ou ".")
    const pesoNum = parseFloat(peso.replace(",", "."));

    if (isNaN(pesoNum) || pesoNum <= 0) {
      setError("Insira um peso válido e positivo.");
      return;
    }

    // Fórmula: Peso (kg) * 35 ml / 1000 para Litros
    const litros = (pesoNum * 35) / 1000;
    setResultado(litros.toFixed(2));
  };

  const limparCampos = () => {
    setPeso("");
    setResultado(null);
    setError(null);
    Keyboard.dismiss();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Icon name="water-sharp" size={90} color={styles.icon.color} style={styles.icon} />

      <Text style={styles.title}>Calculadora de Água</Text>

      {/* Exibição do Resultado ou Subtítulo */}
      <Text style={styles.subtitle}>
        {resultado
          ? `Sua meta diária: ${resultado} Litros!`
          : "Descubra a sua necessidade diária de água (35ml/kg)"}
      </Text>

      {/* Input do Peso */}
      <View style={styles.inputContainer}>
        <Icon name="body-outline" size={24} color="#999" style={styles.inputIcon} />
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
      
      {/* Mensagem de Erro (se houver) */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Botão Calcular */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={calcularAgua}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
      
      {/* Botão Limpar */}
      <TouchableOpacity 
        style={styles.resetButton} 
        onPress={limparCampos}
        activeOpacity={0.8}
      >
        <Icon name="refresh-outline" size={20} color={styles.resetButtonText.color} />
        <Text style={styles.resetButtonText}>Limpar</Text>
      </TouchableOpacity>
      
      {resultado && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Recomendação:</Text>
          <Text style={styles.resultValue}>{resultado}</Text>
          <Text style={styles.resultUnit}>L</Text>
        </View>
      )}

    </ScrollView>
  );
}
