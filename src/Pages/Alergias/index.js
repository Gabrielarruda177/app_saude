import React, { useState, useMemo } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity,
  Modal,
  Pressable,
  Animated
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const TIPOS_ALERGIA = [
  { id: 'alimentar', label: 'Alimentar', icon: 'restaurant' },
  { id: 'respiratoria', label: 'Respiratória', icon: 'medical' },
  { id: 'medicamentosa', label: 'Medicamentosa', icon: 'medical-outline' },
  { id: 'contato', label: 'Contato', icon: 'hand-left' },
  { id: 'picada', label: 'Picada', icon: 'bug' },
  { id: 'outras', label: 'Outras', icon: 'alert-circle' },
];

const GRAVIDADES = [
  { id: 'baixa', label: 'Baixa', cor: '#10B981', icon: 'ellipse' },
  { id: 'media', label: 'Média', cor: '#F59E0B', icon: 'ellipse' },
  { id: 'alta', label: 'Alta', cor: '#EF4444', icon: 'ellipse' },
];

const AllergyItem = ({ item, onDelete }) => {
  const gravidade = GRAVIDADES.find(g => g.id === item.severity.toLowerCase());
  const tipo = TIPOS_ALERGIA.find(t => t.id === item.type.toLowerCase());

  return (
    <View style={[styles.itemContainer, { borderLeftColor: gravidade?.cor }]}>
      <View style={styles.itemHeader}>
        <View style={[styles.typeIconContainer, { backgroundColor: gravidade?.cor + '20' }]}>
          <Icon name={tipo?.icon || 'alert-circle'} size={24} color={gravidade?.cor} />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.itemTags}>
            <View style={[styles.tag, { backgroundColor: gravidade?.cor + '20' }]}>
              <Icon name="ellipse" size={8} color={gravidade?.cor} />
              <Text style={[styles.tagText, { color: gravidade?.cor }]}>
                {item.severity}
              </Text>
            </View>
            <View style={styles.tag}>
              <Icon name={tipo?.icon || 'alert-circle'} size={12} color="#6B7280" />
              <Text style={styles.tagText}>{item.type}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
        >
          <Icon name="trash" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
      
      {item.symptoms && (
        <View style={styles.symptomsContainer}>
          <Icon name="medical" size={14} color="#6B7280" />
          <Text style={styles.symptomsText}>{item.symptoms}</Text>
        </View>
      )}
    </View>
  );
};

