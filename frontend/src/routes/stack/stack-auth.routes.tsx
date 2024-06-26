import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Login from "../../pages/login";
import { UserOption } from "../../pages/user-option";
import { UserRegistration } from "../../pages/user-registration";
import { IStore } from "../../store";
import { TabNavigator } from "../tab.routes";

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  const isAuth = useSelector(
    (state: IStore) => state.user.user.isAuthenticated
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuth ? (
        <Stack.Screen name="App" component={TabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UserOption" component={UserOption} />
          <Stack.Screen name="UserRegistration" component={UserRegistration} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
