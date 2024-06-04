// import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
// import React, { useEffect, useState, useContext } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { UserType } from "../UserContext";
// import jwt_decode from "jwt-decode";

// const AddressScreen = ({ navigation }) => {
//     const [name, setName] = useState("");
//     const [mobileNo, setMobileNo] = useState("");
//     const [houseNo, setHouseNo] = useState("");
//     const [street, setStreet] = useState("");
//     const [landmark, setLandmark] = useState("");
//     const [postalCode, setPostalCode] = useState("");
//     const { userId, setUserId } = useContext(UserType);
//     useEffect(() => {
//         const fetchUser = async () => {
//             const token = await AsyncStorage.getItem("authToken");
//             const decodedToken = jwt_decode(token);
//             const userId = decodedToken.userId;
//             console.log(decodedToken.userId);
//             setUserId(userId);
//         };

//         fetchUser();
//     }, []);
//     console.log("userId:", userId);
//     return (
//         <ScrollView
//             style={{
//                 marginTop: 50,
//             }}>
//             <View
//                 style={{
//                     height: 50,
//                     backgroundColor: "#00CED1",
//                 }}
//             />
//             <View
//                 style={{
//                     padding: 10,
//                 }}>
//                 <Text
//                     style={{
//                         fontSize: 17,
//                         fontWeight: "bold",
//                     }}>
//                     Add a new Address
//                 </Text>
//                 <TextInput
//                     placeholderTextColor={"black"}
//                     placeholder="India"
//                     style={{
//                         padding: 10,
//                         borderColor: "#D0D0D0",
//                         borderWidth: 1,
//                         marginTop: 10,
//                         borderRadius: 5,
//                     }}
//                 />

//                 <View style={{ marginVertical: 10 }}>
//                     <Text style={{ fontSize: 15, fontWeight: "bold" }}>
//                         Full name (First and last name)
//                     </Text>

//                     <TextInput
//                         value={name}
//                         onChangeText={(text) => setName(text)}
//                         placeholderTextColor={"black"}
//                         style={{
//                             padding: 10,
//                             borderColor: "#D0D0D0",
//                             borderWidth: 1,
//                             marginTop: 10,
//                             borderRadius: 5,
//                         }}
//                         placeholder="enter your name"
//                     />
//                 </View>

//                 <View>
//                     <Text style={{ fontSize: 15, fontWeight: "bold" }}>
//                         Mobile numebr
//                     </Text>

//                     <TextInput
//                         value={mobileNo}
//                         onChangeText={(text) => setMobileNo(text)}
//                         placeholderTextColor={"black"}
//                         style={{
//                             padding: 10,
//                             borderColor: "#D0D0D0",
//                             borderWidth: 1,
//                             marginTop: 10,
//                             borderRadius: 5,
//                         }}
//                         placeholder="Mobile No"
//                     />
//                 </View>

//                 <View style={{ marginVertical: 10 }}>
//                     <Text style={{ fontSize: 15, fontWeight: "bold" }}>
//                         Flat,House No,Building,Company
//                     </Text>

//                     <TextInput
//                         value={houseNo}
//                         onChangeText={(text) => setHouseNo(text)}
//                         placeholderTextColor={"black"}
//                         style={{
//                             padding: 10,
//                             borderColor: "#D0D0D0",
//                             borderWidth: 1,
//                             marginTop: 10,
//                             borderRadius: 5,
//                         }}
//                         placeholder=""
//                     />
//                 </View>

//                 <View>
//                     <Text style={{ fontSize: 15, fontWeight: "bold" }}>
//                         Area,Street,sector,village
//                     </Text>
//                     <TextInput
//                         value={street}
//                         onChangeText={(text) => setStreet(text)}
//                         placeholderTextColor={"black"}
//                         style={{
//                             padding: 10,
//                             borderColor: "#D0D0D0",
//                             borderWidth: 1,
//                             marginTop: 10,
//                             borderRadius: 5,
//                         }}
//                         placeholder=""
//                     />
//                 </View>

//                 <View style={{ marginVertical: 10 }}>
//                     <Text style={{ fontSize: 15, fontWeight: "bold" }}>
//                         Landmark
//                     </Text>
//                     <TextInput
//                         value={landmark}
//                         onChangeText={(text) => setLandmark(text)}
//                         placeholderTextColor={"black"}
//                         style={{
//                             padding: 10,
//                             borderColor: "#D0D0D0",
//                             borderWidth: 1,
//                             marginTop: 10,
//                             borderRadius: 5,
//                         }}
//                         placeholder="Eg near appollo hospital"
//                     />
//                 </View>

