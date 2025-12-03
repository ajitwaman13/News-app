import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { api } from "@/constants/axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

// interface user profile
interface UserProfile {
  username: string;
  email: string;
  createdAt: string;
  _id: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  async function Profiledata() {
    try {
      const res = await api.get("/api/user/profile");
      setProfile(res.data.profile);
    } catch (err) {
      console.log("Error fetching profile data:", err);
    }
  }

  useEffect(() => {
    Profiledata();
  }, []);

  if (!profile) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="lock-closed-outline" size={70} color="#BC291D" />
        <Text style={styles.emptyTitle}>You are not logged in</Text>
        <Text style={styles.emptySubtitle}>
          Please login to view your profile details.
        </Text>

        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.emptyButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>

      <View style={styles.identityBlock}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://img.lovepik.com/png/20231125/man-avatar-image-for-profile-child-diverse-guy_693690_wh860.png",
          }}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.userName}>{profile?.username}</Text>
          <Text style={styles.usernameHandle}>@{profile?.username}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Ionicons name="mail-outline" size={20} color="#BC291D" />
          <Text style={styles.detailLabel}>Email</Text>
          <Text style={styles.detailValue}>{profile?.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="person-circle-outline" size={20} color="#BC291D" />
          <Text style={styles.detailLabel}>username</Text>
          <Text style={styles.detailValue}>{profile?.username}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={20} color="#BC291D" />
          <Text style={styles.detailLabel}>Member Since</Text>
          <Text style={styles.detailValue}>
            {new Date(profile?.createdAt).toDateString()}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Ionicons name="time-outline" size={16} color="black" />
        <Text style={styles.footerText}>
          Last seen{" "}
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </Text>
      </View>

      <View style={styles.logoutWrapper}>
        <TouchableOpacity
          onPress={async () => {
            try {
              const res = await api.get("/api/user/logout");
              if (res.status === 200) {
                await SecureStore.deleteItemAsync("token");
                setProfile(null);
                alert("Logged out successfully");
                router.push("/(tabs)");
              }
            } catch (error) {
              console.log(error);
              alert("Error logging out");
            }
          }}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontWeight: "800",
    fontSize: 30,
    marginBottom: 35,
    color: "#1A1A1A",
    letterSpacing: 0.3,
  },
  identityBlock: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 35,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 22,
  },
  nameContainer: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1A1A1A",
  },
  usernameHandle: {
    color: "#666",
    fontSize: 17,
    marginTop: 5,
    fontWeight: "500",
  },
  detailsContainer: {
    marginBottom: 70,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
  },
  detailLabel: {
    fontWeight: "700",
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
    width: 120,
  },
  detailValue: {
    fontSize: 16,
    color: "#444",
    flexShrink: 1,
    fontWeight: "500",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  footerText: {
    fontSize: 18,
    color: "black",
    fontWeight: "500",
    marginLeft: 6,
  },

  logoutWrapper: {
    marginTop: 20,
    alignSelf: "center",
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 70,
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    color: "#1A1A1A",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#444",
    marginTop: 8,
    textAlign: "center",
  },
  emptyButton: {
    backgroundColor: "#BC291D",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
