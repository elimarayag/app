const User = require("./model");
const { hashdata,verifyHashedData } = require("./../../utilities/hashData");

const authenticateUser = async (data) => {
    try {
        const { email, password } = data;

        const fetchedUser = await User.findOne({email});

        if (!fetchedUser) {
            throw Error("Invalid credentials entered!");
        }

        if (!fetchedUser.verified) {
            throw Error("Email hasn't been verified yet. Check your inbox.");
        }

        const hashedPassword = fetchedUser.password;
        const passwordMatch = await verifyHashedData(password, hashedPassword);

        if (!passwordMatch) {
            throw Error("Invalid password entered!");
        }
    }

    catch (error) {
        throw error;
    }
}

const createNewUser = async (data) => {
    try {
        const { name, email, password } = data;

        //checking if user already exists
        const existingUser = await user.findOne({email});

        if (existingUser) {
            throw Error("User with provided email already exists");
        }

        //hash password
        const hashedPassword = await hashData(password);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        //save user
        const createdUser = await newUser.save();
        return createdUser;
    }

    catch (error) {
        throw error;
    }
}

module.exports = { createNewUser, authenticateUser };