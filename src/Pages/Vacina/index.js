import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";

export default function Vacina() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calendário de Vacinação</Text>
      <Text style={styles.subtitle}>Vacinas recomendadas ao longo da vida</Text>

      {/* Criança */}
      <Text style={styles.section}>👶 Criança (0 a 9 anos)</Text>
      <Text style={styles.item}>• BCG</Text>
      <Text style={styles.item}>• Hepatite B</Text>
      <Text style={styles.item}>• Pentavalente (DTP + Hib + Hepatite B)</Text>
      <Text style={styles.item}>• Poliomielite (VIP/VOP)</Text>
      <Text style={styles.item}>• Pneumocócica 10-valente</Text>
      <Text style={styles.item}>• Rotavírus</Text>
      <Text style={styles.item}>• Meningocócica C</Text>
      <Text style={styles.item}>• Febre amarela</Text>
      <Text style={styles.item}>• Tríplice viral (sarampo, caxumba, rubéola)</Text>
      <Text style={styles.item}>• Varicela</Text>

      {/* Adolescente */}
      <Text style={styles.section}>🧒 Adolescente (10 a 19 anos)</Text>
      <Text style={styles.item}>• Hepatite B</Text>
      <Text style={styles.item}>• Tríplice viral</Text>
      <Text style={styles.item}>• dT (difteria e tétano)</Text>
      <Text style={styles.item}>• HPV (quadrivalente)</Text>
      <Text style={styles.item}>• Meningocócica ACWY</Text>

      {/* Adulto */}
      <Text style={styles.section}>🧑 Adulto (20 a 59 anos)</Text>
      <Text style={styles.item}>• Hepatite A e B</Text>
      <Text style={styles.item}>• Tríplice viral</Text>
      <Text style={styles.item}>• dTpa (difteria, tétano, coqueluche)</Text>
      <Text style={styles.item}>• Influenza (gripe) anual</Text>
      <Text style={styles.item}>• Febre amarela</Text>
      <Text style={styles.item}>• Varicela</Text>

      {/* Idoso */}
      <Text style={styles.section}>👴 Idoso (60+ anos)</Text>
      <Text style={styles.item}>• Influenza anual</Text>
      <Text style={styles.item}>• Pneumocócica 23-valente</Text>
      <Text style={styles.item}>• dT (reforço a cada 10 anos)</Text>
      <Text style={styles.item}>• Herpes Zoster</Text>

      {/* Gestante */}
      <Text style={styles.section}>🤰 Gestante</Text>
      <Text style={styles.item}>• dTpa</Text>
      <Text style={styles.item}>• Hepatite B</Text>
      <Text style={styles.item}>• Influenza</Text>

      <Text style={styles.note}>
        * Consulte sempre uma unidade de saúde para atualizar seu Cartão de Vacinação.
      </Text>
    </ScrollView>
  );
}
