import asynchandeler from "../utils/asynchandeler.js";
import User from "../models/user.js";

export const genereterefreshandaccesstoken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("Cannot find the user");
        }
        const accesstoken = user.genereteaccestoken();
        const refreshtoken = user.genereterefreshtoken();
        user.refreshtoken = refreshtoken;
        await user.save({ validateBeforeSave: false });
        return { accesstoken, refreshtoken };
    } catch (error) {
        throw new Error(`Token generation failed: ${error.message}`);
    }
};

export const register = asynchandeler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
        return res.status(400).json({
            msg: "pls fillup the fields"
        });
    }

    const existinguser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existinguser) {
        return res.status(400).json({
            msg: "user already exists"
        });
    }

    const user = await User.create({
        email,
        password,
        username
    });

    return res.status(200).json({
        user,
        msg: "user is registered successfully"
    });
});

export const login = asynchandeler(async (req, res) => {
    const { username, password, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            msg: "user not found pls signup"
        });
    }

    const passwordiscorrect = await user.comparepassword(password);
    if (!passwordiscorrect) {
        return res.status(400).json({
            msg: "password is incorrect"
        });
    }

    const { accesstoken, refreshtoken } = await genereterefreshandaccesstoken(user._id);
    const loggedin = await User.findById(user._id).select(
        "-password -refreshtoken"
    );

    return res.status(200).json({
        msg: "hey you are logged in",
        accesstoken,
        refreshtoken,
        loggedin
    });
});
