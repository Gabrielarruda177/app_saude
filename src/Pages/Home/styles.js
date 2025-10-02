import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F0FA",
  },
  
  navbar: {
    width: '100%',
    padding: 20,
    paddingTop: 45,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#023E8A',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  navTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Permite centralização
    // REMOVIDO: marginRight: 20, pois os botões laterais agora gerenciam o espaço.
  },
  
  grid: {
    justifyContent: 'space-around',
    padding: 10,
    paddingTop: 20,
  },
  card: {
    width: width / 2 - 20,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: width / 2 - 20,
    elevation: 8,
    shadowColor: "#0077B6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  cardIcon: {
    marginBottom: 10,
    color: "#0077B6",
  },
  cardText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#03045e',
  },
  
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalBox: {
    width: '80%',
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#023E8A',
  },
  modalBtn: {
    width: '100%',
    padding: 15,
    backgroundColor: '#0077B6',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  modalBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalClose: {
    marginTop: 10,
    padding: 5,
  },
  modalCloseTxt: {
    color: '#555',
    fontSize: 14,
  },

  modalContent: { // Para o modal de confirmação de logout
    width: '85%', 
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  modalText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#03045e',
    textAlign: 'center',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 25,
    gap: 10,
  },
  modalBotao: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBotaoCancelar: {
    backgroundColor: '#94A3B8',
  },
  modalBotaoConfirmar: {
    backgroundColor: '#d9534f',
  },
  modalBotaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 10,
    padding: 5,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
  },
  contentWithMargin: {
    flex: 1,
    padding: 20,
    marginTop: 0,
  },
});