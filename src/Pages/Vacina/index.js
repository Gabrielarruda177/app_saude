import React, { useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

// Componente auxiliar para renderizar cada seção de vacinas
const VacinaSection = ({ ageGroup, vaccines, sectionKey, isFiltered }) => (
  <View style={[styles.sectionCard, isFiltered && styles.sectionCardFiltered]}>
    <Text style={styles.sectionTitle}>{ageGroup}</Text> 
    {vaccines.map((vac, index) => (
      <View key={index} style={styles.itemContainer}>
        <Text style={styles.itemBullet}>•</Text>
        <Text style={styles.item}>{vac}</Text>
      </View>
    ))}
  </View>
);

const ALL_DATA = {
  'CriancaAdolescente': {
    title: "Criança/Adolescente",
    subtitle: "0 a 19 anos",
    iconName: "happy-outline",
    vaccines: [
      "BCG (ao nascer)",
      "Hepatite B (ao nascer, 2, 4 e 6 meses)",
      "Pentavalente (DTP + Hib + Hepatite B)",
      "Poliomielite (VIP/VOP)",
      "Pneumocócica 10-valente",
      "Rotavírus",
      "Meningocócica C e ACWY",
      "Tríplice viral (Sarampo, Caxumba, Rubéola) - 1ª dose 12 meses",
      "Varicela (Catapora)",
      "Febre Amarela",
      "dT (Reforço a cada 10 anos)",
      "HPV (9 a 14 anos)",
    ],
  },
  'Adulto': {
    title: "Adulto",
    subtitle: "20 a 59 anos",
    iconName: "body-outline",
    vaccines: [
      "Hepatite B (3 doses, se não vacinado)",
      "Tríplice viral (seletiva, até 49 anos)",
      "Dupla Adulto (dT - Reforço a cada 10 anos)",
      "dTpa (Gestantes e Profissionais de Saúde)",
      "Influenza (Gripe) - Anual (Grupos de risco)",
      "Febre Amarela (se residir ou viajar para área de risco)",
      "COVID-19 (Esquema completo + reforços)",
    ],
  },
  'Idoso': {
    title: "Idoso",
    subtitle: "60+ anos",
    iconName: "walk-outline",
    vaccines: [
      "Influenza (Gripe) - Anual",
      "Pneumocócica 23-valente (ou 13-valente, conforme indicação)",
      "Herpes Zoster (dose única)",
      "Dupla Adulto (dT - Reforço a cada 10 anos)",
      "COVID-19 (Reforço atualizado)",
    ],
  },
  'Gestante': {
    title: "Gestante",
    subtitle: "Período Gestacional",
    iconName: "heart-outline",
    vaccines: [
      "dTpa (A cada gestação, a partir da 20ª semana)",
      "Influenza (Gripe) - Anual",
      "Hepatite B (esquema completo ou doses faltantes)",
      "COVID-19 (Dose e reforço atualizados)",
    ],
  },
};

// Variável global para armazenar as posições Y de cada seção
let sectionPositions = {};

export default function Vacina() {
  const categories = Object.keys(ALL_DATA);
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredSections, setFilteredSections] = useState(categories); // Começa mostrando todas
  const scrollViewRef = useRef(null);
  
  // Função para armazenar a posição Y da seção
  const setSectionPosition = (key, y) => {
    sectionPositions[key] = y;
  };

  // Lidar com o clique no botão do filtro - AGORA FUNCIONANDO
  const handleFilterClick = (key) => {
    setActiveCategory(key);
    
    // Se clicar na mesma categoria que já está ativa, mostra todas
    if (filteredSections.length === 1 && filteredSections[0] === key) {
      setFilteredSections(categories);
      setActiveCategory(null);
    } else {
      // Filtra para mostrar apenas a categoria selecionada
      setFilteredSections([key]);
    }
  };
  
  // Função para limpar filtro
  const clearFilter = () => {
    setFilteredSections(categories);
    setActiveCategory(null);
  };

  // Componente do botão
  const FilterButton = ({ categoryKey, label, iconName, subtitle }) => {
    const isActive = activeCategory === categoryKey;
    
    return (
      <TouchableOpacity
        style={[styles.filterButton, isActive && styles.filterButtonActive]}
        onPress={() => handleFilterClick(categoryKey)}
      >
        <Icon name={iconName} size={20} style={[styles.filterIcon, isActive && styles.filterIconActive]} />
        <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
          {label}
        </Text>
        <Text style={[styles.filterSubtitle, isActive && styles.filterSubtitleActive]}>
          {subtitle}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* CABEÇALHO SIMPLES - SEM AZUL */}
      <View style={styles.header}>
        <Text style={styles.title}>Vacinas</Text>
      </View>
      
      {/* Container dos Botões de Filtro */}
      <View style={styles.filterContainer}>
        {categories.map(key => {
          const data = ALL_DATA[key];
          return (
            <FilterButton 
                key={key} 
                categoryKey={key} 
                label={data.title}
                subtitle={data.subtitle}
                iconName={data.iconName}
            />
          );
        })}
      </View>

      {/* Botão para limpar filtro (aparece apenas quando um filtro está ativo) */}
      {activeCategory && (
        <TouchableOpacity style={styles.clearFilterButton} onPress={clearFilter}>
          <Text style={styles.clearFilterText}>Mostrar Todas</Text>
        </TouchableOpacity>
      )}

      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContent}>
        
        {/* Renderiza APENAS as seções filtradas */}
        {filteredSections.map(key => {
          const data = ALL_DATA[key];
          return (
            <VacinaSection
              key={key}
              sectionKey={key}
              ageGroup={`${data.title} (${data.subtitle})`}
              vaccines={data.vaccines}
              isFiltered={activeCategory === key}
            />
          );
        })}

        <Text style={styles.note}>
          * Calendário baseado nas diretrizes do Ministério da Saúde. Consulte sempre um profissional para um esquema vacinal personalizado.
        </Text>
      </ScrollView>
    </View>
  );
}