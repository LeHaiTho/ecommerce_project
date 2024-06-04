import {
    View,
    Text,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Pressable,
    Alert,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    navigation.replace("Main");
                    console.log("token: " + token);
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkLoginStatus();
    }, []);

    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
        };

        axios
            .post("http://192.168.1.10:8000/login", user)
            .then((response) => {
                console.log(response);
                const token = response.data.token;
                AsyncStorage.setItem("authToken", token);
                navigation.navigate("Main");
            })
            .catch((error) => {
                Alert.alert("Login Error", "Invalid Email");
                console.log(error);
            });
    };

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#fff",
                paddingTop: 40,
            }}>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 30,
                    marginTop: 40,
                }}>
                <View
                    style={{
                        borderRadius: 200,
                        width: 100,
                        height: 100,
                        backgroundColor: "#ff6a00",
                    }}>
                    <Image
                        style={{
                            borderRadius: 200,
                            width: "100%",
                            height: "100%",
                        }}
                        source={require("../assets/logo-removebg-.png")}
                    />
                </View>
                <ScrollView>
                    <View style={{ marginTop: 20 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5,
                                backgroundColor: "#fff",
                                paddingVertical: 5,
                                borderRadius: 5,
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: "gray",
                            }}>
                            <MaterialIcons
                                style={{ marginLeft: 8 }}
                                name="email"
                                size={24}
                                color="gray"
                            />
                            <TextInput
                                style={{
                                    color: "gray",
                                    marginVertical: 10,
                                    width: 300,
                                    fontSize: 16,
                                }}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholder="Địa chỉ email"
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5,
                                backgroundColor: "#fff",
                                paddingVertical: 5,
                                borderRadius: 5,
                                marginTop: 30,
                                borderWidth: 1,
                                borderColor: "gray",
                            }}>
                            <Entypo
                                style={{ marginLeft: 8 }}
                                name="lock"
                                size={24}
                                color="gray"
                            />
                            <TextInput
                                style={{
                                    color: "gray",
                                    marginVertical: 10,
                                    width: 300,
                                    fontSize: 16,
                                }}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                placeholder="Nhập mật khẩu"
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            marginTop: 12,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                        <TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: 15,
                                }}>
                                Ghi nhớ mật khẩu
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text
                                style={{
                                    color: "#007FFF",
                                    fontWeight: 700,
                                    fontSize: 15,
                                }}>
                                Quên mật khẩu
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={handleLogin}
                        style={{
                            marginTop: 50,
                            backgroundColor: "#ff6a00",
                            width: 200,
                            marginLeft: "auto",
                            marginRight: "auto",
                            borderRadius: 5,
                            padding: 15,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "#fff",
                                textAlign: "center",
                            }}>
                            ĐĂNG NHẬP
                        </Text>
                    </TouchableOpacity>

                    <Pressable
                        onPress={() => navigation.navigate("Register")}
                        style={{
                            marginTop: 10,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: "center",
                                color: "gray",
                            }}>
                            Bạn mới biết đến ATT shop?
                        </Text>
                        <Text
                            style={{
                                color: "#ff6a00",
                                fontSize: 18,
                                fontWeight: "600",
                                marginLeft: 5,
                            }}>
                            Đăng ký
                        </Text>
                    </Pressable>
                </ScrollView>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;
