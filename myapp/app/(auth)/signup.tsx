import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { authStyles } from "@/styles/authStyles";
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import axios from "axios";
const Signup = () => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      console.log("Form data:", data);
      const response = await axios.post("http://10.0.2.2:3000/api/user/new", {
        email: data.email,
        password: data.password,
        username: data.username,
      });

      console.log(response);
      if (response.status === 200) {
        console.log(response.status);
        return router.push("/(tabs)/news");
        // alert("Signup successful!");
      } else {
        return router.push("/signup");
      }
    } catch (error) {
      console.log("error", error);
      alert("signup failed ");
    }
    reset();
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Welcome</Text>
      <Text style={authStyles.subtitle}>
        Sign up to continue reading the latest news
      </Text>
      <FormInput
        control={control}
        name="username"
        placeholder="Enter your username"
        rules={{ required: "Username is required" }}
        style={authStyles.input}
      />

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
        <Text style={authStyles.buttonText}>Signup</Text>
      </TouchableOpacity>

      <Text onPress={() => router.push("/login")} style={authStyles.subtitle1}>
        I have an account Login
      </Text>
    </View>
  );
};

export default Signup;
