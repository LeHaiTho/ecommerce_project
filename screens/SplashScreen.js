import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => navigation.navigate("Login"), 2000);
    }, []);
    return (
        <View
            style={{
                backgroundColor: "#ff6a00",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}>
            <View
                style={{
                    width: 200,
                    height: 200,
                    marginTop: -100,
                }}>
                <Image
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    source={require("../assets/logo-removebg-.png")}
                />
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 19,
                        fontWeight: "bold",
                        color: "#fff",
                    }}>
                    ATTshop.com
                </Text>
            </View>
        </View>
    );
};

export default SplashScreen;
