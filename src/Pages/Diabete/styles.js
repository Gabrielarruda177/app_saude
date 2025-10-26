import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    paddingTop: 10,
  },

  // Header Card
  headerCard: {
    backgroundColor: '#5B21B6',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#5B21B6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },

  // Result Card
  resultCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    gap: 15,
  },
  resultValues: {
    alignItems: 'center',
  },
  mediaValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
  },
  mediaLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  resultBody: {
    padding: 20,
  },
  statusBadge: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 15,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 24,
    fontWeight: '500',
  },
  hba1cCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDE9FE',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    gap: 12,
  },
  hba1cInfo: {
    flex: 1,
  },
  hba1cLabel: {
    fontSize: 13,
    color: '#5B21B6',
    fontWeight: '600',
    marginBottom: 4,
  },
  hba1cValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B21B6',
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  alertText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    fontWeight: '500',
  },

  // Medições Card
  medicoesCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  medicoesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    letterSpacing: 0.3,
  },
  medicaoItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  medicaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicaoNumero: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B21B6',
  },
  removeButton: {
    padding: 4,
  },

  // Momento Selector
  momentoSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  momentoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  momentoButtonActive: {
    backgroundColor: '#5B21B6',
    borderColor: '#5B21B6',
  },
  momentoButtonText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  momentoButtonTextActive: {
    color: '#FFF',
  },

  // Input Card
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    padding: 0,
  },
  inputUnit: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '600',
  },

  // Add Button
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDE9FE',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 15,
    color: '#5B21B6',
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },

  // Action Buttons
  buttonsContainer: {
    gap: 10,
    marginBottom: 20,
  },
  calcularButton: {
    backgroundColor: '#5B21B6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    elevation: 4,
    shadowColor: '#5B21B6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  calcularButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  limparButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  limparButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // Reference Card
  referenceCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  referenceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    letterSpacing: 0.3,
  },
  referenceTable: {
    gap: 12,
    marginBottom: 15,
  },
  referenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    gap: 12,
  },
  lastReferenceRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  referenceDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  referenceLabel: {
    flex: 1,
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
  },
  referenceValue: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '600',
    fontFamily: 'monospace',
  },

  // Note Card
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 10,
    gap: 10,
    marginTop: 5,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18,
    fontWeight: '500',
  },
});