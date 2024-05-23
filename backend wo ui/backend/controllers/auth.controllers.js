import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/genToken.js";

export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;  //input from users

        if(password !== confirmPassword) {
            return res.status(400).json({error:"passwords do not match"});
        }
        const user = await User.findOne({username});  //user already exists or not 

        if(user){
            return res.status(400).json({error:"username already exists"});
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10); // the higher the value the slower the output (10) is by default
        const hashedPassword = await bcrypt.hash(password, salt); //hash password with salt

        //profile
        const profile = `https://avatar.iran.liara.run/username?username=${username}`
        //const boyProfile = `https://avatar.iran.liara.run/public/boy?username${username}`
        //const girlProfile = `https://avatar.iran.liara.run/public/girl?username${username}`

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profile
        })

        if(newUser){  
            //generate JWT token
            generateTokenAndSetCookie(newUser._id, res); 

            await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            //fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            profile: newUser.profile
        });
        } else{
            res.status(400).json({error:"Invalid user data"});
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        response.status(500).json({eroor:"Internal server error"});
    }
};



export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); // comparing the passwords

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error:"Invalid user credentials"});
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: User._id,
            //fullName: newUser.fullName,
            username: user.username,
            email: user.email,
            password: user.password,
            profile: user.profile
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({eroor:"Internal server error"});
    }

};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message:"User logged out successfully"});
        
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({eroor:"Internal server error"}); 
    }
};

