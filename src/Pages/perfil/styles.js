import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: "#E6F0FA",
    },

    // --- NAVBAR (MANTIDO) ---
    profileNavbar: {
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
    profileBackBtn: {
        padding: 5,
        position: 'absolute',
        left: 15,
        top: 45,
        zIndex: 1,
    },
    profileNavTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1, 
        marginLeft: 40,
        marginRight: 40,
    },
    profileEditBtn: {
        padding: 5,
        position: 'absolute',
        right: 15,
        top: 48,
        zIndex: 1,
    },

    profileContent: {
        alignItems: 'center',
        padding: 20,
        paddingBottom: 40,
    },

    // --- AVATAR E INFO (MANTIDO) ---
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 15,
    },
    profileName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#023E8A',
        marginTop: 15,
    },
    profileEmail: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    infoCard: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#023E8A',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoIcon: {
        marginRight: 10,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        width: 120,
    },
    infoValue: {
        fontSize: 16,
        color: '#555',
        flex: 1,
    },
    editProfileButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0077B6',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 25,
        marginTop: 20,
        width: '80%',
        maxWidth: 300,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    editProfileButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    
    // --- NOVOS ESTILOS PARA O MODAL DE EDIÇÃO ---

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end', // Alinha o modal na parte inferior
    },
    modalContentEdit: {
        width: '100%',
        maxHeight: '85%', // Limita a altura para não cobrir tudo
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 25,
        alignItems: 'center',
        elevation: 15,
    },
    modalTitleEdit: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#023E8A',
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#023E8A',
        marginTop: 15,
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    inputField: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#0077B6',
        borderRadius: 10,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#F7F9FC',
    },
    modalButtonRowEdit: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 25,
        gap: 15, 
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    modalBotaoEdit: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBotaoCancelarEdit: {
        backgroundColor: '#94A3B8', // Cinza suave
    },
    modalBotaoConfirmarEdit: {
        backgroundColor: '#0077B6', // Azul primário
    },
    modalBotaoTextoEdit: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // --- LOADING (MANTIDO) ---
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#E6F0FA",
    },

    // src/Pages/Perfil/styles.js (Adicione no final)

// Estilo para o avatar na tela principal
profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#0077B6',
},

// Estilos para a área de edição da foto no Modal
photoEditContainer: {
    alignItems: 'center',
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
},
currentPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#023E8A',
},
selectPhotoButton: {
    backgroundColor: '#0077B6',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
},
selectPhotoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
},


});