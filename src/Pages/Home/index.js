import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    Pressable,
    Animated,
    Easing,
    ScrollView,
    StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles"; 
// Importações de telas filhas (mantidas)
import IMC from '../IMC';
import PressaoAlta from '../PressaoAlta'; 
import Aguinha from '../Aguinha';
import Vacina from '../Vacina';
import Remedios from '../Remedios';
import Alergias from '../Alergias';
import Diabete from '../Diabete';
import Fruta from '../Fruta';

const data = [
    { id: "1", title: "Vacina", screen: "Vacina", icon: "medkit" },
    { id: "2", title: "Aguinha", screen: "Aguinha", icon: "water" },
    { id: "3", title: "Remedios", screen: "Remedios", icon: "bandage-outline" },
    { id: "4", title: "Alergias", screen: "Alergias", icon: "bug-outline" },
    { id: "5", title: "Diabete", screen: "Diabete", icon: "restaurant" },
    { id: "6", title: "Pressao Alta", screen: "PressaoAlta", icon: "heart" },
    { id: "7", title: "IMC", screen: "IMC", icon: "scale" },
    { id: "8", title: "Fruta", screen: "Fruta", icon: "nutrition" },
];

export default function Home({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmLogoutVisible, setConfirmLogoutVisible] = useState(false); 
    const [darkMode, setDarkMode] = useState(false); 
    const [activeScreen, setActiveScreen] = useState(null);
    const animationValues = useRef(data.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        const animations = animationValues.map((anim, index) =>
            Animated.timing(anim, {
                toValue: 1,
                duration: 500,
                delay: index * 50,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            })
        );
        Animated.stagger(50, animations).start();
    }, []);

    const handleLogout = async () => {
        setConfirmLogoutVisible(false);
        await AsyncStorage.removeItem('usuarioLogado');
        setActiveScreen(null);
        if (navigation) {
            navigation.replace('Login');
        }
    };

    const renderItem = ({ item, index }) => {
        const translateY = animationValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
        });
        const opacity = animationValues[index];

        return (
            <Animated.View style={{ transform: [{ translateY }], opacity, flex: 1 }}>
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.8}
                    onPress={() => setActiveScreen(item.screen)}
                >
                    <Icon name={item.icon} size={40} style={styles.cardIcon} /> 
                    <Text style={styles.cardText}>{item.title}</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const renderActiveScreen = () => {
        switch (activeScreen) {
            case "Aguinha":
                return <Aguinha />;
            case "Vacina":
                return <Vacina />;
            case "Remedios":
                return <Remedios />;
            case "Alergias":
                return <Alergias />;
            case "Diabete":
                return <Diabete />;
            case "PressaoAlta":
                return <PressaoAlta />;
            case "IMC":
                return <IMC />;
            case "Fruta":
                return <Fruta />;
            default:
                return null;
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: darkMode ? "#023E8A" : "#E6F0FA" }]}>
            <StatusBar barStyle="light-content" backgroundColor="#023E8A" />

            {/* Navbar */}
            <View style={styles.navbar}>
                <View style={{ width: 28 }} /> 
                <Text style={styles.navTitle}>MonitoraSaúde</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ padding: 5 }}>
                    {/* Botão de Configurações */}
                    <Icon name="settings-outline" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            {activeScreen ? (
                <>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => setActiveScreen(null)}
                    >
                        <Icon name="arrow-back-outline" size={30} color="#023E8A" />
                    </TouchableOpacity>

                    <ScrollView style={styles.contentWithMargin}>
                        {renderActiveScreen()}
                    </ScrollView>
                </>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    numColumns={2}
                    contentContainerStyle={styles.grid}
                />
            )}

            {/* Modal de Configurações */}
            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.overlay}>
                    <Animated.View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Configurações</Text>

                        {/* OPÇÃO: MEU PERFIL (Chama navigation.navigate) */}
                        <Pressable
                            style={styles.modalBtn}
                            onPress={() => {
                                setModalVisible(false);
                                // Chamar a tela Perfil
                                navigation.navigate('Perfil'); 
                            }}
                        >
                            <Text style={styles.modalBtnText}>👤 Meu Perfil</Text>
                        </Pressable>

                        {/* BOTÃO SAIR */}
                        <Pressable
                            style={[styles.modalBtn, { backgroundColor: "#d9534f" }]}
                            onPress={() => {
                                setModalVisible(false);
                                setConfirmLogoutVisible(true);
                            }}
                        >
                            <Text style={styles.modalBtnText}>🚪Sair</Text>
                        </Pressable>

                        <Pressable style={styles.modalClose} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCloseTxt}>Fechar</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </Modal>

            {/* Modal de Confirmação de Logout (Mantido) */}
            <Modal visible={confirmLogoutVisible} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modalContent}>
                        <Text style={[styles.modalTitle, { color: '#d9534f' }]}>Atenção!</Text>
                        <Text style={[styles.modalText, { marginBottom: 20 }]}>
                            Tem certeza que deseja desconectar sua conta e sair do aplicativo?
                        </Text>
                        <View style={styles.modalButtonRow}>
                            <Pressable 
                                style={[styles.modalBotao, styles.modalBotaoCancelar]} 
                                onPress={() => setConfirmLogoutVisible(false)}
                            >
                                <Text style={styles.modalBotaoTexto}>Não, Ficar</Text>
                            </Pressable>
                            <Pressable 
                                style={[styles.modalBotao, styles.modalBotaoConfirmar]} 
                                onPress={handleLogout}
                            >
                                <Text style={styles.modalBotaoTexto}>Sim, Sair</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}