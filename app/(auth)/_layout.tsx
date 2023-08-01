import { Stack } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen
        options={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
        name="login"
      />
    </Stack>
  );
}
