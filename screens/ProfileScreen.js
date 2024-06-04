import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput,
} from "react-native";

const ProfileScreen = ({ navigation }) => {
    const { userId, setUserId } = useContext(UserType);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(
                    `http://192.168.1.10:8000/profile/${userId}`
                );
                const { user } = response.data;
                setUser(user);
            } catch (error) {
                console.log("error fecthProfile", error);
            }
        };

        fetchUserProfile();
    }, []);
    const logout = () => {
        clearAuthToken();
    };
    const clearAuthToken = async () => {
        await AsyncStorage.removeItem("authToken");
        console.log("auth token cleared");
        navigation.replace("Login");
    };
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    `http://192.168.1.10:8000/orders/${userId}`
                );
                const orders = response.data.orders;
                setOrders(orders);

                setLoading(false);
            } catch (error) {
                console.log("error fetchOrder", error);
            }
        };

        fetchOrders();
    }, []);

    console.log("Orders fetched successfully at ProfileScreen:", orders);
    return (
        <ScrollView
            style={{
                marginTop: 55,
                backgroundColor: "#fff",
            }}>
            <LinearGradient
                colors={["#f42b03", "#ff6a00"]}
                style={{
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <Pressable
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 7,
                        gap: 10,
                        borderRadius: 5,
                        height: 38,
                        flex: 1,
                        backgroundColor: "#fff",
                    }}>
                    <Feather
                        style={{ paddingLeft: 10 }}
                        name="search"
                        size={24}
                        color="black"
                    />
                    <TextInput placeholder="Tìm kiếm sản phẩm ATT shop" />
                </Pressable>
                <AntDesign name="shoppingcart" size={24} color="black" />
            </LinearGradient>

            <View style={{ padding: 10, backgroundColor: "#fff" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Chào mừng {user?.name}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        marginTop: 12,
                    }}>
                    <Pressable
                        onPress={() => navigation.navigate("Home")}
                        style={{
                            padding: 10,
                            backgroundColor: "#ff6a00",
                            borderRadius: 25,
                            flex: 1,
                        }}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 16,
                                color: "#fff",
                                fontWeight: 500,
                            }}>
                            Tiếp tục mua hàng
                        </Text>
                    </Pressable>
                    <Pressable
                        style={{
                            padding: 10,
                            backgroundColor: "#ff6a00",
                            borderRadius: 25,
                            flex: 1,
                        }}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 16,
                                color: "#fff",
                                fontWeight: 500,
                            }}>
                            Your Account
                        </Text>
                    </Pressable>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        marginTop: 12,
                    }}>
                    <Pressable
                        onPress={logout}
                        style={{
                            padding: 10,
                            backgroundColor: "#ff6a00",
                            borderRadius: 25,
                            flex: 1,
                        }}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 16,
                                color: "#fff",
                                fontWeight: 500,
                            }}>
                            Đăng xuất
                        </Text>
                    </Pressable>
                </View>
            </View>

            {/* loading products in cart */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <Pressable
                            style={{
                                marginTop: 20,
                                padding: 15,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: "#d0d0d0",
                                marginHorizontal: 10,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            key={order._id}>
                            {/* Render the order information here */}
                            {order.products?.map((product) => (
                                <View
                                    style={{ marginVertical: 10 }}
                                    key={product._id}>
                                    <Image
                                        source={{ uri: product.image }}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            resizeMode: "contain",
                                        }}
                                    />
                                </View>
                            ))}
                        </Pressable>
                    ))
                ) : (
                    <Text
                        style={{
                            fontWeight: "600",
                            color: "black",
                            fontSize: 18,
                            padding: 15,
                            fontStyle: "italic",
                        }}>
                        Bạn chưa có đơn hàng nào
                    </Text>
                )}
            </ScrollView>
        </ScrollView>
    );
};

export default ProfileScreen;
