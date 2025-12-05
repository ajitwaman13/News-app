import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { api } from "@/constants/axios";
import { useRouter } from "expo-router";

export default function SubscriptionScreen() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [price] = useState<string>("₹199.00");

  const handleUpgrade = async () => {
    if (!name || !cardNumber || !expiry || !cvv) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/api/user/upgrade", {
        isPrime: "true",
      });

      alert("You are now a Prime user! ");
      router.replace("/");
    } catch (error) {
      console.log(error);
      alert("Subscription failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Go Prime 🚀</Text>
      <Text style={styles.subtitle}>Remove ads & enjoy unlimited news</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Card Number"
        placeholderTextColor="#777"
        keyboardType="numeric"
        maxLength={16}
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          placeholder="MM/YY"
          placeholderTextColor="#777"
          maxLength={5}
          value={expiry}
          onChangeText={setExpiry}
        />

        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="CVV"
          placeholderTextColor="#777"
          secureTextEntry
          keyboardType="numeric"
          maxLength={4}
          value={cvv}
          onChangeText={setCvv}
        />
      </View>

      <Text style={styles.price}>Plan Price: {price}</Text>

      <TouchableOpacity style={styles.button} onPress={handleUpgrade}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: "#FFF" },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#BC291D",
    marginBottom: 10,
  },
  subtitle: { fontSize: 16, color: "#444", marginBottom: 30 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
  },
  row: { flexDirection: "row" },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D3557",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#BC291D",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "700" },
});
