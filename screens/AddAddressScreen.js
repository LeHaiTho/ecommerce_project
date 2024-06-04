import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useFocusEffect } from "@react-navigation/native";

const AddAddressScreen = ({ navigation }) => {
    const [addresses, setAddresses] = useState([]);
    useEffect(() => {
        fetchAddresses();
    }, []);
    const fetchAddresses = async () => {
        try {
            const response = await axios.get(
                `http://192.168.1.10:8000/addresses/665c5d4448bccbbcdb905743`
            );
            const { addresses } = response.data;

            setAddresses(addresses);
        } catch (error) {
            console.log("error", error);
        }
    };
    useFocusEffect(
        useCallback(() => {
            fetchAddresses();
        }, [])
    );

    console.log("addresses at addAddressScreen ", addresses);
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 50 }}>
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

            <View
                style={{
                    padding: 10,
                }}>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 20,
                    }}>
                    Vị trí của bạn
                </Text>

                <Pressable
                    onPress={() => navigation.navigate("Add")}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 10,
                        borderColor: "#D0D0D0",
                        borderWidth: 1,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        paddingVertical: 7,
                        paddingHorizontal: 5,
                    }}>
                    <Text> Thêm vị trí mới</Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        size={24}
                        color="black"
                    />
                </Pressable>

                <Pressable>
                    {/* all the added adresses */}
                    {addresses?.map((item, index) => (
                        <Pressable
                            key={index}
                            style={{
                                borderWidth: 1,
                                borderColor: "#D0D0D0",
                                padding: 10,
                                flexDirection: "column",
                                gap: 5,
                                marginVertical: 10,
                            }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 3,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "bold",
                                    }}>
                                    {item?.name}
                                </Text>
                                <Entypo
                                    name="location-pin"
                                    size={24}
                                    color="red"
                                />
                            </View>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                {item?.houseNo}, {item?.landmark}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                {item?.street}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                India, Bangalore
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                phone No : {item?.mobileNo}
                            </Text>
                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                pin code : {item?.postalCode}
                            </Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10,
                                    marginTop: 7,
                                }}>
                                <Pressable
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#D0D0D0",
                                    }}>
                                    <Text>Edit</Text>
                                </Pressable>

                                <Pressable
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#D0D0D0",
                                    }}>
                                    <Text>Remove</Text>
                                </Pressable>

                                <Pressable
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#D0D0D0",
                                    }}>
                                    <Text>Set as Default</Text>
                                </Pressable>
                            </View>
                        </Pressable>
                    ))}
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default AddAddressScreen;
