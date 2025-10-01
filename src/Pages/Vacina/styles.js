import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get('window');
const PRIMARY_BLUE = '#0077B6';
const DARK_BLUE = '#023E8A';
const LIGHT_BACKGROUND = '#E6F0FA';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: LIGHT_BACKGROUND,
  },
  
  // TÍTULOS
  title: {
    fontSize: 26,
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
  
  // SEÇÃO (Card Envolvente)
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 4,
    shadowColor: PRIMARY_BLUE,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderLeftWidth: 5,
    borderLeftColor: PRIMARY_BLUE, // Detalhe azul na lateral
  },

  // CABEÇALHO DA SEÇÃO
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: "800",
    color: DARK_BLUE,
    marginLeft: 10,
  },
  sectionIcon: {
    color: PRIMARY_BLUE,
  },

  // ITENS DA VACINA
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  itemBullet: {
    fontSize: 16,
    color: PRIMARY_BLUE,
    marginRight: 8,
    lineHeight: 24, // Para alinhar com o texto
  },
  item: {
    flex: 1, // Garante que o texto ocupe o espaço restante
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },

  // NOTA DE RODAPÉ
  note: {
    fontSize: 14,
    color: '#777',
    marginTop: 20,
    textAlign: "center",
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
});
