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
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleResgister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
        };

        // send a post request to the backend API
        axios
            .post("http://192.168.1.10:8000/register", user)
            .then((response) => {
                console.log(response);
                Alert.alert(
                    "Register successfully UI",
                    "You have successfully registered UI"
                );
                setName("");
                setPassword("");
                setEmail("");
            })
            .catch((error) => {
                Alert.alert(
                    "Register failed",
                    "an error occured during registration"
                );
                console.log("Register failed", error);
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

                <View>
                    <View style={{ marginTop: 40 }}>
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
                            <MaterialCommunityIcons
                                style={{ marginLeft: 8 }}
                                name="account"
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
                                value={name}
                                onChangeText={(text) => setName(text)}
                                placeholder="Họ và tên"
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
                                marginTop: 10,
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
                        onPress={handleResgister}
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
                            ĐĂNG KÝ
                        </Text>
                    </TouchableOpacity>

                    <Pressable
                        onPress={() => navigation.navigate("Login")}
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
                            Bạn đã có tài khoản?
                        </Text>
                        <Text
                            style={{
                                color: "#ff6a00",
                                fontSize: 18,
                                fontWeight: "600",
                                marginLeft: 5,
                            }}>
                            Đăng nhập
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};

export default RegisterScreen;
