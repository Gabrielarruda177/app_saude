import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import axios from "axios";
import styles from "./styles"; 

export default function Fruta() {
  const [banana, setBanana] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        { query: "1 banana" },
        {
          headers: {
            "x-app-id": "SEU_APP_ID",
            "x-app-key": "SUA_API_KEY",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setBanana(response.data.foods[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da banana:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f4c20d" />
        <Text style={styles.info}>Carregando dados da banana...</Text>
      </View>
    );
  }

  if (!banana) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Não foi possível carregar a banana 🍌</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍌 {banana.food_name}</Text>
      <Text style={styles.info}>Quantidade: {banana.serving_qty} {banana.serving_unit}</Text>
      <Text style={styles.info}>Peso: {banana.serving_weight_grams}g</Text>
      <Text style={styles.info}>Calorias: {banana.nf_calories} kcal</Text>
      <Text style={styles.info}>Proteínas: {banana.nf_protein}g</Text>
      <Text style={styles.info}>Carboidratos: {banana.nf_total_carbohydrate}g</Text>
      <Text style={styles.info}>Fibras: {banana.nf_dietary_fiber}g</Text>
      <Text style={styles.info}>Açúcares: {banana.nf_sugars}g</Text>
      <Text style={styles.info}>Potássio: {banana.nf_potassium}mg</Text>
    </View>
  );
}
