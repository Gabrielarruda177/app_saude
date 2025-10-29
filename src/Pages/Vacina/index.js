import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const ALL_DATA = {
  'CriancaAdolescente': {
    title: "Criança/Adolescente",
    subtitle: "0 a 19 anos",
    iconName: "happy-outline",
    color: "#3B82F6",
    vaccines: [
      { nome: "BCG", detalhe: "Ao nascer" },
      { nome: "Hepatite B", detalhe: "Ao nascer, 2, 4 e 6 meses" },
      { nome: "Pentavalente", detalhe: "DTP + Hib + Hepatite B" },
      { nome: "Poliomielite", detalhe: "VIP/VOP" },
      { nome: "Pneumocócica 10-valente", detalhe: "2, 4 e 6 meses" },
      { nome: "Rotavírus", detalhe: "2 e 4 meses" },
      { nome: "Meningocócica C e ACWY", detalhe: "3, 5 e 12 meses" },
      { nome: "Tríplice Viral", detalhe: "Sarampo, Caxumba, Rubéola - 12 meses" },
      { nome: "Varicela", detalhe: "Catapora - 15 meses" },
      { nome: "Febre Amarela", detalhe: "9 meses" },
      { nome: "dT", detalhe: "Reforço a cada 10 anos" },
      { nome: "HPV", detalhe: "9 a 14 anos - 2 doses" },
    ],
  },
  'Adulto': {
    title: "Adulto",
    subtitle: "20 a 59 anos",
    iconName: "body-outline",
    color: "#8B5CF6",
    vaccines: [
      { nome: "Hepatite B", detalhe: "3 doses, se não vacinado" },
      { nome: "Tríplice Viral", detalhe: "Seletiva, até 49 anos" },
      { nome: "Dupla Adulto (dT)", detalhe: "Reforço a cada 10 anos" },
      { nome: "dTpa", detalhe: "Gestantes e Profissionais de Saúde" },
      { nome: "Influenza", detalhe: "Anual - Grupos de risco" },
      { nome: "Febre Amarela", detalhe: "Áreas de risco" },
      { nome: "COVID-19", detalhe: "Esquema completo + reforços" },
    ],
  },
  'Idoso': {
    title: "Idoso",
    subtitle: "60+ anos",
    iconName: "walk-outline",
    color: "#EC4899",
    vaccines: [
      { nome: "Influenza", detalhe: "Anual - Gripe" },
      { nome: "Pneumocócica 23-valente", detalhe: "Dose única ou reforço" },
      { nome: "Herpes Zoster", detalhe: "Dose única" },
      { nome: "Dupla Adulto (dT)", detalhe: "Reforço a cada 10 anos" },
      { nome: "COVID-19", detalhe: "Reforço atualizado" },
    ],
  },
  'Gestante': {
    title: "Gestante",
    subtitle: "Período Gestacional",
    iconName: "heart-outline",
    color: "#F59E0B",
    vaccines: [
      { nome: "dTpa", detalhe: "A cada gestação, após 20ª semana" },
      { nome: "Influenza", detalhe: "Anual - Gripe" },
      { nome: "Hepatite B", detalhe: "Esquema completo ou doses faltantes" },
      { nome: "COVID-19", detalhe: "Dose e reforço atualizados" },
    ],
  },
};

const VacinaCard = ({ vaccine, index, color }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <TouchableOpacity
      style={[styles.vaccineCard, { borderLeftColor: color }]}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.7}
    >
      <View style={styles.vaccineHeader}>
        <View style={[styles.vaccineDot, { backgroundColor: color }]} />
        <View style={styles.vaccineTextContainer}>
          <Text style={styles.vaccineName}>{vaccine.nome}</Text>
          {vaccine.detalhe && (
            <Text style={styles.vaccineDetail}>{vaccine.detalhe}</Text>
          )}
        </View>
        <Icon 
          name={expanded ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#9CA3AF" 
        />
      </View>
    </TouchableOpacity>
  );
};

