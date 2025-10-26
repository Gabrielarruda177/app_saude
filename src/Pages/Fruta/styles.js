import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  
  // Loading Screen
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },

  // Header Card
  headerCard: {
    backgroundColor: '#FFF',
    padding: 25,
    marginBottom: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },

  // Warning Card
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    gap: 10,
  },
  warningText: {
    flex: 1,
    color: '#92400E',
    fontSize: 14,
    fontWeight: '500',
  },

  // Select Button
  selectButton: {
    marginHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FF6B6B',
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  selectedFruitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    gap: 12,
  },
  selectedFruitEmoji: {
    fontSize: 32,
  },
  selectedFruitName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 0.3,
  },
  placeholderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 10,
  },
  selectButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 0.5,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    letterSpacing: 0.3,
  },
  closeModalButton: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    margin: 15,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    padding: 0,
  },

  // Fruit List
  fruitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastFruitItem: {
    borderBottomWidth: 0,
  },
  fruitItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  fruitEmoji: {
    fontSize: 28,
  },
  fruitName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2C3E50',
    letterSpacing: 0.2,
  },
  emptyList: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },

  // Loading Card
  loadingCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  loadingCardText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },

  // Info Card
  infoCard: {
    flex: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  // Fruit Header
  fruitHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  fruitHeaderEmoji: {
    fontSize: 80,
    marginBottom: 15,
  },
  fruitHeaderName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    letterSpacing: 0.5,
  },

  // Taxonomy Section
  taxonomySection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    letterSpacing: 0.3,
  },
  taxonomyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  taxonomyItem: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  taxonomyLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  taxonomyValue: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Nutrition Section
  nutritionSection: {
    padding: 20,
  },
  nutritionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  nutritionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nutritionLabel: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
    letterSpacing: 0.3,
  },

  // Placeholder
  placeholderCard: {
    flex: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 20,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  placeholderText: {
    fontSize: 15,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
});