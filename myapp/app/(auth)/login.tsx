import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { authStyles } from "@/styles/authStyles";
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const Login = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    // console.log("Form Data:", data);

    try {
      const response = await axios.post("http://10.0.2.2:3000/api/user/login", {
        email: data.email,
        password: data.password,
      });
      console.log(response);
      const token = response.data.token_Gen;
      console.log("login token ", token);
      if (!token) {
        alert("Login failed, no token received");
        return;
      }
      if (response.status === 200) {
        alert("User login ");
        // await SecureStore.setItemAsync("token", JSON.stringify(token));
        await SecureStore.setItemAsync("token", token);

        router.push("/(tabs)/news");
      }
    } catch (error) {
      console.log("error in login", error);
      alert("failed try again");
    }
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Welcome Back 👋</Text>
      <Text style={authStyles.subtitle}>
        Login to continue reading the latest news
      </Text>

      <FormInput
        control={control}
        name="email"
        placeholder="Enter your email"
        rules={{
          required: "Email is required",
        }}
        style={authStyles.input}
      />

      <FormInput
        control={control}
        name="password"
        placeholder="Enter your password"
        secureTextEntry
        rules={{
          required: "Password is required",
        }}
        style={authStyles.input}
      />

      <TouchableOpacity
        style={authStyles.button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={authStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text onPress={() => router.push("/signup")} style={authStyles.subtitle1}>
        I don t have an account Signup
      </Text>
    </View>
  );
};

export default Login;