export default function Vacina() {
  const categories = Object.keys(ALL_DATA);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleFilterClick = (key) => {
    setActiveCategory(activeCategory === key ? null : key);
  };

  const FilterButton = ({ categoryKey, data }) => {
    const isActive = activeCategory === categoryKey;
    
    return (
      <TouchableOpacity
        style={[
          styles.filterButton, 
          isActive && { ...styles.filterButtonActive, backgroundColor: data.color }
        ]}
        onPress={() => handleFilterClick(categoryKey)}
        activeOpacity={0.8}
      >
        <View style={[
          styles.filterIconContainer,
          isActive && { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
        ]}>
          <Icon 
            name={data.iconName} 
            size={24} 
            color={isActive ? '#FFF' : data.color} 
          />
        </View>
        <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
          {data.title}
        </Text>
        <Text style={[styles.filterSubtitle, isActive && styles.filterSubtitleActive]}>
          {data.subtitle}
        </Text>
      </TouchableOpacity>
    );
  };

  const filteredCategories = activeCategory ? [activeCategory] : categories;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIconContainer}>
          <Icon name="medical" size={40} color="#FFF" />
        </View>
        <Text style={styles.title}>Calendário de Vacinas</Text>
        <Text style={styles.subtitle}>
          Mantenha suas vacinas em dia
        </Text>
      </View>

      {/* Filtros */}
      <View style={styles.filterSection}>
        <Text style={styles.filterSectionTitle}>Selecione uma categoria</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContainer}
        >
          {categories.map(key => (
            <FilterButton 
              key={key} 
              categoryKey={key} 
              data={ALL_DATA[key]}
            />
          ))}
        </ScrollView>
      </View>

      {/* Botão Limpar Filtro */}
      {activeCategory && (
        <TouchableOpacity 
          style={styles.clearButton} 
          onPress={() => setActiveCategory(null)}
          activeOpacity={0.8}
        >
          <Icon name="refresh" size={18} color="#6B7280" />
          <Text style={styles.clearButtonText}>Mostrar Todas</Text>
        </TouchableOpacity>
      )}

      {/* Conteúdo */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredCategories.map(key => {
          const data = ALL_DATA[key];
          return (
            <View key={key} style={styles.categorySection}>
              {/* Cabeçalho da Categoria */}
              <View style={[styles.categoryHeader, { backgroundColor: data.color }]}>
                <View style={styles.categoryHeaderContent}>
                  <Icon name={data.iconName} size={28} color="#FFF" />
                  <View style={styles.categoryHeaderText}>
                    <Text style={styles.categoryTitle}>{data.title}</Text>
                    <Text style={styles.categorySubtitle}>{data.subtitle}</Text>
                  </View>
                </View>
                <View style={styles.vaccineCount}>
                  <Text style={styles.vaccineCountText}>{data.vaccines.length}</Text>
                </View>
              </View>

              {/* Lista de Vacinas */}
              <View style={styles.vaccinesList}>
                {data.vaccines.map((vaccine, index) => (
                  <VacinaCard 
                    key={index}
                    vaccine={vaccine}
                    index={index}
                    color={data.color}
                  />
                ))}
              </View>
            </View>
          );
        })}

        {/* Nota */}
        <View style={styles.noteCard}>
          <Icon name="information-circle" size={20} color="#F59E0B" />
          <Text style={styles.noteText}>
            Calendário baseado nas diretrizes do Ministério da Saúde. 
            Consulte sempre um profissional para um esquema vacinal personalizado.
          </Text>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Resumo do Calendário</Text>
          <View style={styles.statsGrid}>
            {categories.map(key => {
              const data = ALL_DATA[key];
              return (
                <View key={key} style={styles.statItem}>
                  <View style={[styles.statIcon, { backgroundColor: data.color + '20' }]}>
                    <Icon name={data.iconName} size={20} color={data.color} />
                  </View>
                  <Text style={styles.statNumber}>{data.vaccines.length}</Text>
                  <Text style={styles.statLabel}>{data.title}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}