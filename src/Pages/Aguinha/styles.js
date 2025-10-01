import { StyleSheet } from "react-native";

const DARK_BLUE = '#023E8A';
const PRIMARY_BLUE = '#0077B6';
const LIGHT_BACKGROUND = '#E6F0FA'; // Fundo claro para consistência

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: LIGHT_BACKGROUND,
  },
  
  // Ícone
  icon: {
    marginBottom: 25,
    color: PRIMARY_BLUE, // Ícone da água azul primário
  },
  
  // Títulos
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: DARK_BLUE,
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 30,
    textAlign: "center",
  },

  // Campo de Input
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20, 
  },
  inputIcon: {
    marginRight: 10,
    color: PRIMARY_BLUE,
  },
  input:{
    flex: 1,
    height: 55,
    fontSize: 18,
    color: DARK_BLUE,
    padding: 0, // Ajuste para melhor alinhamento
  },

  // Botão Principal (Calcular)
  button: {
    backgroundColor: DARK_BLUE,
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
    shadowColor: DARK_BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  
  // Botão Limpar
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: LIGHT_BACKGROUND,
    width: "100%",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 5,
    borderColor: DARK_BLUE,
    borderWidth: 2,
  },
  resetButtonText: {
    color: DARK_BLUE,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  
  // Exibição do Resultado
  resultBox: {
    marginTop: 40,
    padding: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    borderBottomWidth: 5,
    borderBottomColor: PRIMARY_BLUE,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  resultTitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 50,
    fontWeight: '900',
    color: PRIMARY_BLUE,
    lineHeight: 50,
  },
  resultUnit: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PRIMARY_BLUE,
    marginTop: 5,
  },
  
  // Erro
  errorText: {
    color: '#D32F2F', // Vermelho para erro
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
  }
});
