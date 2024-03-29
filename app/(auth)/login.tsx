import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "@/context/authProvider";
import React from "react";
import { Link } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      if (error.code == "auth/invalid-email") {
        console.log(
          "The provided value for the email user property is invalid. It must be a string email address"
        );
      }
    }
  };
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-dark-main px-20">
      <View className="w-full gap-y-8">
        <Animated.View className="w-full h-48  items-center">
          <Animated.Image
            entering={FadeIn.duration(5000)}
            source={require("assets/images/logo_transparent.png")}
            className="flex-1"
            resizeMode="contain"
          />
        </Animated.View>
        <View className=" bg-white flex-row items-center gap-x-2 rounded-xl p-1 pr-2">
          <Ionicons name="mail-outline" size={18} />
          <TextInput
            value={email}
            onChangeText={(email) => setEmail(email)}
            className="bg-transparent flex-1"
            textContentType="emailAddress"
            keyboardType="email-address"
            placeholder="Enter Email"
          />
        </View>
        <View className=" bg-white flex-row items-center gap-x-2 rounded-xl p-1">
          <Ionicons name="lock-closed-outline" size={18} />
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            current-password
            className="bg-transparent"
            secureTextEntry={true}
            placeholder="Enter Password"
          />
        </View>
      </View>
      <View className="mt-6 w-full justify-between flex-row items-center">
        <Link className="text-white" href="/modal">Sign up</Link>
        <TouchableOpacity
          className="bg-dark-primary items-center p-2 rounded-md  w-1/2 flex-row justify-center gap-x-2"
          onPress={handleLogin}
        >
          <Text className="text-white">Sign in</Text>
          <Ionicons name="chevron-forward-outline" size={18} color={"white"} />
        </TouchableOpacity>
      </View>

      {/* <Text className='text-red-500'>Tab One</Text>
      <View />
      <EditScreenInfo path="app/(authentication)/index.tsx" /> */}
    </SafeAreaView>
  );
}
