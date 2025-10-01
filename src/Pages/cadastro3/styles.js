import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E6F0FA", // fundo suave
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },

    form: {
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 25,
        width: "100%",
        maxWidth: 380,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#023E8A",
        marginBottom: 25,
        textAlign: "center",
        letterSpacing: 0.5,
    },

    fieldContainer: {
        width: "100%",
        marginBottom: 18,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 6,
        color: "#03045e",
    },

    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#90E0EF",
        backgroundColor: "#F8FBFF",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    inputIcon: {
        marginRight: 10,
        color: "#0077B6",
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: "#03045e",
    },

    btn: {
        backgroundColor: "#0077B6",
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15, // Aumentei um pouco para separar do último campo
        shadowColor: "#0077B6",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },

    btnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        letterSpacing: 0.8,
    },
    
    // Estilos do Modal (mantidos e aprimorados)
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },

    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 25,
        borderRadius: 14,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 6,
    },

    modalText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#03045e",
        textAlign: "center",
    },
});