//                 <View>
//                     <Text style={{ fontSize: 15, fontWeight: "bold" }}>
//                         Pincode
//                     </Text>

//                     <TextInput
//                         value={postalCode}
//                         onChangeText={(text) => setPostalCode(text)}
//                         placeholderTextColor={"black"}
//                         style={{
//                             padding: 10,
//                             borderColor: "#D0D0D0",
//                             borderWidth: 1,
//                             marginTop: 10,
//                             borderRadius: 5,
//                         }}
//                         placeholder="Enter Pincode"
//                     />
//                 </View>

//                 <Pressable
//                     onPress={() => {}}
//                     style={{
//                         backgroundColor: "#ffc72c",
//                         padding: 19,
//                         borderRadius: 6,
//                         justifyContent: "center",
//                         alignItems: "center",
//                         marginTop: 20,
//                     }}>
//                     <Text
//                         style={{
//                             fontWeight: "bold",
//                         }}>
//                         Add Address
//                     </Text>
//                 </Pressable>
//             </View>
//         </ScrollView>
//     );
// };

// export default AddressScreen;
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const AddressScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const { userId, setUserId } = useContext(UserType);
    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        };

        fetchUser();
    }, []);
    console.log(userId);
    const handleAddAddress = () => {
        const address = {
            name,
            mobileNo,
            houseNo,
            street,
            landmark,
            postalCode,
        };

        axios
            .post("http://192.168.1.10:8000/addresses", { userId, address })
            .then((response) => {
                Alert.alert("Thành công", "Thêm mới thành công");
                setName("");
                setMobileNo("");
                setHouseNo("");
                setStreet("");
                setLandmark("");
                setPostalCode("");

                setTimeout(() => {
                    navigation.goBack();
                }, 500);
            })
            .catch((error) => {
                Alert.alert("Error", "Failed to add address");
                console.log("error", error);
            });
    };
    return (
        <ScrollView style={{ marginTop: 50 }}>
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
                <AntDesign name="shoppingcart" size={24} color="black" />
            </LinearGradient>

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                    Thêm mới
                </Text>

                <TextInput
                    placeholderTextColor={"black"}
                    placeholder="Việt Nam"
                    style={{
                        padding: 10,
                        borderColor: "#D0D0D0",
                        borderWidth: 1,
                        marginTop: 10,
                        borderRadius: 5,
                    }}
                />

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Họ và tên
                    </Text>

                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholderTextColor={"black"}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5,
                        }}
                        placeholder="Điền đầy đủ họ tên"
                    />
                </View>

                <View>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Số điện thoại liên lạc
                    </Text>

                    <TextInput
                        value={mobileNo}
                        onChangeText={(text) => setMobileNo(text)}
                        placeholderTextColor={"black"}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5,
                        }}
                        placeholder="Điền số điện thoại"
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Căn hộ ,Số nhà ,Tòa nhà ,Công ty
                    </Text>

                    <TextInput
                        value={houseNo}
                        onChangeText={(text) => setHouseNo(text)}
                        placeholderTextColor={"black"}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5,
                        }}
                        placeholder="134, Khu phố 8, ..."
                    />
                </View>

                <View>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Khu vực, Đường phố, khu vực, thôn
                    </Text>
                    <TextInput
                        value={street}
                        onChangeText={(text) => setStreet(text)}
                        placeholderTextColor={"black"}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5,
                        }}
                        placeholder="DX-101, tổ ..."
                    />
                </View>

                {/* <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Landmark
                    </Text>
                    <TextInput
                        value={landmark}
                        onChangeText={(text) => setLandmark(text)}
                        placeholderTextColor={"black"}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5,
                        }}
                        placeholder="Eg near appollo hospital"
                    />
                </View>

                <View>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Pincode
                    </Text>

                    <TextInput
                        value={postalCode}
                        onChangeText={(text) => setPostalCode(text)}
                        placeholderTextColor={"black"}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5,
                        }}
                        placeholder="Enter Pincode"
                    />
                </View> */}

                <Pressable
                    onPress={handleAddAddress}
                    style={{
                        backgroundColor: "#ff6a00",
                        paddingVertical: 10,
                        borderRadius: 6,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20,
                    }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            color: "#fff",
                            fontSize: 18,
                        }}>
                        Thêm mới
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default AddressScreen;

const styles = StyleSheet.create({});
