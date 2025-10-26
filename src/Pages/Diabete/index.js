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

export default function Diabete() {
  const [glicemias, setGlicemias] = useState([{ id: 1, valor: "", momento: "jejum" }]);
  const [media, setMedia] = useState(null);
  const [hba1c, setHba1c] = useState(null);
  const [classificacao, setClassificacao] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const momentos = [
    { id: "jejum", label: "Jejum", icon: "weather-sunset-up" },
    { id: "preRefeicao", label: "Pré-refeição", icon: "silverware-fork-knife" },
    { id: "posRefeicao", label: "Pós-refeição", icon: "clock-time-two" },
    { id: "dormir", label: "Antes de dormir", icon: "weather-night" },
  ];

  const getClassificacao = (mediaGlicemia) => {
    if (mediaGlicemia < 70) {
      return {
        status: "Hipoglicemia",
        cor: "#3498db",
        icone: "arrow-down-bold",
        descricao: "Glicemia abaixo do normal",
        alerta: "Atenção! Procure ajuda médica se sentir sintomas"
      };
    } else if (mediaGlicemia <= 99) {
      return {
        status: "Normal",
        cor: "#27ae60",
        icone: "check-circle",
        descricao: "Glicemia dentro do esperado",
        alerta: "Continue mantendo seus bons hábitos!"
      };
    } else if (mediaGlicemia <= 125) {
      return {
        status: "Pré-diabetes",
        cor: "#f39c12",
        icone: "alert",
        descricao: "Glicemia elevada",
        alerta: "Importante fazer acompanhamento médico regular"
      };
    } else {
      return {
        status: "Diabetes",
        cor: "#e74c3c",
        icone: "alert-circle",
        descricao: "Glicemia alta",
        alerta: "Necessário acompanhamento médico e ajustes no tratamento"
      };
    }
  };

  const calcularMedia = () => {
    Keyboard.dismiss();

    const valores = glicemias
      .map((item) => parseFloat(item.valor.replace(",", ".")))
      .filter((v) => !isNaN(v) && v > 0);

    if (valores.length === 0) {
      return;
    }

    const soma = valores.reduce((acc, val) => acc + val, 0);
    const mediaCalculada = soma / valores.length;
    const hba1cEstimado = (mediaCalculada + 46.7) / 28.7;
    const classificacaoResult = getClassificacao(mediaCalculada);

    setMedia(mediaCalculada.toFixed(1));
    setHba1c(hba1cEstimado.toFixed(1));
    setClassificacao(classificacaoResult);

    // Animação
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const limparCampos = () => {
    setGlicemias([{ id: 1, valor: "", momento: "jejum" }]);
    setMedia(null);
    setHba1c(null);
    setClassificacao(null);
  };

  const atualizarValor = (id, campo, valor) => {
    const novaLista = glicemias.map((item) =>
      item.id === id ? { ...item, [campo]: valor } : item
    );
    setGlicemias(novaLista);
  };

  const adicionarCampo = () => {
    const novoId = Math.max(...glicemias.map((g) => g.id)) + 1;
    setGlicemias([...glicemias, { id: novoId, valor: "", momento: "jejum" }]);
  };

  const removerCampo = (id) => {
    if (glicemias.length > 1) {
      setGlicemias(glicemias.filter((item) => item.id !== id));
    }
  };

  const getMomentoInfo = (momentoId) => {
    return momentos.find((m) => m.id === momentoId) || momentos[0];
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.iconContainer}>
          <Icon name="water-check" size={50} color="#FFF" />
        </View>
        <Text style={styles.title}>Controle de Glicemia</Text>
        <Text style={styles.headerSubtitle}>
          Monitore seus níveis de açúcar
        </Text>
      </View>

      {/* Resultado Card */}
      {media && classificacao && (
        <Animated.View style={[styles.resultCard, { opacity: fadeAnim }]}>
          <View style={[styles.resultHeader, { backgroundColor: classificacao.cor }]}>
            <Icon name={classificacao.icone} size={40} color="#FFF" />
            <View style={styles.resultValues}>
              <Text style={styles.mediaValue}>{media}</Text>
              <Text style={styles.mediaLabel}>mg/dL</Text>
            </View>
          </View>

          <View style={styles.resultBody}>
            <View style={[styles.statusBadge, { backgroundColor: classificacao.cor + '20' }]}>
              <Text style={[styles.statusText, { color: classificacao.cor }]}>
                {classificacao.status}
              </Text>
            </View>

            <Text style={styles.descriptionText}>{classificacao.descricao}</Text>

            <View style={styles.hba1cCard}>
              <Icon name="chart-line" size={24} color="#5B21B6" />
              <View style={styles.hba1cInfo}>
                <Text style={styles.hba1cLabel}>HbA1c Estimada</Text>
                <Text style={styles.hba1cValue}>{hba1c}%</Text>
              </View>
            </View>

            <View style={styles.alertCard}>
              <Icon name="information-outline" size={20} color="#6B7280" />
              <Text style={styles.alertText}>{classificacao.alerta}</Text>
            </View>
          </View>
        </Animated.View>
      )}

      {/* Lista de Medições */}
      <View style={styles.medicoesCard}>
        <Text style={styles.medicoesTitle}>Medições</Text>
        
        {glicemias.map((item, index) => (
          <View key={item.id} style={styles.medicaoItem}>
            <View style={styles.medicaoHeader}>
              <Text style={styles.medicaoNumero}>#{index + 1}</Text>
              {glicemias.length > 1 && (
                <TouchableOpacity
                  onPress={() => removerCampo(item.id)}
                  style={styles.removeButton}
                >
                  <Icon name="close-circle" size={22} color="#EF4444" />
                </TouchableOpacity>
              )}
            </View>

            {/* Seletor de Momento */}
            <View style={styles.momentoSelector}>
              {momentos.map((momento) => (
                <TouchableOpacity
                  key={momento.id}
                  style={[
                    styles.momentoButton,
                    item.momento === momento.id && styles.momentoButtonActive,
                  ]}
                  onPress={() => atualizarValor(item.id, "momento", momento.id)}
                >
                  <Icon
                    name={momento.icon}
                    size={18}
                    color={item.momento === momento.id ? "#FFF" : "#6B7280"}
                  />
                  <Text
                    style={[
                      styles.momentoButtonText,
                      item.momento === momento.id && styles.momentoButtonTextActive,
                    ]}
                  >
                    {momento.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Input de Glicemia */}
            <View style={styles.inputCard}>
              <Icon name="water" size={24} color="#5B21B6" />
              <TextInput
                style={styles.input}
                placeholder="Valor"
                keyboardType="decimal-pad"
                value={item.valor}
                onChangeText={(text) => atualizarValor(item.id, "valor", text)}
                placeholderTextColor="#999"
              />
              <Text style={styles.inputUnit}>mg/dL</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={adicionarCampo}>
          <Icon name="plus-circle" size={22} color="#5B21B6" />
          <Text style={styles.addButtonText}>Adicionar Medição</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.calcularButton}
          onPress={calcularMedia}
          activeOpacity={0.8}
        >
          <Icon name="calculator" size={20} color="#FFF" />
          <Text style={styles.calcularButtonText}>Calcular Média</Text>
        </TouchableOpacity>

        {media && (
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

      {/* Tabela de Referência */}
      <View style={styles.referenceCard}>
        <Text style={styles.referenceTitle}>Valores de Referência</Text>
        
        <View style={styles.referenceTable}>
          <View style={styles.referenceRow}>
            <View style={[styles.referenceDot, { backgroundColor: '#3498db' }]} />
            <Text style={styles.referenceLabel}>Hipoglicemia</Text>
            <Text style={styles.referenceValue}>{'< 70'}</Text>
          </View>

          <View style={styles.referenceRow}>
            <View style={[styles.referenceDot, { backgroundColor: '#27ae60' }]} />
            <Text style={styles.referenceLabel}>Normal (jejum)</Text>
            <Text style={styles.referenceValue}>70 - 99</Text>
          </View>

          <View style={styles.referenceRow}>
            <View style={[styles.referenceDot, { backgroundColor: '#f39c12' }]} />
            <Text style={styles.referenceLabel}>Pré-diabetes</Text>
            <Text style={styles.referenceValue}>100 - 125</Text>
          </View>

          <View style={[styles.referenceRow, styles.lastReferenceRow]}>
            <View style={[styles.referenceDot, { backgroundColor: '#e74c3c' }]} />
            <Text style={styles.referenceLabel}>Diabetes</Text>
            <Text style={styles.referenceValue}>{'≥ 126'}</Text>
          </View>
        </View>

        <View style={styles.noteCard}>
          <Icon name="lightbulb-outline" size={18} color="#F59E0B" />
          <Text style={styles.noteText}>
            A HbA1c é estimada e não substitui exame laboratorial
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}