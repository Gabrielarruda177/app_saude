import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  ActivityIndicator, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  FlatList,
  TextInput,
  Animated 
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles"; 

export default function Fruta() {
  const [frutas, setFrutas] = useState([]);
  const [frutasFiltradas, setFrutasFiltradas] = useState([]);
  const [frutaSelecionada, setFrutaSelecionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [frutaCarregando, setFrutaCarregando] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    carregarFrutas();
  }, []);

  useEffect(() => {
    if (frutaSelecionada) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [frutaSelecionada]);

  useEffect(() => {
    if (searchText === "") {
      setFrutasFiltradas(frutas);
    } else {
      const filtradas = frutas.filter(fruta =>
        fruta.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFrutasFiltradas(filtradas);
    }
  }, [searchText, frutas]);

  const carregarFrutas = () => {
    axios
      .get("https://www.fruityvice.com/api/fruit/all")
      .then((response) => {
        const frutasOrdenadas = response.data.sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        setFrutas(frutasOrdenadas);
        setFrutasFiltradas(frutasOrdenadas);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro na API:", error.message);
        setError(error.message);
        
        // Dados mock expandidos
        const dadosMock = [
          { id: 1, name: "Apple" },
          { id: 2, name: "Banana" },
          { id: 3, name: "Orange" },
          { id: 4, name: "Grape" },
          { id: 5, name: "Strawberry" },
          { id: 6, name: "Pineapple" },
          { id: 7, name: "Watermelon" },
          { id: 8, name: "Mango" }
        ];
        setFrutas(dadosMock);
        setFrutasFiltradas(dadosMock);
        setLoading(false);
      });
  };

  const carregarFruta = (fruta) => {
    setFrutaCarregando(true);
    setModalVisible(false);
    fadeAnim.setValue(0);
    
    if (error) {
      // Dados mock mais completos
      const dadosMock = {
        id: fruta.id,
        name: fruta.name,
        family: "Rosaceae",
        genus: "Malus",
        order: "Rosales",
        nutritions: {
          calories: Math.floor(Math.random() * 100) + 50,
          carbohydrates: Math.floor(Math.random() * 30) + 10,
          protein: Math.floor(Math.random() * 5) + 1,
          fat: Math.floor(Math.random() * 2),
          sugar: Math.floor(Math.random() * 20) + 5
        }
      };
      setTimeout(() => {
        setFrutaSelecionada(dadosMock);
        setFrutaCarregando(false);
      }, 300);
    } else {
      axios
        .get(`https://www.fruityvice.com/api/fruit/${fruta.name.toLowerCase()}`)
        .then((response) => {
          setFrutaSelecionada(response.data);
          setFrutaCarregando(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar fruta:", error);
          setFrutaCarregando(false);
        });
    }
  };

  const getEmoji = (frutaName) => {
    const emojis = {
      'Apple': '🍎', 'Banana': '🍌', 'Orange': '🍊', 'Grape': '🍇',
      'Strawberry': '🍓', 'Pineapple': '🍍', 'Watermelon': '🍉',
      'Lemon': '🍋', 'Pear': '🍐', 'Peach': '🍑', 'Mango': '🥭',
      'Cherry': '🍒', 'Kiwi': '🥝', 'Avocado': '🥑', 'Blueberry': '🫐',
      'Melon': '🍈', 'Papaya': '🥝', 'Tomato': '🍅'
    };
    return emojis[frutaName] || '🍎';
  };

  const getNutritionColor = (value, type) => {
    if (type === 'calories') return value > 80 ? '#e74c3c' : '#27ae60';
    if (type === 'sugar') return value > 15 ? '#e67e22' : '#27ae60';
    return '#3498db';
  };

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Carregando frutas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <Text style={styles.headerEmoji}>🍎🍌🍊</Text>
        <Text style={styles.title}>Informações Nutricionais</Text>
        <Text style={styles.subtitle}>
          {frutas.length} frutas disponíveis
        </Text>
      </View>

      {error && (
        <View style={styles.warningCard}>
          <Icon name="warning" size={20} color="#F59E0B" />
          <Text style={styles.warningText}>
            Modo offline - Dados de demonstração
          </Text>
        </View>
      )}

      {/* Botão de Seleção */}
      <TouchableOpacity 
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        {frutaSelecionada ? (
          <View style={styles.selectedFruitButton}>
            <Text style={styles.selectedFruitEmoji}>
              {getEmoji(frutaSelecionada.name)}
            </Text>
            <Text style={styles.selectedFruitName}>
              {frutaSelecionada.name}
            </Text>
            <Icon name="chevron-down" size={20} color="#FFF" />
          </View>
        ) : (
          <View style={styles.placeholderButton}>
            <Icon name="search" size={22} color="#FFF" />
            <Text style={styles.selectButtonText}>
              Escolher Fruta
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Modal de Seleção */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header do Modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione uma Fruta</Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeModalButton}
              >
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Barra de Pesquisa */}
            <View style={styles.searchContainer}>
              <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar fruta..."
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText("")}>
                  <Icon name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>

            {/* Lista de Frutas */}
            <FlatList
              data={frutasFiltradas}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity 
                  style={[
                    styles.fruitItem,
                    index === frutasFiltradas.length - 1 && styles.lastFruitItem
                  ]}
                  onPress={() => carregarFruta(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.fruitItemContent}>
                    <Text style={styles.fruitEmoji}>{getEmoji(item.name)}</Text>
                    <Text style={styles.fruitName}>{item.name}</Text>
                  </View>
                  <Icon name="chevron-forward" size={20} color="#CCC" />
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.emptyList}>
                  <Icon name="sad-outline" size={50} color="#CCC" />
                  <Text style={styles.emptyText}>Nenhuma fruta encontrada</Text>
                </View>
              }
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

      {/* Loading ao carregar fruta */}
      {frutaCarregando && (
        <View style={styles.loadingCard}>
          <ActivityIndicator size="small" color="#FF6B6B" />
          <Text style={styles.loadingCardText}>Carregando informações...</Text>
        </View>
      )}

      {/* Informações da Fruta */}
      {frutaSelecionada && !frutaCarregando && (
        <Animated.View style={[styles.infoCard, { opacity: fadeAnim }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Cabeçalho da Fruta */}
            <View style={styles.fruitHeader}>
              <Text style={styles.fruitHeaderEmoji}>
                {getEmoji(frutaSelecionada.name)}
              </Text>
              <Text style={styles.fruitHeaderName}>{frutaSelecionada.name}</Text>
            </View>

            {/* Informações Taxonômicas */}
            <View style={styles.taxonomySection}>
              <Text style={styles.sectionTitle}>Classificação</Text>
              <View style={styles.taxonomyGrid}>
                <View style={styles.taxonomyItem}>
                  <Icon name="leaf-outline" size={20} color="#27ae60" />
                  <Text style={styles.taxonomyLabel}>Família</Text>
                  <Text style={styles.taxonomyValue}>{frutaSelecionada.family}</Text>
                </View>
                <View style={styles.taxonomyItem}>
                  <Icon name="git-branch-outline" size={20} color="#3498db" />
                  <Text style={styles.taxonomyLabel}>Gênero</Text>
                  <Text style={styles.taxonomyValue}>{frutaSelecionada.genus}</Text>
                </View>
                <View style={styles.taxonomyItem}>
                  <Icon name="list-outline" size={20} color="#9b59b6" />
                  <Text style={styles.taxonomyLabel}>Ordem</Text>
                  <Text style={styles.taxonomyValue}>{frutaSelecionada.order}</Text>
                </View>
              </View>
            </View>

            {/* Informações Nutricionais */}
            <View style={styles.nutritionSection}>
              <Text style={styles.sectionTitle}>
                Valores Nutricionais (100g)
              </Text>
              
              <View style={styles.nutritionItem}>
                <View style={styles.nutritionHeader}>
                  <Icon name="flame" size={20} color="#e74c3c" />
                  <Text style={styles.nutritionLabel}>Calorias</Text>
                </View>
                <Text style={[
                  styles.nutritionValue,
                  { color: getNutritionColor(frutaSelecionada.nutritions.calories, 'calories') }
                ]}>
                  {frutaSelecionada.nutritions.calories} kcal
                </Text>
              </View>

              <View style={styles.nutritionItem}>
                <View style={styles.nutritionHeader}>
                  <Icon name="nutrition" size={20} color="#f39c12" />
                  <Text style={styles.nutritionLabel}>Carboidratos</Text>
                </View>
                <Text style={styles.nutritionValue}>
                  {frutaSelecionada.nutritions.carbohydrates}g
                </Text>
              </View>

              <View style={styles.nutritionItem}>
                <View style={styles.nutritionHeader}>
                  <Icon name="fitness" size={20} color="#3498db" />
                  <Text style={styles.nutritionLabel}>Proteínas</Text>
                </View>
                <Text style={styles.nutritionValue}>
                  {frutaSelecionada.nutritions.protein}g
                </Text>
              </View>

              <View style={styles.nutritionItem}>
                <View style={styles.nutritionHeader}>
                  <Icon name="water" size={20} color="#9b59b6" />
                  <Text style={styles.nutritionLabel}>Gorduras</Text>
                </View>
                <Text style={styles.nutritionValue}>
                  {frutaSelecionada.nutritions.fat}g
                </Text>
              </View>

              <View style={styles.nutritionItem}>
                <View style={styles.nutritionHeader}>
                  <Icon name="cube" size={20} color="#e67e22" />
                  <Text style={styles.nutritionLabel}>Açúcar</Text>
                </View>
                <Text style={[
                  styles.nutritionValue,
                  { color: getNutritionColor(frutaSelecionada.nutritions.sugar, 'sugar') }
                ]}>
                  {frutaSelecionada.nutritions.sugar}g
                </Text>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      )}

      {/* Placeholder inicial */}
      {!frutaSelecionada && !frutaCarregando && (
        <View style={styles.placeholderCard}>
          <Icon name="information-circle-outline" size={60} color="#DDD" />
          <Text style={styles.placeholderTitle}>
            Escolha uma fruta
          </Text>
          <Text style={styles.placeholderText}>
            Selecione uma fruta acima para ver suas informações nutricionais completas
          </Text>
        </View>
      )}
    </View>
  );
}