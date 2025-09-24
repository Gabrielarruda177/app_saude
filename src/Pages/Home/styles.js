import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#202561',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  navTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 90,
  },
  grid: {
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    width: width / 2 - 20,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalBtn: {
    width: '100%',
    padding: 15,
    backgroundColor: '#3795a2',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailContainer: {
    flex: 1,
    padding: 20,
  },
  detailText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },

  backBtn: {
    position: 'absolute',
    top: 80,
    left: 10,
    padding: 5,
    zIndex: 1,
  },

  contentWithMargin: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },

  backBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalClose: {
    marginTop: 10,
  },
  modalCloseTxt: {
    color: '#555',
    fontSize: 14,
  },
});