import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  // Header
  header: {
    backgroundColor: '#5B21B6',
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 8,
    shadowColor: '#5B21B6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  headerIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },

  // Seção de Filtros
  filterSection: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    marginTop: -15,
    marginHorizontal: 15,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
    marginLeft: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  filterScrollContainer: {
    paddingHorizontal: 15,
    gap: 10,
  },
  filterButton: {
    width: 130,
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterButtonActive: {
    borderColor: 'transparent',
    elevation: 5,
  },
  filterIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  filterTextActive: {
    color: '#FFF',
  },
  filterSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  filterSubtitleActive: {
    color: 'rgba(255, 255, 255, 0.8)',
  },

  // Botão Limpar
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  clearButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },

  // Conteúdo
  content: {
    flex: 1,
    marginTop: 15,
  },

  // Seção de Categoria
  categorySection: {
    marginBottom: 20,
    marginHorizontal: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  categoryHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  categoryHeaderText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 3,
    letterSpacing: 0.3,
  },
  categorySubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  vaccineCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vaccineCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },

  // Lista de Vacinas
  vaccinesList: {
    gap: 8,
  },
  vaccineCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  vaccineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  vaccineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  vaccineTextContainer: {
    flex: 1,
  },
  vaccineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 3,
    letterSpacing: 0.2,
  },
  vaccineDetail: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },

  // Nota
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF3C7',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    gap: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    lineHeight: 20,
    fontWeight: '500',
  },

  // Estatísticas
  statsCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    letterSpacing: 0.3,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '600',
  },
});