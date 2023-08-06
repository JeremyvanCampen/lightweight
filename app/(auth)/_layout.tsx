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
      <Stack.Screen
        name="modal"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "modal",
          animation: "slide_from_bottom",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
