import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#5B21B6",
    },

    // Background Decorativo
    backgroundTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height * 0.4,
        backgroundColor: '#7C3AED',
        opacity: 0.5,
    },
    backgroundCircle1: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(167, 139, 250, 0.2)',
    },
    backgroundCircle2: {
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(167, 139, 250, 0.15)',
    },

    // Conteúdo Principal
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        zIndex: 10,
    },

    // Logo Container
    logoContainer: {
        marginBottom: 30,
    },
    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },

    // Card de Login
    card: {
        backgroundColor: "#FFF",
        borderRadius: 25,
        paddingVertical: 35,
        paddingHorizontal: 30,
        width: "100%",
        maxWidth: 400,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 15,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#2C3E50",
        marginBottom: 8,
        textAlign: "center",
        letterSpacing: 0.5,
    },

    subtitle: {
        fontSize: 15,
        color: "#6B7280",
        marginBottom: 30,
        textAlign: "center",
        fontWeight: '500',
    },

    // Field Container
    fieldContainer: {
        width: "100%",
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 8,
        color: "#2C3E50",
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    // Input Wrapper
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#E5E7EB",
        backgroundColor: "#F8F9FA",
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 12,
    },

    inputIcon: {
        marginRight: 12,
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: "#2C3E50",
        paddingVertical: 0,
        paddingHorizontal: 0,
    },

    eyeButton: {
        padding: 5,
    },

    // Botão Principal
    btn: {
        backgroundColor: "#5B21B6",
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 20,
        shadowColor: "#5B21B6",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },

    btnText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 18,
        letterSpacing: 1,
    },

    // Link Container
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    linkTextNormal: {
        color: '#6B7280',
        fontSize: 15,
        fontWeight: '500',
    },

    linkText: {
        color: '#5B21B6',
        fontWeight: 'bold',
        fontSize: 15,
        textDecorationLine: 'underline',
    },

    // Rodapé
    footer: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 13,
        marginTop: 30,
        fontWeight: '500',
        letterSpacing: 0.5,
    },

    // Modal
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },

    modalContent: {
        width: "85%",
        maxWidth: 400,
        backgroundColor: "#FFF",
        padding: 30,
        borderRadius: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 15,
    },

    modalIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2C3E50",
        marginBottom: 10,
        letterSpacing: 0.5,
    },

    modalText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 25,
        lineHeight: 24,
    },

    modalBotao: {
        backgroundColor: '#5B21B6',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#5B21B6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },

    modalBotaoTexto: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
});