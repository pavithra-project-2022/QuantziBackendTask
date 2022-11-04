import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const register = async (req, res, next) => {
  
  try {
   
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      userId:`EMPID${Math.floor(1000 + Math.random() * 90000000)}`,
      ...req.body,
      password: hash,
    });
   
   await newUser.save();


    res.status(200).send({ message: "User Registered Successfully",
    newUser});
  
  } catch (err) {
    next(err);
  }
};



export const login = async (req, res, next) => {
  try {
  
   const user = await User.findOne({ email: req.body.email})
    
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!isPasswordCorrect)
          return next(createError(400, "Wrong password or username!"));
    
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          "8hEnPGeoBqGUT6zksxt4G95gW+uMdzwe7EVaRnp0xRI="
        );
        const { password, ...otherDetails } = user._doc;
      res
      .cookie("access_token", token, {
        httpOnly: true, 
      })
      .status(200)
      .json({message:"Logged in Successfully", details: { ...otherDetails } });
    
  } catch (err) {
    next(err);
  }
};