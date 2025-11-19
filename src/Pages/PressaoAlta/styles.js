import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F9FA',
    paddingBottom: 20,
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
    marginBottom: 20,
    elevation: 8,
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

  // Inputs Section
  inputsSection: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2C3E50',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    padding: 0,
    marginBottom: 5,
    textAlign: 'center',
  },
  inputUnit: {
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Buttons
  buttonsContainer: {
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  calcularButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B21B6',
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

  // Result Card
  resultCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
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
  resultHeaderText: {
    alignItems: 'center',
  },
  pamValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
  },
  pamLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Result Body
  resultBody: {
    padding: 20,
  },
  classificationBadge: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 15,
  },
  classificationText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
    fontWeight: '500',
  },

  // Values Grid
  valuesGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 15,
  },
  valueItem: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  valueLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  valueNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },

  // Alert Card
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

  // Reference Card
  referenceCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
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
    fontSize: 13,
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