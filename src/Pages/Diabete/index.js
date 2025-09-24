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

export default function Diabete() {
  const [glicemias, setGlicemias] = useState([""]);
  const [media, setMedia] = useState(null);
  const [hba1c, setHba1c] = useState(null);

  const calcularMedia = () => {
    Keyboard.dismiss();

    const valores = glicemias
      .map((v) => parseFloat(v.replace(",", ".")))
      .filter((v) => !isNaN(v) && v > 0);

    if (valores.length === 0) {
      Alert.alert("Erro", "Insira ao menos um valor válido de glicemia.");
      return;
    }

    const soma = valores.reduce((acc, val) => acc + val, 0);
    const mediaCalculada = soma / valores.length;
    const hba1cEstimado = (mediaCalculada + 46.7) / 28.7;

    setMedia(mediaCalculada.toFixed(1));
    setHba1c(hba1cEstimado.toFixed(2));
  };

  const limparCampos = () => {
    setGlicemias([""]);
    setMedia(null);
    setHba1c(null);
  };

  const atualizarValor = (index, valor) => {
    const novaLista = [...glicemias];
    novaLista[index] = valor;
    setGlicemias(novaLista);
  };

  const adicionarCampo = () => {
    setGlicemias([...glicemias, ""]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Icon name="needle" size={90} color="#007BFF" style={styles.icon} />
      <Text style={styles.title}>Controle de Glicemia</Text>

      {media && (
        <Text style={styles.totalText}>
          Média: {media} mg/dL | HbA1c estimada: {hba1c}%
        </Text>
      )}

      {glicemias.map((valor, index) => (
        <View key={index} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Glicemia ${index + 1} (mg/dL)`}
            keyboardType="numeric"
            value={valor}
            onChangeText={(text) => atualizarValor(index, text)}
            placeholderTextColor="#999"
          />
        </View>
      ))}

      <TouchableOpacity style={styles.button1} onPress={adicionarCampo}>
        <Text style={styles.buttonText1}>+ Adicionar Medição</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={calcularMedia}>
        <Text style={styles.buttonText}>Calcular Média</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={limparCampos}>
        <Icon name="broom" size={18} color="#202561" />
        <Text style={styles.resetButtonText}>Limpar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
