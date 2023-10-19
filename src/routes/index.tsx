import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.rputes";

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
