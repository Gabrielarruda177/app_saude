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
    flex: 0.4,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 20, 
    borderColor: '#03045e', 
    backgroundColor: '#ffffff', 
    width: '90%',
    height: '100%',
    marginBottom: 100,
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

  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },

  modalTexto: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },

  modalBotao: {
    backgroundColor: '#7ca47b',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  modalBotaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
