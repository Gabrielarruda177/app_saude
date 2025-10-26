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

// Importações de telas filhas
import IMC from '../IMC';
import PressaoAlta from '../PressaoAlta'; 
import Aguinha from '../Aguinha';
import Vacina from '../Vacina';
import Remedios from '../Remedios';
import Alergias from '../Alergias';
import Diabete from '../Diabete';
import Fruta from '../Fruta';

const data = [
    { id: "1", title: "Vacina", screen: "Vacina", icon: "medical" },
    { id: "2", title: "Aguinha", screen: "Aguinha", icon: "water" },
    { id: "3", title: "Remédios", screen: "Remedios", icon: "medkit" },
    { id: "4", title: "Alergias", screen: "Alergias", icon: "bug" },
    { id: "5", title: "Diabetes", screen: "Diabete", icon: "analytics" },
    { id: "6", title: "Pressão", screen: "PressaoAlta", icon: "heart" },
    { id: "7", title: "IMC", screen: "IMC", icon: "fitness" },
    { id: "8", title: "Frutas", screen: "Fruta", icon: "leaf" },
];

export default function Home({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmLogoutVisible, setConfirmLogoutVisible] = useState(false); 
    const [activeScreen, setActiveScreen] = useState(null);
    const animationValues = useRef(data.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        const animations = animationValues.map((anim, index) =>
            Animated.timing(anim, {
                toValue: 1,
                duration: 500,
                delay: index * 60,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            })
        );
        Animated.stagger(60, animations).start();
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
            outputRange: [40, 0],
        });
        const scale = animationValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
        });
        const opacity = animationValues[index];

        return (
            <Animated.View 
                style={{ 
                    transform: [{ translateY }, { scale }], 
                    opacity, 
                    flex: 1 
                }}
            >
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.7}
                    onPress={() => setActiveScreen(item.screen)}
                >
                    <View style={styles.iconCircle}>
                        <Icon name={item.icon} size={38} style={styles.cardIcon} /> 
                    </View>
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
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#5B21B6" />

            {/* Navbar */}
            <View style={styles.navbar}>
                <View style={{ width: 28 }} /> 
                <Text style={styles.navTitle}>MonitoraSaúde</Text>
                <TouchableOpacity 
                    onPress={() => setModalVisible(true)} 
                    style={styles.settingsButton}
                    activeOpacity={0.7}
                >
                    <Icon name="settings-outline" size={26} color="#fff" />
                </TouchableOpacity>
            </View>

            {activeScreen ? (
                <>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => setActiveScreen(null)}
                        activeOpacity={0.7}
                    >
                        <Icon name="arrow-back" size={28} color="#5B21B6" />
                    </TouchableOpacity>

                    <ScrollView 
                        style={styles.contentWithMargin}
                        showsVerticalScrollIndicator={false}
                    >
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
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* Modal de Configurações */}
            <Modal 
                visible={modalVisible} 
                transparent 
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable 
                    style={styles.overlay}
                    onPress={() => setModalVisible(false)}
                >
                    <Pressable style={styles.modalBox} onPress={(e) => e.stopPropagation()}>
                        <View style={styles.modalHeader}>
                            <Icon name="settings" size={32} color="#5B21B6" />
                            <Text style={styles.modalTitle}>Configurações</Text>
                        </View>

                        {/* OPÇÃO: MEU PERFIL */}
                        <Pressable
                            style={styles.modalBtn}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('Perfil'); 
                            }}
                        >
                            <Icon name="person" size={20} color="#FFF" />
                            <Text style={styles.modalBtnText}>Meu Perfil</Text>
                        </Pressable>

                        {/* BOTÃO SAIR */}
                        <Pressable
                            style={[styles.modalBtn, styles.logoutBtn]}
                            onPress={() => {
                                setModalVisible(false);
                                setConfirmLogoutVisible(true);
                            }}
                        >
                            <Icon name="log-out" size={20} color="#FFF" />
                            <Text style={styles.modalBtnText}>Sair</Text>
                        </Pressable>

                        <Pressable 
                            style={styles.modalClose} 
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalCloseTxt}>Fechar</Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>

            {/* Modal de Confirmação de Logout */}
            <Modal 
                visible={confirmLogoutVisible} 
                transparent 
                animationType="fade"
                onRequestClose={() => setConfirmLogoutVisible(false)}
            >
                <Pressable 
                    style={styles.overlay}
                    onPress={() => setConfirmLogoutVisible(false)}
                >
                    <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                        <View style={styles.alertIconContainer}>
                            <Icon name="alert-circle" size={60} color="#EF4444" />
                        </View>
                        
                        <Text style={styles.modalTitle}>Confirmar Saída</Text>
                        
                        <Text style={styles.modalText}>
                            Tem certeza que deseja sair do aplicativo? Você precisará fazer login novamente.
                        </Text>
                        
                        <View style={styles.modalButtonRow}>
                            <Pressable 
                                style={[styles.modalBotao, styles.modalBotaoCancelar]} 
                                onPress={() => setConfirmLogoutVisible(false)}
                            >
                                <Text style={styles.modalBotaoTexto}>Cancelar</Text>
                            </Pressable>
                            <Pressable 
                                style={[styles.modalBotao, styles.modalBotaoConfirmar]} 
                                onPress={handleLogout}
                            >
                                <Text style={styles.modalBotaoTexto}>Sair</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}