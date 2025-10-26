import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

export default function IMC() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  const getIMCData = (resultado) => {
    if (resultado < 18.5) {
      return {
        classificacao: "Abaixo do peso",
        categoria: "underweight",
        cor: "#3498db",
        icone: "arrow-down",
        descricao: "Consulte um nutricionista para ganhar peso de forma saudável",
        risco: "Baixo peso pode indicar desnutrição"
      };
    } else if (resultado < 24.9) {
      return {
        classificacao: "Peso normal",
        categoria: "normal",
        cor: "#27ae60",
        icone: "check-circle",
        descricao: "Parabéns! Você está no peso ideal",
        risco: "Continue mantendo hábitos saudáveis"
      };
    } else if (resultado < 29.9) {
      return {
        classificacao: "Sobrepeso",
        categoria: "overweight",
        cor: "#f39c12",
        icone: "alert",
        descricao: "Atenção! Considere mudanças nos hábitos alimentares",
        risco: "Risco aumentado para doenças cardiovasculares"
      };
    } else if (resultado < 34.9) {
      return {
        classificacao: "Obesidade Grau I",
        categoria: "obesity1",
        cor: "#e67e22",
        icone: "alert-circle",
        descricao: "Importante buscar orientação médica",
        risco: "Risco moderado para saúde"
      };
    } else if (resultado < 39.9) {
      return {
        classificacao: "Obesidade Grau II",
        categoria: "obesity2",
        cor: "#d35400",
        icone: "alert-octagon",
        descricao: "Necessário acompanhamento médico urgente",
        risco: "Risco grave para saúde"
      };
    } else {
      return {
        classificacao: "Obesidade Grau III",
        categoria: "obesity3",
        cor: "#c0392b",
        icone: "alert-octagon",
        descricao: "Procure um médico imediatamente",
        risco: "Risco muito grave para saúde"
      };
    }
  };

  const calcularIMC = () => {
    Keyboard.dismiss();

    if (!peso || !altura) {
      return;
    }

    const pesoNum = parseFloat(peso.replace(",", "."));
    const alturaNum = parseFloat(altura.replace(",", "."));

    if (isNaN(pesoNum) || isNaN(alturaNum) || alturaNum <= 0 || pesoNum <= 0) {
      return;
    }

    const resultado = pesoNum / (alturaNum * alturaNum);
    const dados = getIMCData(resultado);
    
    setImc(resultado.toFixed(1));
    setClassificacao(dados.classificacao);
    setCategoria(dados);

    // Animação
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const limparCampos = () => {
    setPeso("");
    setAltura("");
    setImc(null);
    setClassificacao("");
    setCategoria("");
  };

  const calcularPesoIdeal = () => {
    if (!altura) return null;
    const alturaNum = parseFloat(altura.replace(",", "."));
    if (isNaN(alturaNum) || alturaNum <= 0) return null;
    
    const pesoMin = (18.5 * alturaNum * alturaNum).toFixed(1);
    const pesoMax = (24.9 * alturaNum * alturaNum).toFixed(1);
    return { min: pesoMin, max: pesoMax };
  };

  const pesoIdeal = calcularPesoIdeal();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.iconContainer}>
          <Icon name="scale-balance" size={50} color="#FFF" />
        </View>
        <Text style={styles.title}>Calculadora de IMC</Text>
        <Text style={styles.headerSubtitle}>
          Índice de Massa Corporal
        </Text>
      </View>

      {/* Input Cards */}
      <View style={styles.inputsContainer}>
        <View style={styles.inputCard}>
          <View style={styles.inputHeader}>
            <Icon name="weight-kilogram" size={24} color="#5B21B6" />
            <Text style={styles.inputLabel}>Peso</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ex: 70.5"
            keyboardType="decimal-pad"
            value={peso}
            onChangeText={setPeso}
            placeholderTextColor="#999"
          />
          <Text style={styles.inputUnit}>kg</Text>
        </View>

        <View style={styles.inputCard}>
          <View style={styles.inputHeader}>
            <Icon name="human-male-height" size={24} color="#5B21B6" />
            <Text style={styles.inputLabel}>Altura</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ex: 1.75"
            keyboardType="decimal-pad"
            value={altura}
            onChangeText={setAltura}
            placeholderTextColor="#999"
          />
          <Text style={styles.inputUnit}>m</Text>
        </View>
      </View>

      {/* Peso Ideal Info */}
      {pesoIdeal && (
        <View style={styles.pesoIdealCard}>
          <Icon name="information" size={18} color="#5B21B6" />
          <Text style={styles.pesoIdealText}>
            Peso ideal: {pesoIdeal.min} - {pesoIdeal.max} kg
          </Text>
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={calcularIMC}
          activeOpacity={0.8}
        >
          <Icon name="calculator" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        {imc && (
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={limparCampos}
            activeOpacity={0.8}
          >
            <Icon name="refresh" size={20} color="#6B7280" />
            <Text style={styles.resetButtonText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Resultado */}
      {imc && categoria && (
        <Animated.View style={[styles.resultCard, { opacity: fadeAnim }]}>
          <View style={[styles.resultHeader, { backgroundColor: categoria.cor }]}>
            <Icon name={categoria.icone} size={40} color="#FFF" />
            <View style={styles.resultHeaderText}>
              <Text style={styles.imcValue}>{imc}</Text>
              <Text style={styles.imcLabel}>Seu IMC</Text>
            </View>
          </View>

          <View style={styles.resultBody}>
            <View style={[styles.classificationBadge, { backgroundColor: categoria.cor + '20' }]}>
              <Text style={[styles.classificationText, { color: categoria.cor }]}>
                {classificacao}
              </Text>
            </View>

            <Text style={styles.descriptionText}>{categoria.descricao}</Text>
            
            <View style={styles.riskCard}>
              <Icon name="information-outline" size={20} color="#6B7280" />
              <Text style={styles.riskText}>{categoria.risco}</Text>
            </View>
          </View>
        </Animated.View>
      )}

      {/* Tabela de Referência */}
      <View style={styles.referenceCard}>
        <Text style={styles.referenceTitle}>Tabela de Referência</Text>
        
        <View style={styles.referenceTable}>
          <View style={styles.referenceRow}>
            <View style={[styles.referenceDot, { backgroundColor: '#3498db' }]} />
            <Text style={styles.referenceLabel}>Abaixo do peso</Text>
            <Text style={styles.referenceValue}>{'< 18.5'}</Text>
          </View>

          <View style={styles.referenceRow}>
            <View style={[styles.referenceDot, { backgroundColor: '#27ae60' }]} />
            <Text style={styles.referenceLabel}>Peso normal</Text>
            <Text style={styles.referenceValue}>18.5 - 24.9</Text>
          </View>

          <View style={styles.referenceRow}>
            <View style={[styles.referenceDot, { backgroundColor: '#f39c12' }]} />
            <Text style={styles.referenceLabel}>Sobrepeso</Text>
            <Text style={styles.referenceValue}>25.0 - 29.9</Text>
          </View>

          <View style={styles.referenceRow}>
            <View style={[styles.referenceDot, { backgroundColor: '#e67e22' }]} />
            <Text style={styles.referenceLabel}>Obesidade I</Text>
            <Text style={styles.referenceValue}>30.0 - 34.9</Text>
          </View>

          <View style={styles.referenceRow}>
            <View style={[styles.referenceDot, { backgroundColor: '#d35400' }]} />
            <Text style={styles.referenceLabel}>Obesidade II</Text>
            <Text style={styles.referenceValue}>35.0 - 39.9</Text>
          </View>

          <View style={[styles.referenceRow, styles.lastReferenceRow]}>
            <View style={[styles.referenceDot, { backgroundColor: '#c0392b' }]} />
            <Text style={styles.referenceLabel}>Obesidade III</Text>
            <Text style={styles.referenceValue}>{'≥ 40.0'}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}