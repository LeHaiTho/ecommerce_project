const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const app = express();
const port = 8000;
const cors = require("cors");
const { error } = require("console");
const User = require("./models/user");
const Order = require("./models/order");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
    .connect(
        "mongodb+srv://letho11112002:letho11112002@cluster0.h9qwvgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connect mongoDb successfully!!!"))
    .catch((error) => console.log("Error connecting to mongoDb", error));

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

// function sendVerificationEmail to the user
const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "letho11112002@gmail.com",
            pass: "kbpo tvdm oole sdya",
        },
    });

    // compose the email massage
    const mailOptions = {
        from: "amazon.com",
        to: email,
        subject: "Email verification",
        text: `Please click the following link to verify your email: http://192.168.1.10:8000/verify/${verificationToken}`,
    };

    // send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending email", error);
    }
};

// endpoint to register in the app
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already registered:", email); // Debugging statement
            return res
                .status(400)
                .json({ message: "Email already registered!" });
        }

        // create a new user
        const newUser = new User({ name, email, password });

        // generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        // save the user in the database
        await newUser.save();

        // Debugging statement to verify data
        console.log("New User Registered:", newUser);

        // send verification email to the user
        sendVerificationEmail(newUser.email, newUser.verificationToken);
        res.status(201).json({
            message:
                "Registration successful. Please check your email for verification.",
        });
    } catch (error) {
        console.log("error registering", error);
        res.status(500).json({ message: "Register failed!" });
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
};

const secretKey = generateSecretKey();

// endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;

        // find the user with the given verification token
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res
                .status(404)
                .json({ message: "Invalid verification token" });
        }

        // Mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Email verified failed" });
    }
});

// endpoint to loggin user
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // check account in database
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }

        // check if password is incorrect
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // generate token
        const token = jwt.sign({ userId: user._id }, secretKey);
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
});

// endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
    try {
        const { userId, address } = req.body;

        //find the user by the Userid
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //add the new address to the user's addresses array
        user.addresses.push(address);

        //save the updated user in te backend
        await user.save();

        res.status(200).json({ message: "Address created Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error addding address" });
    }
});

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const addresses = user.addresses;
        res.status(200).json({ addresses });
    } catch (error) {
        res.status(500).json({ message: "Error retrieveing the addresses" });
    }
});

app.post("/orders", async (req, res) => {
    try {
        const {
            userId,
            cartItems,
            totalPrice,
            shippingAddress,
            paymentMethod,
        } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //create an array of product objects from the cart Items
        const products = cartItems.map((item) => ({
            name: item?.title,
            quantity: item.quantity,
            price: item.price,
            image: item?.image,
        }));

        //create a new Order
        const order = new Order({
            user: userId,
            products: products,
            totalPrice: totalPrice,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
        });

        await order.save();

        res.status(200).json({ message: "Order created successfully!" });
    } catch (error) {
        console.log("error creating orders", error);
        res.status(500).json({ message: "Error creating orders" });
    }
});

//get the user profile
app.get("/profile/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the user profile" });
    }
});

app.get("/orders/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const orders = await Order.find({ user: userId }).populate("user");

        if (!orders || orders.length === 0) {
            return res
                .status(404)
                .json({ message: "No orders found for this user" });
        }

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
});
