import { TextInput, TouchableOpacity, View, Text } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Modal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-dark-main px-20">
      <View className="w-full gap-y-8">
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
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Text className="text-white">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-dark-primary items-center p-2 rounded-md  w-1/2 flex-row justify-center gap-x-2"
          onPress={() => console.log("NOT IMPLEMENTED")}
        >
          <Text className="text-white">Sign up</Text>
          <Ionicons name="chevron-forward-outline" size={18} color={"white"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
