import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import AddressScreen from "../screens/AddressScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import OrderScreen from "../screens/OrderScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const StackNavigation = () => {
    function BottomTab() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarLabelStyle: { color: "#ff6a00" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Entypo name="home" size={24} color="#ff6a00" />
                            ) : (
                                <AntDesign
                                    name="home"
                                    size={24}
                                    color="black"
                                />
                            ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Profile",
                        tabBarLabelStyle: { color: "#ff6a00" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons
                                    name="person"
                                    size={24}
                                    color="#ff6a00"
                                />
                            ) : (
                                <Ionicons
                                    name="person-outline"
                                    size={24}
                                    color="black"
                                />
                            ),
                    }}
                />
                <Tab.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Cart",
                        tabBarLabelStyle: { color: "#ff6a00" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <FontAwesome
                                    name="shopping-cart"
                                    size={24}
                                    color="#ff6a00"
                                />
                            ) : (
                                <AntDesign
                                    name="shoppingcart"
                                    size={24}
                                    color="black"
                                />
                            ),
                    }}
                />
            </Tab.Navigator>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Main" component={BottomTab} />
                <Stack.Screen name="Info" component={ProductInfoScreen} />
                <Stack.Screen name="Address" component={AddAddressScreen} />
                <Stack.Screen name="Add" component={AddressScreen} />
                <Stack.Screen name="Confirm" component={ConfirmationScreen} />
                <Stack.Screen name="Order" component={OrderScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigation;
