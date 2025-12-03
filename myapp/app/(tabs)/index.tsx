import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { api } from "@/constants/axios";

export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  });

  const checkLoginStatus = async () => {
    const token = await SecureStore.getItemAsync("token");

    if (!token) {
      setIsLoggedIn(false);
      setUserName("Guest");
      return;
    }

    try {
      setIsLoggedIn(true);
      const res = await api.get("/api/user/profile");
      setUserName(res.data.profile.username);
    } catch (error) {
      console.log(error);
      await SecureStore.deleteItemAsync("token");
      setIsLoggedIn(false);
      setUserName("Guest");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcome}>Welcome back {userName} 👋</Text>

      <Text style={styles.title}>Stay Informed with Daily News</Text>
      <Text style={styles.subtitle}>
        Get the latest updates, headlines, and trending stories from around the
        world all in one place.
      </Text>

      {!isLoggedIn && (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/news")}
      >
        <Text style={styles.buttonText}>Read Latest News</Text>
      </TouchableOpacity>
      <View
        style={{
          width: 300,
          padding: 30,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 24,
          height: 150,
          backgroundColor: "black",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", marginBottom: 10 }}>Add showing</Text>

        <TouchableOpacity
          style={{
            backgroundColor: "gold",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
          }}
          onPress={() => router.push("/subscription")}
        >
          <Text style={{ fontWeight: "700" }}>Remove Ads • Go Prime</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Categories</Text>
        <Text style={styles.category}>🌍 World</Text>
        <Text style={styles.category}>💼 Business</Text>
        <Text style={styles.category}>⚙️ Technology</Text>
        <Text style={styles.category}>🎮 Entertainment</Text>
        <Text style={styles.category}>🏏 Sports</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F9",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "700",
    color: "#BC291D",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D3557",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#BC291D",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#BC291D",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#BC291D",
    fontSize: 17,
    fontWeight: "600",
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1D3557",
    marginBottom: 15,
  },
  category: {
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#BC291D",
    color: "#333",
  },
});
