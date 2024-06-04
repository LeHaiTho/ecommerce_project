import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import {
    Dimensions,
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { LinearGradient } from "expo-linear-gradient";

const ProductInfoScreen = ({ navigation }) => {
    const route = useRoute();
    const [addedToCart, setAddedToCart] = useState(false);
    const { width } = Dimensions.get("window");
    const height = (width * 100) / 100;
    const dispatch = useDispatch();

    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
            setAddedToCart(false);
        }, 60000);
    };
    const cart = useSelector((state) => state.cart.cart);
    // console.log(cart);

    return (
        <ScrollView
            style={{
                marginTop: 45,
                flex: 1,
                backgroundColor: "#fff",
            }}
            showsVerticalScrollIndicator={false}>
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
                    <TextInput placeholder="Search amazon.in" />
                </Pressable>
                <Feather name="mic" size={24} color="black" />
            </LinearGradient>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {route.params.carouselImages.map((item, index) => (
                    <ImageBackground
                        style={{
                            width,
                            height,
                            marginTop: 25,
                            resizeMode: "contain",
                            backgroundColor: "blue",
                        }}
                        source={{ uri: item }}
                        key={index}>
                        <View
                            style={{
                                padding: 20,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}>
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: "red",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: "#fff",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}>
                                    20% off
                                </Text>
                            </View>

                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: "#D7D7D7",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}>
                                <Entypo name="share" size={24} color="black" />
                            </View>
                        </View>
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: "#D7D7D7",
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: 20,
                                marginTop: "auto",
                                marginBottom: 20,
                            }}>
                            <AntDesign name="hearto" size={24} color="black" />
                        </View>
                    </ImageBackground>
                ))}
            </ScrollView>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                    {route?.params?.title}
                </Text>

                <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
                    {route?.params?.price} $
                </Text>
            </View>

            <Text
                style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }}
            />

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                }}>
                <Text>Màu sắc: </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {route?.params?.color}
                </Text>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                }}>
                <Text>Kích thước: </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {route?.params?.size}
                </Text>
            </View>

            <Text
                style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }}
            />

            <View style={{ padding: 10 }}>
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        marginVertical: 5,
                    }}>
                    Giá tiền : {route.params.price}
                </Text>
                <Text style={{ color: "red" }}>Miễn phí vận chuyển</Text>

                <View
                    style={{
                        flexDirection: "row",
                        marginVertical: 5,
                        alignItems: "center",
                        gap: 5,
                    }}>
                    <Ionicons name="location" size={24} color="black" />

                    <Text style={{ fontSize: 15, fontWeight: "500" }}>
                        Vận Chuyển Tới
                    </Text>
                </View>
            </View>

            <Pressable
                onPress={() => addItemToCart(route?.params?.item)}
                style={{
                    backgroundColor: "rgba(208,1,27,.08)",
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginVertical: 10,
                    borderWidth: 1,
                    borderColor: "red",
                }}>
                {addedToCart ? (
                    <View>
                        <Text style={{ color: "red", fontWeight: "500" }}>
                            Thêm vào giỏ hàng
                        </Text>
                    </View>
                ) : (
                    <View>
                        <Text style={{ color: "red", fontWeight: "500" }}>
                            Thêm vào giỏ hàng
                        </Text>
                    </View>
                )}
            </Pressable>

            <Pressable
                style={{
                    backgroundColor: "#d0011b",
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginVertical: 10,
                }}>
                <Text style={{ color: "white", fontWeight: "500" }}>
                    Mua ngay
                </Text>
            </Pressable>
        </ScrollView>
    );
};

export default ProductInfoScreen;