export default function Alergias() {
  const [alergias, setAlergias] = useState([
    { id: '1', name: 'Amendoim', severity: 'Alta', type: 'Alimentar', symptoms: 'Inchaço, dificuldade respiratória' },
    { id: '2', name: 'Camarão', severity: 'Média', type: 'Alimentar', symptoms: 'Coceira, urticária' },
    { id: '3', name: 'Pólen', severity: 'Baixa', type: 'Respiratória', symptoms: 'Espirros, coriza' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterType, setFilterType] = useState(null);
  
  // Novo cadastro
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('');
  const [newSeverity, setNewSeverity] = useState('');
  const [newSymptoms, setNewSymptoms] = useState('');

  const filteredData = useMemo(() => {
    let filtered = alergias;
    
    if (filterType) {
      filtered = filtered.filter(a => a.type.toLowerCase() === filterType);
    }
    
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(allergy =>
        allergy.name.toLowerCase().includes(lowerCaseSearch) ||
        allergy.type.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    return filtered;
  }, [searchTerm, filterType, alergias]);

  const addAlergia = () => {
    if (!newName || !newType || !newSeverity) return;

    const novaAlergia = {
      id: Date.now().toString(),
      name: newName.trim(),
      type: TIPOS_ALERGIA.find(t => t.id === newType)?.label || newType,
      severity: GRAVIDADES.find(g => g.id === newSeverity)?.label || newSeverity,
      symptoms: newSymptoms.trim(),
    };

    setAlergias([novaAlergia, ...alergias]);
    
    // Limpa campos
    setNewName('');
    setNewType('');
    setNewSeverity('');
    setNewSymptoms('');
    setModalVisible(false);
  };

  const deleteAlergia = (id) => {
    setAlergias(alergias.filter(a => a.id !== id));
  };

  const countByType = (type) => {
    return alergias.filter(a => a.type.toLowerCase() === type).length;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIconContainer}>
          <Icon name="medkit" size={40} color="#FFF" />
        </View>
        <Text style={styles.title}>Minhas Alergias</Text>
        <Text style={styles.subtitle}>Gerencie suas condições alérgicas</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Busca e Adicionar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar alergia..."
              placeholderTextColor="#9CA3AF"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            {searchTerm.length > 0 && (
              <TouchableOpacity onPress={() => setSearchTerm('')}>
                <Icon name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <Icon name="add-circle" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Filtros por Tipo */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Filtrar por Tipo</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            <TouchableOpacity 
              style={[styles.filterChip, !filterType && styles.filterChipActive]}
              onPress={() => setFilterType(null)}
            >
              <Text style={[styles.filterChipText, !filterType && styles.filterChipTextActive]}>
                Todas ({alergias.length})
              </Text>
            </TouchableOpacity>
            
            {TIPOS_ALERGIA.map(tipo => {
              const count = countByType(tipo.id);
              return (
                <TouchableOpacity 
                  key={tipo.id}
                  style={[styles.filterChip, filterType === tipo.id && styles.filterChipActive]}
                  onPress={() => setFilterType(filterType === tipo.id ? null : tipo.id)}
                >
                  <Icon 
                    name={tipo.icon} 
                    size={16} 
                    color={filterType === tipo.id ? '#FFF' : '#5B21B6'} 
                  />
                  <Text style={[styles.filterChipText, filterType === tipo.id && styles.filterChipTextActive]}>
                    {tipo.label} ({count})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Lista de Alergias */}
        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Cadastradas</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{filteredData.length}</Text>
            </View>
          </View>

          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <AllergyItem key={item.id} item={item} onDelete={deleteAlergia} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="folder-open-outline" size={60} color="#D1D5DB" />
              <Text style={styles.emptyText}>
                {searchTerm ? 'Nenhuma alergia encontrada' : 'Nenhuma alergia cadastrada'}
              </Text>
              <Text style={styles.emptySubtext}>
                {searchTerm ? 'Tente outro termo de busca' : 'Adicione sua primeira alergia'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal de Cadastro */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nova Alergia</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Nome */}
              <View style={styles.modalInputGroup}>
                <Text style={styles.modalLabel}>Nome da Alergia</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Ex: Amendoim"
                  value={newName}
                  onChangeText={setNewName}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Tipo */}
              <View style={styles.modalInputGroup}>
                <Text style={styles.modalLabel}>Tipo</Text>
                <View style={styles.optionsGrid}>
                  {TIPOS_ALERGIA.map(tipo => (
                    <TouchableOpacity
                      key={tipo.id}
                      style={[styles.optionButton, newType === tipo.id && styles.optionButtonActive]}
                      onPress={() => setNewType(tipo.id)}
                    >
                      <Icon 
                        name={tipo.icon} 
                        size={20} 
                        color={newType === tipo.id ? '#FFF' : '#5B21B6'} 
                      />
                      <Text style={[styles.optionButtonText, newType === tipo.id && styles.optionButtonTextActive]}>
                        {tipo.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Gravidade */}
              <View style={styles.modalInputGroup}>
                <Text style={styles.modalLabel}>Gravidade</Text>
                <View style={styles.severityOptions}>
                  {GRAVIDADES.map(grav => (
                    <TouchableOpacity
                      key={grav.id}
                      style={[
                        styles.severityButton, 
                        newSeverity === grav.id && { 
                          backgroundColor: grav.cor,
                          borderColor: grav.cor 
                        }
                      ]}
                      onPress={() => setNewSeverity(grav.id)}
                    >
                      <Icon 
                        name="ellipse" 
                        size={12} 
                        color={newSeverity === grav.id ? '#FFF' : grav.cor} 
                      />
                      <Text style={[
                        styles.severityButtonText,
                        newSeverity === grav.id && styles.severityButtonTextActive
                      ]}>
                        {grav.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Sintomas */}
              <View style={styles.modalInputGroup}>
                <Text style={styles.modalLabel}>Sintomas (opcional)</Text>
                <TextInput
                  style={[styles.modalInput, styles.modalTextArea]}
                  placeholder="Ex: Coceira, inchaço, dificuldade respiratória"
                  value={newSymptoms}
                  onChangeText={setNewSymptoms}
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={3}
                />
              </View>

              {/* Botões */}
              <TouchableOpacity 
                style={[styles.modalSaveButton, (!newName || !newType || !newSeverity) && styles.modalSaveButtonDisabled]}
                onPress={addAlergia}
                disabled={!newName || !newType || !newSeverity}
              >
                <Icon name="checkmark-circle" size={22} color="#FFF" />
                <Text style={styles.modalSaveButtonText}>Salvar Alergia</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}