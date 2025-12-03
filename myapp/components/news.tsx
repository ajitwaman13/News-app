import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Article } from "@/constants/type";
import * as SecureStore from "expo-secure-store";
import { api } from "@/constants/axios";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { categories } from "@/constants/categories";

const News = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("cricket");
  const [page, setPage] = useState(1);

  const handleNews = async () => {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        setNews([]);
        router.push("/(auth)/login");
        return;
      }
      const response = await api.get("/api/news/all", {
        params: { query: selectedCategory, page },
      });
      setNews(response.data.articles || []);
    } catch (err:any) {
      console.log("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setPage(1);
      handleNews();
    }, [selectedCategory])
  );

  const handleNext = () => {
    setPage((prev) => prev + 1);
    handleNews();
  };

  return (
    <ScrollView style={{ padding: 17, backgroundColor: "#f8f8f8" }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedCategory(cat)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 14,
              backgroundColor: selectedCategory === cat ? "#222" : "#e1e1e1",
              borderRadius: 25,
              marginRight: 10,
              marginBottom: 10,
              borderWidth: selectedCategory === cat ? 1 : 0,
              borderColor: "#000",
            }}
          >
            <Text
              style={{
                color: selectedCategory === cat ? "white" : "#333",
                fontWeight: "600",
                letterSpacing: 0.5,
              }}
            >
              {cat.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : news.length === 0 ? (
        <Text style={{ textAlign: "center", color: "gray" }}>
          Login to continue reading
        </Text>
      ) : (
        <>
          {news.map((item, index) => (
            <View
              key={index}
              style={{
                padding: 12,
                backgroundColor: "white",
                borderRadius: 12,
                marginBottom: 18,
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 17,
                  color: "#111",
                  marginBottom: 6,
                }}
              >
                {item.title}
              </Text>
              <Image
                source={{ uri: item.urlToImage }}
                style={{
                  width: "100%",
                  height: 190,
                  marginVertical: 10,
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
              <Text
                style={{
                  color: "#666",
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                {item.description}
              </Text>
            </View>
          ))}

          <TouchableOpacity
            onPress={handleNext}
            style={{
              padding: 14,
              backgroundColor: "#000",
              borderRadius: 10,
              alignItems: "center",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>NEXT →</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default News;
