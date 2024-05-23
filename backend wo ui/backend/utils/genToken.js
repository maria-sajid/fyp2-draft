import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {  //jwt.sign takes payload and userId will be embedded in the jwt token
        expiresIn: '40 days'

    });

    res.cookie("jwt",token,{      
        maxAge: 40 * 24 * 60 * 60 * 1000, 
        httpOnly: true, // prevent attacks 
        samesite: "strict", // prevent attacks
        secure: process.env.NODE_ENV !== "development"
    });
};

export default generateTokenAndSetCookie;