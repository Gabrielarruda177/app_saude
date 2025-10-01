import { StyleSheet } from "react-native";

const DARK_BLUE = '#023E8A';
const PRIMARY_BLUE = '#0077B6';
const LIGHT_BACKGROUND = '#E6F0FA'; // Fundo claro para consistência
const SUCCESS_COLOR = '#28A745';
const ERROR_COLOR = '#DC3545';

export default StyleSheet.create({
  fullContainer: { // Estilo de container principal adicionado para a ScrollView
    flex: 1,
    backgroundColor: LIGHT_BACKGROUND,
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  
  // Box de Cadastro
  box: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    shadowColor: DARK_BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 30, // Espaço extra antes da lista
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: DARK_BLUE,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#555',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: PRIMARY_BLUE,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    color: DARK_BLUE,
  },

  // Botões de Ação (Galeria/Câmera)
  imageButtonsContainer: { // Container para alinhamento dos botões de imagem
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  // Botões de Galeria e Câmera com estilo unificado
  galleryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: PRIMARY_BLUE,
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  cameraButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: PRIMARY_BLUE,
    padding: 12,
    borderRadius: 8,
  },
  buttonSalvar: {
    backgroundColor: PRIMARY_BLUE,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
  },
  buttonTextSalvar: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText: { // Texto usado nos botões de Galeria/Câmera
    color: PRIMARY_BLUE,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },

  // Pré-visualização de Imagem
  imagePreviewContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  imagePreview: {
    width: "80%",
    height: 150,
    borderRadius: 8,
    marginVertical: 10,
  },
  removeImageText: {
    color: ERROR_COLOR,
    textDecorationLine: 'underline',
    fontSize: 14,
  },

  // Lista de Remédios
  listaBox: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    shadowColor: DARK_BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  listaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: DARK_BLUE,
    borderBottomWidth: 2,
    borderBottomColor: PRIMARY_BLUE,
    paddingBottom: 5,
  },
  emptyListText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    paddingVertical: 20,
  },
  remedioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_BACKGROUND,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: PRIMARY_BLUE, // Detalhe visual na lateral
  },
  remedioIcon: {
    marginRight: 10,
    color: PRIMARY_BLUE,
  },
  remedioDetails: {
    flex: 1,
  },
  remedioTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: DARK_BLUE,
  },
  remedioText: {
    fontSize: 14,
    color: '#333',
  },
  remedioImagePreview: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginLeft: 10,
  },


  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalBox: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 12,
    width: "80%",
    alignItems: 'center',
  },
  modalBoxSuccess: { // Cor de borda para sucesso
    borderWidth: 3,
    borderColor: SUCCESS_COLOR,
  },
  modalBoxError: { // Cor de borda para erro
    borderWidth: 3,
    borderColor: ERROR_COLOR,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: PRIMARY_BLUE,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
