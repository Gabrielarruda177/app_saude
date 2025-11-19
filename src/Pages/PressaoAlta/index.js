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

export default function PressaoAlta() {
  const [sistolica, setSistolica] = useState("");
  const [diastolica, setDiastolica] = useState("");
  const [pam, setPam] = useState(null);
  const [classificacao, setClassificacao] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const getClassificacao = (sis, dias) => {
    if (sis < 120 && dias < 80) {
      return {
        titulo: "Pressão Ótima",
        cor: "#10B981",
        icone: "check-circle",
        descricao: "Sua pressão está em níveis ideais",
        alerta: "Continue mantendo hábitos saudáveis!"
      };
    } else if (sis < 130 && dias < 85) {
      return {
        titulo: "Pressão Normal",
        cor: "#3B82F6",
        icone: "check-circle-outline",
        descricao: "Pressão dentro dos parâmetros normais",
        alerta: "Mantenha o acompanhamento regular"
      };
    } else if (sis < 140 && dias < 90) {
      return {
        titulo: "Limítrofe",
        cor: "#F59E0B",
        icone: "alert-circle-outline",
        descricao: "Atenção: pressão no limite superior",
        alerta: "Recomenda-se acompanhamento médico"
      };
    } else if (sis < 160 || dias < 100) {
      return {
        titulo: "Hipertensão Estágio 1",
        cor: "#F97316",
        icone: "alert",
        descricao: "Hipertensão leve detectada",
        alerta: "Consulte um médico o quanto antes"
      };
    } else if (sis < 180 || dias < 110) {
      return {
        titulo: "Hipertensão Estágio 2",
        cor: "#EF4444",
        icone: "alert-octagon",
        descricao: "Hipertensão moderada detectada",
        alerta: "Procure atendimento médico urgente"
      };
    } else {
      return {
        titulo: "Hipertensão Estágio 3",
        cor: "#DC2626",
        icone: "alert-octagon",
        descricao: "Hipertensão grave detectada",
        alerta: "BUSQUE ATENDIMENTO MÉDICO IMEDIATO!"
      };
    }
  };

  const calcularPressao = () => {
    Keyboard.dismiss();

    const sis = parseFloat(sistolica.replace(",", "."));
    const dias = parseFloat(diastolica.replace(",", "."));

    if (isNaN(sis) || isNaN(dias) || sis <= 0 || dias <= 0) {
      return;
    }

    if (sis < 70 || sis > 250 || dias < 40 || dias > 150) {
      return;
    }

    const pamCalculada = ((sis + 2 * dias) / 3).toFixed(1);
    setPam(pamCalculada);

    const resultado = getClassificacao(sis, dias);
    setClassificacao(resultado);

    // Animação
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const limparCampos = () => {
    setSistolica("");
    setDiastolica("");
    setPam(null);
    setClassificacao(null);
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name="heart-pulse" size={50} color="#FFF" />
        </View>
        <Text style={styles.title}>Monitor de Pressão</Text>
        <Text style={styles.subtitle}>
          Acompanhe sua pressão arterial
        </Text>
      </View>

      {/* Inputs */}
      <View style={styles.inputsSection}>
        <View style={styles.inputCard}>
          <View style={styles.inputHeader}>
            <Icon name="arrow-up-bold" size={24} color="#EF4444" />
            <Text style={styles.inputLabel}>Sistólica</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="120"
            keyboardType="decimal-pad"
            value={sistolica}
            onChangeText={setSistolica}
            placeholderTextColor="#999"
          />
          <Text style={styles.inputUnit}>mmHg</Text>
        </View>

        <View style={styles.inputCard}>
          <View style={styles.inputHeader}>
            <Icon name="arrow-down-bold" size={24} color="#3B82F6" />
            <Text style={styles.inputLabel}>Diastólica</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="80"
            keyboardType="decimal-pad"
            value={diastolica}
            onChangeText={setDiastolica}
            placeholderTextColor="#999"
          />
          <Text style={styles.inputUnit}>mmHg</Text>
        </View>
      </View>

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.calcularButton} 
          onPress={calcularPressao}
          activeOpacity={0.8}
        >
          <Icon name="calculator" size={20} color="#FFF" />
          <Text style={styles.calcularButtonText}>Calcular</Text>
        </TouchableOpacity>

        {pam && (
          <TouchableOpacity 
            style={styles.limparButton} 
            onPress={limparCampos}
            activeOpacity={0.8}
          >
            <Icon name="refresh" size={20} color="#6B7280" />
            <Text style={styles.limparButtonText}>Nova Medição</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Resultado */}
      {pam && classificacao && (
        <Animated.View style={[styles.resultCard, { opacity: fadeAnim }]}>
          {/* Header do Resultado */}
          <View style={[styles.resultHeader, { backgroundColor: classificacao.cor }]}>
            <Icon name={classificacao.icone} size={40} color="#FFF" />
            <View style={styles.resultHeaderText}>
              <Text style={styles.pamValue}>{pam}</Text>
              <Text style={styles.pamLabel}>PAM (mmHg)</Text>
            </View>
          </View>

          {/* Body do Resultado */}
          <View style={styles.resultBody}>
            <View style={[styles.classificationBadge, { backgroundColor: classificacao.cor + '20' }]}>
              <Text style={[styles.classificationText, { color: classificacao.cor }]}>
                {classificacao.titulo}
              </Text>
            </View>

            <Text style={styles.descriptionText}>{classificacao.descricao}</Text>

            {/* Valores Medidos */}
            <View style={styles.valuesGrid}>
              <View style={styles.valueItem}>
                <Icon name="arrow-up-bold" size={20} color="#EF4444" />
                <Text style={styles.valueLabel}>Sistólica</Text>
                <Text style={styles.valueNumber}>{sistolica}</Text>
              </View>
              <View style={styles.valueItem}>
                <Icon name="arrow-down-bold" size={20} color="#3B82F6" />
                <Text style={styles.valueLabel}>Diastólica</Text>
                <Text style={styles.valueNumber}>{diastolica}</Text>
              </View>
            </View>

            <View style={styles.alertCard}>
              <Icon name="information-outline" size={20} color="#6B7280" />
              <Text style={styles.alertText}>{classificacao.alerta}</Text>
            </View>
          </View>
        </Animated.View>
      )}

      {/* Tabela de Referência */}
      <View style={styles.referenceCard}>
        <Text style={styles.referenceTitle}>Valores de Referência</Text>
        
        <View style={styles.referenceTable}>
          <View style={styles.referenceRow}>
            <View style={[styles.referenceDot, { backgroundColor: '#10B981' }]} />
            <Text style={styles.referenceLabel}>Ótima</Text>
            <Text style={styles.referenceValue}>{'< 120/80'}</Text>
          </View>

          <View style={styles.referenceRow}>
            <View style={[styles.referenceDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={styles.referenceLabel}>Normal</Text>
            <Text style={styles.referenceValue}>120-129 / 80-84</Text>
          </View>

          <View style={styles.referenceRow}>
            <View style={[styles.referenceDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.referenceLabel}>Limítrofe</Text>
            <Text style={styles.referenceValue}>130-139 / 85-89</Text>
          </View>

          <View style={styles.referenceRow}>
            <View style={[styles.referenceDot, { backgroundColor: '#F97316' }]} />
            <Text style={styles.referenceLabel}>HAS Estágio 1</Text>
            <Text style={styles.referenceValue}>140-159 / 90-99</Text>
          </View>

          <View style={styles.referenceRow}>
            <View style={[styles.referenceDot, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.referenceLabel}>HAS Estágio 2</Text>
            <Text style={styles.referenceValue}>160-179 / 100-109</Text>
          </View>

          <View style={[styles.referenceRow, styles.lastReferenceRow]}>
            <View style={[styles.referenceDot, { backgroundColor: '#DC2626' }]} />
            <Text style={styles.referenceLabel}>HAS Estágio 3</Text>
            <Text style={styles.referenceValue}>{'≥ 180 / ≥ 110'}</Text>
          </View>
        </View>

        <View style={styles.noteCard}>
          <Icon name="lightbulb-outline" size={18} color="#F59E0B" />
          <Text style={styles.noteText}>
            PAM = Pressão Arterial Média. Valores entre 70-100 mmHg são considerados normais.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}