import { StyleSheet, View, Text } from "react-native";
import { useAuth } from "@/context/authProvider";
import React from "react";

export default function TabOneScreen() {
  const { signOut, user } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      <Text className="text-white" onPress={() => signOut()}>Sign Out - {user?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
