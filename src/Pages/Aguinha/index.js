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
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

export default function Aguinha() {
  const [peso, setPeso] = useState("");
  const [metaDiaria, setMetaDiaria] = useState(null);
  const [consumoAtual, setConsumoAtual] = useState(0);
  const [error, setError] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Opções de consumo rápido
  const opcoesConsumo = [
    { label: "Copo", ml: 250, icon: "wine" },
    { label: "Garrafa 500ml", ml: 500, icon: "flask" },
    { label: "Garrafa 1L", ml: 1000, icon: "water" },
    { label: "Personalizado", ml: 0, icon: "create" },
  ];

  const calcularAgua = () => {
    Keyboard.dismiss();
    setError(null);

    if (!peso || peso.trim() === "") {
      setError("Por favor, preencha seu peso.");
      return;
    }

    const pesoNum = parseFloat(peso.replace(",", "."));

    if (isNaN(pesoNum) || pesoNum <= 0) {
      setError("Insira um peso válido e positivo.");
      return;
    }

    const litros = (pesoNum * 35) / 1000;
    setMetaDiaria(litros.toFixed(2));
    
    // Animação
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const adicionarConsumo = (ml) => {
    if (!metaDiaria) {
      setError("Calcule sua meta diária primeiro!");
      return;
    }
    setConsumoAtual(prev => Math.min(prev + ml, parseFloat(metaDiaria) * 1000));
    setError(null);
  };

  const adicionarPersonalizado = () => {
    if (!metaDiaria) {
      setError("Calcule sua meta diária primeiro!");
      return;
    }
    // Aqui você pode adicionar um modal para input personalizado
    // Por enquanto, vamos adicionar 200ml como exemplo
    adicionarConsumo(200);
  };

  const limparCampos = () => {
    setPeso("");
    setMetaDiaria(null);
    setConsumoAtual(0);
    setError(null);
    Keyboard.dismiss();
  };

  const resetarConsumo = () => {
    setConsumoAtual(0);
  };

  const calcularProgresso = () => {
    if (!metaDiaria) return 0;
    const metaMl = parseFloat(metaDiaria) * 1000;
    return Math.min((consumoAtual / metaMl) * 100, 100);
  };

  const getProgressoColor = () => {
    const progresso = calcularProgresso();
    if (progresso >= 100) return "#27ae60";
    if (progresso >= 70) return "#3498db";
    if (progresso >= 40) return "#f39c12";
    return "#e74c3c";
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
          <Icon name="water" size={50} color="#FFF" />
        </View>
        <Text style={styles.title}>Calculadora de Água</Text>
        <Text style={styles.subtitle}>
          Mantenha-se hidratado
        </Text>
      </View>

      {/* Input de Peso */}
      {!metaDiaria && (
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Calcule sua meta diária</Text>
          <View style={styles.inputCard}>
            <Icon name="body" size={24} color="#5B21B6" />
            <TextInput
              style={styles.input}
              placeholder="Seu peso"
              keyboardType="decimal-pad"
              value={peso}
              onChangeText={setPeso}
              placeholderTextColor="#999"
            />
            <Text style={styles.inputUnit}>kg</Text>
          </View>

          {error && (
            <View style={styles.errorCard}>
              <Icon name="alert-circle" size={18} color="#EF4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity 
            style={styles.calcularButton} 
            onPress={calcularAgua}
            activeOpacity={0.8}
          >
            <Icon name="calculator" size={20} color="#FFF" />
            <Text style={styles.calcularButtonText}>Calcular Meta</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Meta e Consumo */}
      {metaDiaria && (
        <Animated.View style={[styles.metaSection, { opacity: fadeAnim }]}>
          {/* Card de Meta */}
          <View style={styles.metaCard}>
            <View style={styles.metaHeader}>
              <Icon name="flag" size={24} color="#5B21B6" />
              <Text style={styles.metaLabel}>Meta Diária</Text>
            </View>
            <Text style={styles.metaValue}>{metaDiaria}L</Text>
            <Text style={styles.metaSubtext}>35ml por kg de peso</Text>
          </View>

          {/* Progresso */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progresso de Hoje</Text>
              <Text style={styles.progressPercentage}>
                {calcularProgresso().toFixed(0)}%
              </Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    width: `${calcularProgresso()}%`,
                    backgroundColor: getProgressoColor()
                  }
                ]}
              />
            </View>

            <View style={styles.progressValues}>
              <Text style={styles.progressCurrent}>
                {(consumoAtual / 1000).toFixed(2)}L
              </Text>
              <Text style={styles.progressSeparator}>/</Text>
              <Text style={styles.progressGoal}>{metaDiaria}L</Text>
            </View>
          </View>

          {/* Opções de Consumo */}
          <View style={styles.consumoSection}>
            <Text style={styles.sectionTitle}>Adicionar Consumo</Text>
            <View style={styles.consumoGrid}>
              {opcoesConsumo.map((opcao, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.consumoButton}
                  onPress={() => opcao.ml > 0 ? adicionarConsumo(opcao.ml) : adicionarPersonalizado()}
                  activeOpacity={0.7}
                >
                  <View style={styles.consumoIconContainer}>
                    <Icon name={opcao.icon} size={28} color="#5B21B6" />
                  </View>
                  <Text style={styles.consumoLabel}>{opcao.label}</Text>
                  {opcao.ml > 0 && (
                    <Text style={styles.consumoMl}>{opcao.ml}ml</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Botões de Ação */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.resetConsumoButton}
              onPress={resetarConsumo}
              activeOpacity={0.8}
            >
              <Icon name="refresh" size={20} color="#F59E0B" />
              <Text style={styles.resetConsumoText}>Resetar Hoje</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.novaMetaButton}
              onPress={limparCampos}
              activeOpacity={0.8}
            >
              <Icon name="calculator-outline" size={20} color="#6B7280" />
              <Text style={styles.novaMetaText}>Nova Meta</Text>
            </TouchableOpacity>
          </View>

          {/* Dicas */}
          <View style={styles.tipsCard}>
            <Icon name="bulb" size={20} color="#F59E0B" />
            <View style={styles.tipsContent}>
              <Text style={styles.tipsTitle}>Dicas de Hidratação</Text>
              <Text style={styles.tipsText}>
                • Beba água ao acordar{'\n'}
                • Mantenha uma garrafa por perto{'\n'}
                • Beba antes, durante e após exercícios{'\n'}
                • Aumente em dias quentes
              </Text>
            </View>
          </View>
        </Animated.View>
      )}
    </ScrollView>
  );
}