import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { UserType } from "../UserContext";
import axios from "axios";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../redux/CartReducer";

const ConfirmationScreen = ({ navigation }) => {
    const steps = [
        { title: "Address", content: "Address Form" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" },
    ];
    const [currentStep, setCurrentStep] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const { userId, setUserId } = useContext(UserType);

    const cart = useSelector((state) => state.cart.cart);
    const total = cart
        ?.map((item) => item.price * item.quantity)
        .reduce((curr, prev) => curr + prev, 0);

    useEffect(() => {
        fetchAddresses();
    }, []);
    const fetchAddresses = async () => {
        try {
            const response = await axios.get(
                `http://192.168.1.10:8000/addresses/${userId}`
            );
            const { addresses } = response.data;

            setAddresses(addresses);
        } catch (error) {
            console.log("error", error);
        }
    };

    const dispatch = useDispatch();
    const [selectedAddress, setSelectedAdress] = useState("");
    const [option, setOption] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                userId: userId,
                cartItems: cart,
                totalPrice: total,
                shippingAddress: selectedAddress,
                paymentMethod: selectedOption,
            };

            const response = await axios.post(
                "http://192.168.1.10:8000/orders",
                orderData
            );
            if (response.status === 200) {
                navigation.navigate("Order");
                dispatch(cleanCart());
                console.log("order created successfully", response.data);
            } else {
                console.log("error creating order", response.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    console.log("addresses confirmScreen: ", addresses);
    return (
        <ScrollView
            style={{
                marginTop: 55,
            }}>
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}>
                <View
                    style={{
                        flexDirection: "row",
                        marginBottom: 20,
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    {steps?.map((step, index) => (
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            {index > 0 && (
                                <View
                                    style={[
                                        {
                                            flex: 1,
                                            height: 2,
                                            backgroundColor: "green",
                                        },
                                        index <= currentStep && {
                                            backgroundColor: "green",
                                        },
                                    ]}
                                />
                            )}
                            <View
                                style={[
                                    {
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        backgroundColor: "#ccc",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    },
                                    index < currentStep && {
                                        backgroundColor: "green",
                                    },
                                ]}>
                                {index < currentStep ? (
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            color: "white",
                                        }}>
                                        &#10003;
                                    </Text>
                                ) : (
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            color: "white",
                                        }}>
                                        {index + 1}
                                    </Text>
                                )}
                            </View>
                            <Text
                                style={{
                                    textAlign: "center",
                                    marginTop: 8,
                                }}>
                                {step.title}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
            {currentStep == 0 && (
                <View
                    style={{
                        marginHorizontal: 20,
                    }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        Địa chỉ nhận hàng
                    </Text>

                    <Pressable>
                        {addresses?.map((item, index) => (
                            <Pressable
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#D0D0D0D0",
                                    flexDirection: "row",
                                    gap: 5,
                                    paddingBottom: 17,
                                    marginVertical: 7,
                                    alignItems: "center",
                                    borderRadius: 6,
                                    padding: 10,
                                }}
                                key={index}>
                                {selectedAddress &&
                                selectedAddress._id === item?._id ? (
                                    <FontAwesome5
                                        name="dot-circle"
                                        size={24}
                                        color="#ff6a00"
                                    />
                                ) : (
                                    <Entypo
                                        onPress={() => setSelectedAdress(item)}
                                        name="circle"
                                        size={24}
                                        color="black"
                                    />
                                )}

                                <View style={{ marginLeft: 6 }}>
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

                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: "#181818",
                                        }}>
                                        {item?.houseNo}, {item?.landmark}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: "#181818",
                                        }}>
                                        Đường : {item?.street}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: "#181818",
                                        }}>
                                        Số điện thoại : {item?.mobileNo}
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

                                    {selectedAddress &&
                                        selectedAddress._id === item?._id && (
                                            <Pressable
                                                onPress={() =>
                                                    setCurrentStep(1)
                                                }
                                                style={{
                                                    backgroundColor: "#ff6a00",
                                                    padding: 10,
                                                    borderRadius: 20,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginTop: 10,
                                                }}>
                                                <Text
                                                    style={{
                                                        alignItems: "center",
                                                        color: "#fff",
                                                    }}>
                                                    Giao hàng tại địa chỉ này
                                                </Text>
                                            </Pressable>
                                        )}
                                </View>
                            </Pressable>
                        ))}
                    </Pressable>
                </View>
            )}

            {currentStep == 1 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Lựa chọn vận chuyển
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "white",
                            padding: 8,
                            gap: 7,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                        }}>
                        {option ? (
                            <FontAwesome5
                                name="dot-circle"
                                size={20}
                                color="#ff6a00"
                            />
                        ) : (
                            <Entypo
                                onPress={() => setOption(!option)}
                                name="circle"
                                size={20}
                                color="gray"
                            />
                        )}

                        <Text style={{ flex: 1 }}>
                            <Text
                                style={{ color: "#ff6a00", fontWeight: "500" }}>
                                Vận chuyển miễn phí
                            </Text>{" "}
                            - tối thiểu ₫0
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => setCurrentStep(2)}
                        style={{
                            backgroundColor: "#ff6a00",
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 15,
                        }}>
                        <Text
                            style={{
                                color: "#fff",
                                fontWeight: "700",
                                fontSize: 18,
                            }}>
                            Tiếp tục
                        </Text>
                    </Pressable>
                </View>
            )}

            {currentStep == 2 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Phương thức thanh toán
                    </Text>

                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 7,
                            marginTop: 12,
                        }}>
                        {selectedOption === "cash" ? (
                            <FontAwesome5
                                name="dot-circle"
                                size={20}
                                color="#ff6a00"
                            />
                        ) : (
                            <Entypo
                                onPress={() => setSelectedOption("cash")}
                                name="circle"
                                size={20}
                                color="gray"
                            />
                        )}

                        <Text>Thanh toán khi nhận hàng</Text>
                    </View>

                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 7,
                            marginTop: 12,
                        }}>
                        {selectedOption === "card" ? (
                            <FontAwesome5
                                name="dot-circle"
                                size={20}
                                color="#ff6a00"
                            />
                        ) : (
                            <Entypo
                                onPress={() => {
                                    setSelectedOption("card");
                                    Alert.alert(
                                        "UPI/Debit card",
                                        "Pay Online",
                                        [
                                            {
                                                text: "Cancel",
                                                onPress: () =>
                                                    console.log(
                                                        "Cancel is pressed"
                                                    ),
                                            },
                                            {
                                                text: "OK",
                                                onPress: () => pay(),
                                            },
                                        ]
                                    );
                                }}
                                name="circle"
                                size={20}
                                color="gray"
                            />
                        )}

                        <Text>Thẻ tín dụng / ghi nợ</Text>
                    </View>
                    <Pressable
                        onPress={() => setCurrentStep(3)}
                        style={{
                            backgroundColor: "#ff6a00",
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 15,
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "600",
                                color: "#fff",
                            }}>
                            Tiếp tục
                        </Text>
                    </Pressable>
                </View>
            )}

            {currentStep === 3 && selectedOption === "cash" && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Đặt hàng ngay
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 8,
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                        }}>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                                Giảm 5%
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: "gray",
                                    marginTop: 5,
                                }}>
                                Turn on auto deliveries
                            </Text>
                        </View>

                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={24}
                            color="black"
                        />
                    </View>

                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                        }}>
                        <Text>Giao hàng tới {selectedAddress?.name}</Text>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 8,
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "500",
                                    color: "gray",
                                }}>
                                Đơn hàng
                            </Text>

                            <Text style={{ color: "gray", fontSize: 16 }}>
                                {total}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 8,
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "500",
                                    color: "gray",
                                }}>
                                Phí vận chuyển
                            </Text>

                            <Text style={{ color: "gray", fontSize: 16 }}>
                                0 đ
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 8,
                            }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                                Tổng thanh toán
                            </Text>

                            <Text
                                style={{
                                    color: "#C60C30",
                                    fontSize: 17,
                                    fontWeight: "bold",
                                }}>
                                {total}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                        }}>
                        <Text style={{ fontSize: 16, color: "gray" }}>
                            Phương thức thanh toán
                        </Text>

                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                marginTop: 7,
                            }}>
                            Thanh toán khi nhận hàng (Tiền mặt)
                        </Text>
                    </View>

                    <Pressable
                        onPress={handlePlaceOrder}
                        style={{
                            backgroundColor: "#ff6a00",
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 20,
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "600",
                                color: "#fff",
                            }}>
                            Đặt hàng
                        </Text>
                    </Pressable>
                </View>
            )}
        </ScrollView>
    );
};

export default ConfirmationScreen;
