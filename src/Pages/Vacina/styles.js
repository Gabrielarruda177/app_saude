import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get('window');

// Cores Azuis e Brancas (Tema MonitóriaSaúde)
const PRIMARY_BLUE = '#0077B6'; // Azul principal (forte, para cards e detalhes)
const DARK_BLUE = '#023E8A';   // Azul escuro (cabeçalhos e texto forte)
const LIGHT_BACKGROUND = '#F5F5F5'; // Fundo suave

export default StyleSheet.create({
  // CONTAINER PRINCIPAL
  mainContainer: {
    flex: 1,
    backgroundColor: LIGHT_BACKGROUND,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  
  // CABEÇALHO SIMPLES - SEM FUNDO AZUL
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },

  // TÍTULO da tela (VACINAS) - AGORA EM AZUL ESCURO
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: DARK_BLUE,
    textAlign: "center",
    letterSpacing: 1,
  },
  
  // CONTAINER DOS BOTÕES (Filtro)
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  // BOTÕES (Cards pequenos no topo)
  filterButton: {
    width: (width - 50) / 4, 
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 5, 
    alignItems: 'center',
    justifyContent: 'center',
    height: 85, 
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  // ESTILO DO BOTÃO ATIVO/SELECIONADO
  filterButtonActive: {
    backgroundColor: PRIMARY_BLUE,
    borderColor: DARK_BLUE,
  },

  // TEXTOS E ÍCONES DOS BOTÕES
  filterIcon: {
    color: PRIMARY_BLUE,
    marginBottom: 4,
  },
  filterIconActive: {
    color: '#fff',
  },
  filterText: {
    fontSize: 9, 
    fontWeight: "bold",
    color: DARK_BLUE,
    textAlign: 'center',
    lineHeight: 11,
  },
  filterTextActive: {
    color: '#fff',
  },
  filterSubtitle: {
    fontSize: 7, 
    color: '#666',
    textAlign: 'center',
  },
  filterSubtitleActive: {
    color: '#ccc',
  },

  // BOTÃO LIMPAR FILTRO
  clearFilterButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearFilterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  // SEÇÃO DE CONTEÚDO (Onde as vacinas são listadas)
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderLeftWidth: 5,
    borderLeftColor: PRIMARY_BLUE,
  },
  
  // ESTILO PARA SEÇÃO FILTRADA (destaque)
  sectionCardFiltered: {
    backgroundColor: '#F0F8FF',
    borderLeftWidth: 5,
    borderLeftColor: DARK_BLUE,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: DARK_BLUE,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 5,
  },

  // ITENS DA VACINA
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemBullet: {
    fontSize: 16,
    color: PRIMARY_BLUE,
    marginRight: 8,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  item: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },

  // NOTA DE RODAPÉ
  note: {
    fontSize: 13,
    color: '#777',
    marginTop: 10,
    textAlign: "center",
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
});