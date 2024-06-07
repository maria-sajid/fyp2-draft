// import bcrypt from "bcrypt";
// import User from "../models/user.model.js";
// import generateTokenAndSetCookie from "../utils/genToken.js";

// export const signup = async (req, res) => {
//   try {
//     const { username, email, password, confirmPassword } = req.body; //input from users

//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: "passwords do not match" });
//     }
//     const user = await User.findOne({ username }); //user already exists or not

//     if (user) {
//       return res.status(400).json({ error: "username already exists" });
//     }

//     //Hash Password
//     const salt = await bcrypt.genSalt(10); // the higher the value the slower the output (10) is by default
//     const hashedPassword = await bcrypt.hash(password, salt); //hash password with salt

//     //profile
//     const profile = `https://avatar.iran.liara.run/username?username=${username}`;
//     //const boyProfile = `https://avatar.iran.liara.run/public/boy?username${username}`
//     //const girlProfile = `https://avatar.iran.liara.run/public/girl?username${username}`

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       profile,
//     });

//     if (newUser) {
//       //generate JWT token
//       generateTokenAndSetCookie(newUser._id, res);

//       await newUser.save();

//       res.status(201).json({
//         _id: newUser._id,
//         //fullName: newUser.fullName,
//         username: newUser.username,
//         email: newUser.email,
//         password: newUser.password,
//         profile: newUser.profile,
//       });
//     } else {
//       res.status(400).json({ error: "Invalid user data" });
//     }
//   } catch (error) {
//     console.log("Error in signup controller", error.message);
//     response.status(500).json({ eroor: "Internal server error" });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     console.log("userfound ");
//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       user?.password || ""
//     ); // comparing the passwords

//     // if(!user || !isPasswordCorrect) {
//     //     return res.status(400).json({error:"Invalid user credentials"});
//     // }

//     if (!user) {
//       console.log("User not found");
//       return res.status(400).json({ error: "Invalid user" });
//     }
//     if (!isPasswordCorrect) {
//       console.log("Password incorrect");
//       return res.status(400).json({ error: "Invalid user password" });
//     }

//     generateTokenAndSetCookie(user._id, res);
//     res.status(200).json({
//       _id: User._id,
//       //fullName: newUser.fullName,
//       username: user.username,
//       email: user.email,
//       password: user.password,
//       profile: user.profile,
//     });
//   } catch (error) {
//     console.log("Error in login controller", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const logout = (req, res) => {
//   try {
//     res.cookie("jwt", "", { maxAge: 0 });
//     res.status(200).json({ message: "User logged out successfully" });
//   } catch (error) {
//     console.log("Error in login controller", error.message);
//     res.status(500).json({ eroor: "Internal server error" });
//   }
// };

import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/genToken.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body; // Input from users

    console.log("Signup data:", { username, email, password, confirmPassword });

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ username }); // Check if user already exists

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10); // The higher the value the slower the output (10) is by default
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password with salt

    // Profile
    const profile = `https://avatar.iran.liara.run/username?username=${username}`;

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profile,
    });

    console.log("New User:", newUser);

    if (newUser) {
      // Generate JWT token
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        profile: newUser.profile,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login data:", { email, password });

    const user = await User.findOne({ email });
    console.log("User found:", user);

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    ); // Comparing the passwords

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "Invalid user" });
    }
    if (!isPasswordCorrect) {
      console.log("Password incorrect");
      return res.status(400).json({ error: "Invalid user password" });
    }

    generateTokenAndSetCookie(user._id, res);

    const responseData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      profile: user.profile,
    };

    console.log("Response data:", responseData);

    res.status(200).json(responseData);
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
