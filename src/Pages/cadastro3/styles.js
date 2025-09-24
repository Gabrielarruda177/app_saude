import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  form: {
    borderWidth: 3,
    flex: 0.7,
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: "center",
    borderRadius: 20,
    borderColor: '#03045e',
    backgroundColor: '#ffffff',
    width: '90%',
    height: 'auto%',
    marginBottom: 30,
    marginLeft: 20,
  },

  formText: {
    paddingBottom: 550,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: 280,
  },

  text: {
    fontSize: 18,
    marginTop: 10,
    color: '#03045e',
  },

  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderColor:"#03045e",
    borderWidth:1,
    padding: 10,
    width: '90%',
    marginBottom: 15,
  },

  btn: {
    backgroundColor: '#03045e',
    borderWidth: 1,
    borderColor: "#caf0f8",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    shadowColor: '#000',
    color: "#ffffff",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 20,
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },

  // Modal customizado
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },

  modalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
