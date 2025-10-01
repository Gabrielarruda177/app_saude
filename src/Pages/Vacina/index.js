import React from "react";
import { View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles"; // Importa os novos estilos azuis

// Componente auxiliar para renderizar cada seção de vacinas
const VacinaSection = ({ iconName, ageGroup, vaccines }) => (
  <View style={styles.sectionCard}>
    <View style={styles.sectionHeader}>
      <Icon name={iconName} size={22} style={styles.sectionIcon} />
      <Text style={styles.sectionText}>{ageGroup}</Text>
    </View>
    {vaccines.map((vac, index) => (
      <View key={index} style={styles.itemContainer}>
        <Text style={styles.itemBullet}>•</Text>
        <Text style={styles.item}>{vac}</Text>
      </View>
    ))}
  </View>
);

export default function Vacina() {
  const data = [
    {
      iconName: "happy-outline",
      ageGroup: "Criança (0 a 9 anos)",
      vaccines: [
        "BCG",
        "Hepatite B",
        "Pentavalente (DTP + Hib + Hepatite B)",
        "Poliomielite (VIP/VOP)",
        "Pneumocócica 10-valente",
        "Rotavírus",
        "Meningocócica C",
        "Febre amarela",
        "Tríplice viral (sarampo, caxumba, rubéola)",
        "Varicela",
      ],
    },
    {
      iconName: "person-outline",
      ageGroup: "Adolescente (10 a 19 anos)",
      vaccines: [
        "Hepatite B",
        "Tríplice viral",
        "dT (difteria e tétano) - Reforço",
        "HPV (quadrivalente)",
        "Meningocócica ACWY",
      ],
    },
    {
      iconName: "body-outline",
      ageGroup: "Adulto (20 a 59 anos)",
      vaccines: [
        "Hepatite A e B",
        "Tríplice viral (seletiva)",
        "dTpa (difteria, tétano, coqueluche) - Reforço",
        "Influenza (gripe) - Anual",
        "Febre amarela (se não vacinado)",
        "Varicela (se não vacinado)",
      ],
    },
    {
      iconName: "walk-outline",
      ageGroup: "Idoso (60+ anos)",
      vaccines: [
        "Influenza - Anual",
        "Pneumocócica 23-valente",
        "dT (reforço a cada 10 anos)",
        "Herpes Zoster",
      ],
    },
    {
      iconName: "accessibility-outline",
      ageGroup: "Gestante",
      vaccines: [
        "dTpa (A cada gestação)",
        "Hepatite B (esquema completo)",
        "Influenza (gripe)",
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calendário Nacional</Text>
      <Text style={styles.subtitle}>
        Vacinas recomendadas de acordo com a faixa etária e condição
      </Text>

      {/* Renderiza as seções usando o componente auxiliar */}
      {data.map((section, index) => (
        <VacinaSection 
          key={index} 
          iconName={section.iconName}
          ageGroup={section.ageGroup}
          vaccines={section.vaccines}
        />
      ))}

      <Text style={styles.note}>
        * Estas são diretrizes. Consulte sempre seu médico ou uma unidade de saúde para avaliar seu histórico vacinal e a necessidade de reforços.
      </Text>
    </ScrollView>
  );
}
