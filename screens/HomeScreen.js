import {
    View,
    Text,
    SafeAreaView,
    Platform,
    ScrollView,
    Pressable,
    TextInput,
    Image,
    TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useSelector } from "react-redux";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import { Entypo } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { LinearGradient } from "expo-linear-gradient";

// import { SliderBox } from "react-native-image-slider-box";

const HomeScreen = ({ navigation }) => {
    const list = [
        {
            id: "0",
            image: "https://down-vn.img.susercontent.com/file/sg-11134201-7qve3-lkic9kpasdmm16",
            name: "Nhà cửa và đời sống",
        },
        {
            id: "1",
            image: "https://th.bing.com/th/id/OIP.0TLHjiccEtIHWBUOBR7_8QAAAA?w=360&h=360&rs=1&pid=ImgDetMain",
            name: "Khuyến mãi",
        },
        {
            id: "2",
            image: "https://maytinhtientan.com/wp-content/uploads/2023/05/may-tinh-de-ban-ttc-01.jpg",
            name: "Thiết bị điện tử",
        },
        {
            id: "3",
            image: "https://d1eh9yux7w8iql.cloudfront.net/product_images/455935_c51367f9-d095-48fa-8bca-76fa99f3706f.jpg",
            name: "Điện thoại và phụ kiện",
        },
        {
            id: "4",
            image: "https://www.englandpiano.com/wp-content/uploads/2020/03/Yamaha-G1-Polished-ebony.jpg",
            name: "Âm nhạc",
        },
        {
            id: "5",
            image: "https://th.bing.com/th/id/OIP.IZ6ozt7qcTf7YiWJ4GqIigHaFJ?rs=1&pid=ImgDetMain",
            name: "Thời trang",
        },
    ];

    // image banner
    const images = [
        "https://down-vn.img.susercontent.com/file/vn-50009109-1a7d68dabe62d37a82cc8a819c0c62b9@resize_w960_nl.webp",
    ];

    // deals
    const deals = [
        {
            id: "20",
            title: "Áo thun form rộng Paradox tay lỡ - Unisex - In hình - THE REVERIE",
            oldPrice: 250000,
            price: 190000,
            image: "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lr91rhtsxq84e5",
            carouselImages: [
                "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lr91rhwkto5t05",
                "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lvcumf2k57xgf6",
            ],
            color: "Đen",
            size: "M",
        },
        {
            id: "30",
            title: "ToToo Capybara Búp Bê Nhồi Bông capibala Kiểu Dáng Dễ Thương Xinh Xắn",
            oldPrice: 74000,
            price: 26000,
            image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rblc-lpajddl2wmkm59",
            carouselImages: [
                "https://down-vn.img.susercontent.com/file/sg-11134201-7rbkz-lpajdbzx5gqm09",
                "https://down-vn.img.susercontent.com/file/sg-11134201-7rblc-lpajddl2wmkm59",
            ],
            color: "Nâu",
            size: "Lớn",
        },
        {
            id: "40",
            title: "Guangluo Phiên bản Hàn Quốc của túi đi học mẫu giáo bé trai hoạt hình khủng long dễ thương học sinh bé trung lưu nhỏ 2-3-5 tuổi bé gái",
            oldPrice: 16000,
            price: 14000,
            image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rcea-lt0l8qd40r9883",
            carouselImages: [
                "https://down-vn.img.susercontent.com/file/sg-11134201-7rcea-lt0l8qd40r9883",
                "https://down-vn.img.susercontent.com/file/sg-11134201-7rceb-lt0l8r4kwjwu7f",
                "https://down-vn.img.susercontent.com/file/sg-11134201-7rcey-lt0l8sdt2dame2",
            ],
            color: "Xanh dương",
            size: "Vừa",
        },
        {
            id: "40",
            title: "Đồng Hồ Trẻ Em Điện Tử Thể Thao COOBOS 0119 0919 1015 0916 Có Nhiều Chức Năng",
            oldPrice: 12999,
            price: 10999,
            image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm93g9i8nppbf5",
            carouselImages: [
                "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm93g9i94kprb2",
                "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm93g9i9365b2f",
            ],
        },
    ];

    const offers = [
        {
            id: "0",
            title: "Balo Nữ Đeo Vai Thời Trang Đi Học phong cách hàn quốc chống nước ! BL043 bb",
            offer: "72%",
            oldPrice: 7500,
            price: 4500,
            image: "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvmuyj49v12q8c",
            carouselImages: [
                "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvmuyj5dtf348e",
                "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvmuyiscchza7c",
                "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lvmuyj35wo8r22",
            ],
            color: "Nâu",
            size: "Vừa",
        },
        {
            id: "1",
            title: "Bàn Phím Bluetooth Kết Nối Mạnh Mẽ Bàn Phím Không Dây bàn phím chuột không dây bộ bàn phím",
            offer: "40%",
            oldPrice: 7955,
            price: 3495,
            image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lvt9moxp8mvt5c",
            carouselImages: [
                "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lvt9moxp1m1l80",
                "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lvt9moxp78bd59",
            ],
            color: "Đen",
            size: "Vừa",
        },
        {
            id: "2",
            title: "Tai nghe không dây âm thanh nổi M10 Tws Tai nghe nhét tai cho điện thoại thông minh Android",
            offer: "40%",
            oldPrice: 7955,
            price: 3495,
            image: "https://down-vn.img.susercontent.com/file/26039bb1f624bcb135faa3f551b4b335",
            carouselImages: [
                "https://down-vn.img.susercontent.com/file/9d199e45832e31678888c8dd3e57fa48",
            ],
            color: "Đen",
            size: "",
        },
        {
            id: "3",
            title: "điện thoại giá rẻ Oppo-A3s ( OppoA3s ) 2sim ram 6G/128G Chính Hãng, Cày Game nặng siêu mượt - MMO 01",
            offer: "40%",
            oldPrice: 24999,
            price: 19999,
            image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
                "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
            ],
            color: "Xanh dương",
            size: "Dung lượng pin 5000mAh",
        },
    ];

    const [products, setProducts] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [category, setCategory] = useState("jewelery");
    const { userId, setUserId } = useContext(UserType);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: "Thời trang nam", value: "men's clothing" },
        { label: "Đồ trang sức", value: "jewelery" },
        { label: "Thiết bị điện tử", value: "electronics" },
        { label: "Thời trang nữ", value: "women's clothing" },
    ]);
    const [selectedAddress, setSelectedAdress] = useState("");
    console.log("selectedAddress", selectedAddress);
    const [conpanyOpen, setCompanyOpen] = useState(true);

    console.log("userId at HomeScreen:", userId);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://fakestoreapi.com/products"
                );
                setProducts(response.data);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []);
    // console.log("products:", products);
    const onGenderOpen = useCallback(() => {
        setCompanyOpen(false);
    }, []);

    const cart = useSelector((state) => state.cart.cart);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (userId) {
            fetchAddresses();
        }
    }, [userId, modalVisible]);
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
    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        };

        fetchUser();
    }, []);
    return (
        <>
            <SafeAreaView
                style={{
                    paddingTop: Platform.OS === "android" ? 40 : 0,
                    flex: 1,
                    backgroundColor: "#fff",
                }}>
                <ScrollView>
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
                        <AntDesign
                            name="shoppingcart"
                            size={24}
                            color="black"
                        />
                    </LinearGradient>

                    <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                        style={{
                            backgroundColor: "#ffbe3d",
                            padding: 10,
                            gap: 5,
                            alignItems: "center",
                            flexDirection: "row",
                        }}>
                        <Ionicons
                            name="location-outline"
                            size={24}
                            color="black"
                        />
                        <Pressable>
                            {selectedAddress ? (
                                <Text>
                                    Deliver to {selectedAddress?.name} -{" "}
                                    {selectedAddress?.street}
                                </Text>
                            ) : (
                                <Text
                                    style={{ fontSize: 13, fontWeight: "500" }}>
                                    Vị trí của bạn
                                </Text>
                            )}
                        </Pressable>
                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={24}
                            color="black"
                        />
                    </Pressable>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {list.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => console.log(item.id, index)}
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: 10,
                                }}>
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: "contain",
                                    }}
                                    source={{ uri: item.image }}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: "500",
                                        marginTop: 5,
                                        textAlign: "center",
                                    }}>
                                    {item?.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* <SliderBox images={images} /> */}
                    <View
                        style={{
                            backgroundColor: "blue",
                            width: "100%",
                            height: 200,
                        }}>
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            source={{
                                uri: "https://down-vn.img.susercontent.com/file/vn-50009109-1a7d68dabe62d37a82cc8a819c0c62b9@resize_w960_nl.webp",
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "red",
                        }}>
                        ĐỒ BẠN THÍCH Ở ĐÂY
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}>
                        {deals.map((item, index) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Info", {
                                        id: item?.id,
                                        title: item?.title,
                                        price: item?.price,
                                        carouselImages: item.carouselImages,
                                        color: item?.color,
                                        size: item?.size,
                                        oldPrice: item?.oldPrice,
                                        item: item,
                                    })
                                }
                                style={{
                                    marginVertical: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                                key={index}>
                                <Image
                                    style={{
                                        width: 200,
                                        height: 200,
                                        resizeMode: "contain",
                                    }}
                                    source={{ uri: item?.image }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View
                        style={{
                            height: 1,
                            borderColor: "#d0d0d0",
                            marginTop: 15,
                            borderWidth: 2,
                        }}></View>

                    <Text
                        style={{
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "red",
                        }}>
                        TÌM KIẾM HÀNG ĐẦU
                    </Text>

                    <ScrollView
                        style={{ paddingHorizontal: 8 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {offers.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() =>
                                    navigation.navigate("Info", {
                                        id: item?.id,
                                        title: item?.title,
                                        price: item?.price,
                                        carouselImages: item.carouselImages,
                                        color: item?.color,
                                        size: item?.size,
                                        oldPrice: item?.oldPrice,
                                        item: item,
                                    })
                                }
                                style={{
                                    marginVertical: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                <Image
                                    style={{
                                        width: 150,
                                        height: 150,
                                        resizeMode: "contain",
                                    }}
                                    source={{ uri: item?.image }}
                                />

                                <View
                                    style={{
                                        backgroundColor: "#ff6a00",
                                        paddingVertical: 5,
                                        width: 130,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 10,
                                        borderRadius: 5,
                                    }}>
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontWeight: "900",
                                            textAlign: "center",
                                        }}>
                                        Giảm {item?.offer}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View
                        style={{
                            height: 1,
                            borderColor: "#d0d0d0",
                            marginTop: 15,
                            borderWidth: 2,
                        }}></View>

                    {/* <View
                        style={{
                            marginHorizontal: 10,
                            width: "45%",
                            marginBottom: open ? 50 : 15,
                            marginTop: 16,
                        }}>
                        <DropDownPicker
                            style={{
                                borderColor: "#B7B7B7",
                                height: 30,
                                marginBottom: open ? 120 : 15,
                            }}
                            open={open}
                            value={category}
                            items={items}
                            setOpen={setOpen}
                            setValue={setCategory}
                            setItems={setItems}
                            placeholder="choose category"
                            onOpen={onGenderOpen}
                            zIndex={3000}
                            zIndexInverse={1000}
                        />
                    </View> */}
                    {/* List products */}
                    {/* <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}>
                        {products
                            ?.filter(
                                (item, index) => item.category === category
                            )
                            .map((item, index) => (
                                <ProductItem item={item} key={index} />
                            ))}
                    </View> */}

                    <View
                        style={{
                            marginHorizontal: 10,
                            width: "45%",
                            marginBottom: open ? 50 : 15,
                            marginTop: 16,
                        }}>
                        <DropDownPicker
                            style={{
                                borderColor: "#B7B7B7",
                                height: 30,
                                marginBottom: open ? 120 : 15,
                            }}
                            open={open}
                            value={category}
                            items={items}
                            setOpen={setOpen}
                            setValue={setCategory}
                            setItems={setItems}
                            placeholder="Lựa chọn"
                            onOpen={onGenderOpen}
                            zIndex={3000}
                            zIndexInverse={1000}
                        />
                    </View>

                    {/* Fix: Wrap the product list in a separate View */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}>
                        {products
                            ?.filter(
                                (item, index) => item.category === category
                            )
                            .map((item, index) => (
                                <ProductItem item={item} key={index} />
                            ))}
                    </View>
                </ScrollView>
            </SafeAreaView>

            <BottomModal
                onBackdropPress={() => setModalVisible(!modalVisible)}
                swipeDirection={["up", "down"]}
                swipeThreshold={200}
                modalAnimation={
                    new SlideAnimation({
                        slideFrom: "bottom",
                    })
                }
                onHardwareBackPress={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(!modalVisible)}>
                <ModalContent
                    style={{
                        width: "100%",
                        height: 400,
                    }}>
                    <View
                        style={{
                            marginBottom: 8,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "500",
                            }}>
                            Vị trí của bạn
                        </Text>

                        <Text
                            style={{
                                marginTop: 5,
                                fontSize: 16,
                                color: "gray",
                            }}>
                            Chọn địa điểm giao hàng để xem tình trạng còn hàng
                            của sản phẩm và các tùy chọn giao hàng
                        </Text>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {addresses?.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() => setSelectedAdress(item)}
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderColor: "#D0D0D0",
                                    borderWidth: 1,
                                    padding: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 3,
                                    marginRight: 15,
                                    marginTop: 10,
                                    backgroundColor:
                                        selectedAddress === item
                                            ? "#FBCEB1"
                                            : "white",
                                }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 3,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 13,
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
                                    numberOfLines={1}
                                    style={{
                                        width: 130,
                                        fontSize: 13,
                                        textAlign: "center",
                                    }}>
                                    {item?.houseNo},{item?.landmark}
                                </Text>

                                <Text
                                    numberOfLines={1}
                                    style={{
                                        width: 130,
                                        fontSize: 13,
                                        textAlign: "center",
                                    }}>
                                    {item?.street}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        width: 130,
                                        fontSize: 13,
                                        textAlign: "center",
                                    }}>
                                    Việt Nam
                                </Text>
                            </Pressable>
                        ))}
                        <Pressable
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate("Address");
                            }}
                            style={{
                                width: 140,
                                height: 140,
                                borderColor: "#D0D0D0",
                                marginTop: 10,
                                borderWidth: 1,
                                padding: 10,
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <Text
                                style={{
                                    color: "#0066b2",
                                    fontWeight: 650,
                                    textAlign: "center",
                                }}>
                                Thêm vị trí mới
                            </Text>
                        </Pressable>
                    </ScrollView>
                </ModalContent>
            </BottomModal>
        </>
    );
};

export default HomeScreen;
