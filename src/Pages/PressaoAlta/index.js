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

export default function PressaoAlta() {
  const [sistolica, setSistolica] = useState("");
  const [diastolica, setDiastolica] = useState("");
  const [pam, setPam] = useState(null);
  const [classificacao, setClassificacao] = useState("");

  const calcularPressao = () => {
    Keyboard.dismiss();

    const sis = parseFloat(sistolica.replace(",", "."));
    const dias = parseFloat(diastolica.replace(",", "."));

    if (isNaN(sis) || isNaN(dias) || sis <= 0 || dias <= 0) {
      Alert.alert("Erro", "Insira valores válidos para pressão.");
      return;
    }

    const pamCalculada = ((sis + 2 * dias) / 3).toFixed(1);
    setPam(pamCalculada);

    if (sis < 120 && dias < 80) {
      setClassificacao("Pressão ótima");
    } else if (sis < 130 && dias < 85) {
      setClassificacao("Pressão normal");
    } else if (sis < 140 && dias < 90) {
      setClassificacao("Limítrofe");
    } else if (sis < 160 || dias < 100) {
      setClassificacao("Hipertensão estágio 1");
    } else if (sis < 180 || dias < 110) {
      setClassificacao("Hipertensão estágio 2");
    } else {
      setClassificacao("Hipertensão estágio 3");
    }
  };

  const limparCampos = () => {
    setSistolica("");
    setDiastolica("");
    setPam(null);
    setClassificacao("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Icon name="heart-pulse" size={80} color="#007BFF" style={styles.icon} />
      <Text style={styles.title}>Monitor de Pressão Arterial</Text>

      {pam && (
        <Text style={styles.totalText}>
          PAM: {pam} mmHg | Classificação: {classificacao}
        </Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pressão Sistólica (mmHg)"
          keyboardType="numeric"
          value={sistolica}
          onChangeText={setSistolica}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pressão Diastólica (mmHg)"
          keyboardType="numeric"
          value={diastolica}
          onChangeText={setDiastolica}
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={calcularPressao}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={limparCampos}>
        <Icon name="broom" size={18} color="#202561" />
        <Text style={styles.resetButtonText}>Limpar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
