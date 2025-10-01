import React, { useState, useMemo } from "react";
import { View, Text, TextInput, ScrollView, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

// Lista de exemplo de alergias (simulando dados do usuário)
const ALLERGY_DATA = [
  { id: '1', name: 'Alergia a Amendoim', severity: 'Alta', type: 'Alimentar' },
  { id: '2', name: 'Alergia a Camarão', severity: 'Média', type: 'Alimentar' },
  { id: '3', name: 'Rinite Alérgica (Pólen)', severity: 'Baixa', type: 'Respiratória' },
  { id: '4', name: 'Alergia à Poeira', severity: 'Média', type: 'Respiratória' },
  { id: '5', name: 'Alergia a Penicilina', severity: 'Alta', type: 'Medicamentosa' },
  { id: '6', name: 'Alergia a Látex', severity: 'Média', type: 'Contato' },
  { id: '7', name: 'Intolerância à Lactose', severity: 'Baixa', type: 'Alimentar' },
];

// Componente para renderizar um item da alergia na lista
const AllergyItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={[
      styles.severityIndicator,
      item.severity === 'Alta' && styles.severityHigh,
      item.severity === 'Média' && styles.severityMedium,
      item.severity === 'Baixa' && styles.severityLow,
    ]} />
    <View style={styles.itemContent}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetail}>
        Tipo: {item.type} | Gravidade: {item.severity}
      </Text>
    </View>
  </View>
);

export default function Alergias() {
  const [searchTerm, setSearchTerm] = useState('');

  // Use useMemo para filtrar a lista apenas quando o termo de busca mudar
  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return ALLERGY_DATA;
    }
    const lowerCaseSearch = searchTerm.toLowerCase();
    return ALLERGY_DATA.filter(allergy =>
      allergy.name.toLowerCase().includes(lowerCaseSearch) ||
      allergy.type.toLowerCase().includes(lowerCaseSearch)
    );
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Alergias</Text>
      <Text style={styles.subtitle}>Gerencie suas condições alérgicas</Text>

      {/* Input de Busca */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Filtrar por nome ou tipo (ex: 'Amendoim', 'Respiratória')"
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {/* Lista de Alergias */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <AllergyItem item={item} />}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.noResults}>
          <Icon name="alert-circle-outline" size={40} color="#0077B6" />
          <Text style={styles.noResultsText}>Nenhuma alergia encontrada com o filtro "{searchTerm}".</Text>
          <Text style={styles.noResultsHint}>Tente outro termo ou adicione uma nova alergia.</Text>
        </View>
      )}
    </View>
  );
}
