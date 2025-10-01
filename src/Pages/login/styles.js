import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E6F0FA", // Fundo suave e claro
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        // Mantém o padding no topo para centralizar o formulário e dar espaço ao logo
        paddingTop: 80, 
    },
    
    // --- ESTILOS CORRIGIDOS PARA O LOGO (GIF) ---
    logoImage: {
        // Reduzi o tamanho para focar apenas no coração do GIF
        width: '1400%', 
        height: 100, 
        alignSelf: 'center', 
        // Garante que o coração se sobreponha à borda do formulário
        marginBottom: -65, 
        zIndex: 10, 
        // Se o GIF tiver um gráfico lateral (como o de batimentos), 
        // esse ajuste pode ajudar a cortar o excesso
        overflow: 'hidden', 
    },
    // ----------------------------------------

    form: {
        backgroundColor: "#fff",
        borderRadius: 20,
        // Reduzi o padding vertical para compensar a margem negativa do GIF
        paddingVertical: 20, 
        paddingHorizontal: 25,
        width: "100%",
        maxWidth: 380,
        // Sombra suave para o cartão (box-shadow)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10, // Sombra para Android
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#023E8A", // Azul marinho forte
        // Garante que o título fique abaixo da área do GIF
        marginTop: 35, 
        marginBottom: 25,
        textAlign: "center",
        letterSpacing: 0.5,
    },

    // Container para agrupar Label e Input com margem
    fieldContainer: {
        width: "100%",
        marginBottom: 18,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 6,
        color: "#03045e", // Cor do texto da label
    },

    // Wrapper para o campo de texto (incluindo ícone)
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#90E0EF", // Borda azul clara
        backgroundColor: "#F8FBFF", // Fundo do campo mais claro
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    inputIcon: {
        marginRight: 10,
        color: "#0077B6", // Cor do ícone
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: "#03045e",
        paddingVertical: 0,
        paddingHorizontal: 0,
        height: 25,
    },
    
    // Estilos para campos em linha (se necessário)
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },

    halfInput: {
        flex: 1,
    },

    // Estilos de Botão Principal
    btn: {
        backgroundColor: "#0077B6", // Cor principal do botão
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        width: "100%",
        // Sombra para o botão
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
    
    // Estilos do Link "Cadastre-se"
    linkTextContainer: {
        color: '#03045e', 
        marginTop: 20,
        fontSize: 15,
        textAlign: 'center',
    },
    linkText: {
        color: '#0077B6', // Cor primária do design
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },

    // --- Estilos do Modal (Consistentes) ---
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)", // Fundo escuro transparente
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
        marginBottom: 15,
    },

    modalBotao: {
        backgroundColor: '#0077B6',
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
