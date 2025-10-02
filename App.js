import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// --- IMPORTS DAS PÁGINAS ---
import Splash from "./src/Pages/Splash";
import Login from "./src/Pages/login";
import Cadastro from "./src/Pages/cadastro";
import Cadastro2 from "./src/Pages/cadastro2";
import Cadastro3 from "./src/Pages/cadastro3";
import Home from "./src/Pages/Home";
import Vacina from "./src/Pages/Vacina";
import Aguinha from "./src/Pages/Aguinha";
import Remedios from "./src/Pages/Remedios";
import Alergias from "./src/Pages/Alergias";
import Diabete from "./src/Pages/Diabete";
import PressaoAlta from "./src/Pages/PressaoAlta";
import IMC from "./src/Pages/IMC";
import Fruta from "./src/Pages/Fruta";
import Perfil from "./src/Pages/perfil";

// Criação do Stack Navigator

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Cadastro2" component={Cadastro2} />
        <Stack.Screen name="Cadastro3" component={Cadastro3} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Vacina" component={Vacina} />
        <Stack.Screen name="Aguinha" component={Aguinha} />
        <Stack.Screen name="Remedios" component={Remedios} />
        <Stack.Screen name="Alergias" component={Alergias} />
        <Stack.Screen name="Diabete" component={Diabete} />
        <Stack.Screen name="PressaoAlta" component={PressaoAlta} />
        <Stack.Screen name="IMC" component={IMC} />
        <Stack.Screen name="Fruta" component={Fruta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
