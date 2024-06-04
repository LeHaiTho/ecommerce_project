import { View, Text, Pressable, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useSelector } from "react-redux";

const ProductItem = ({ item }) => {
    const [addedToCart, setAddedToCart] = useState(false);
    const dispatch = useDispatch();
    const addItemToCart = () => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
            setAddedToCart(false);
        }, 60000);
    };
    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);
    return (
        <TouchableOpacity
            style={{
                marginHorizontal: 20,
                marginVertical: 25,
            }}>
            <Image
                style={{
                    width: 150,
                    height: 150,
                    resizeMode: "contain",
                }}
                source={{ uri: item?.image }}
            />
            <Text
                numberOfLines={1}
                style={{
                    width: 150,
                    marginTop: 10,
                }}>
                {item?.title}
            </Text>
            <View
                style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 15,
                    }}>
                    {item?.price} $
                </Text>
                <Text>{item?.rating?.rate} ⭐</Text>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => addItemToCart(item)}
                    style={{
                        backgroundColor: "rgba(208,1,27,.08)",
                        borderWidth: 1,
                        borderColor: "red",

                        padding: 10,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                    }}>
                    {addedToCart ? (
                        <View>
                            <Text
                                style={{
                                    color: "red",
                                    fontWeight: "700",
                                }}>
                                Thêm vào giỏi hàng
                            </Text>
                        </View>
                    ) : (
                        <View>
                            <Text
                                style={{
                                    color: "red",
                                    fontWeight: "700",
                                }}>
                                Thêm vào giỏ hàng
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default ProductItem;
