import { StyleSheet } from 'react-native';

const DARK_BLUE = '#023E8A';
const PRIMARY_BLUE = '#0077B6';
const LIGHT_BACKGROUND = '#E6F0FA'; 
const HIGH_SEVERITY = '#D32F2F'; 
const MEDIUM_SEVERITY = '#FFC107'; 
const LOW_SEVERITY = '#4CAF50'; 

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BACKGROUND,
    padding: 20,
  },
  
  // Títulos
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: DARK_BLUE,
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: "center",
  },

  // Busca (Filtro)
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchIcon: {
    marginRight: 10,
    color: PRIMARY_BLUE,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: DARK_BLUE,
  },

  // Lista
  list: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingBottom: 20, // Espaço no final da lista
  },

  // Item da Alergia
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    borderLeftWidth: 6,
    borderLeftColor: PRIMARY_BLUE, // Cor de destaque padrão
  },
  itemContent: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK_BLUE,
    marginBottom: 3,
  },
  itemDetail: {
    fontSize: 14,
    color: '#777',
  },
  
  // Indicador de Gravidade (Pequena barra colorida)
  severityIndicator: {
    width: 8,
    height: '100%', // Para preencher a altura do item
    borderRadius: 4,
    marginRight: 10,
  },
  severityHigh: {
    backgroundColor: HIGH_SEVERITY,
  },
  severityMedium: {
    backgroundColor: MEDIUM_SEVERITY,
  },
  severityLow: {
    backgroundColor: LOW_SEVERITY,
  },

  // Nenhum Resultado Encontrado
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginTop: 50,
  },
  noResultsText: {
    fontSize: 18,
    color: DARK_BLUE,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  noResultsHint: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 5,
  }
});
