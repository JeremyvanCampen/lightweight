import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth, app } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function TabOneScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("Something went wrong:" + error.message);
      });
  };
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
      <View className="mt-6 w-full items-end">
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
