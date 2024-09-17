import express from "express";
import UserData from "../models/user.js";
import { hashPassword, comparePassword} from "../utils/hash.js";
import { sign, verify } from "../utils/token.js";

const router = express.Router();

// API - 1 Register
router.post("/register", async (req, res, next) => {
    try {
        const { userName, email, password, confirmPassword} = req.body;    
        if (!userName) {
            return res
              .status(400)
              .json({ error: true, message: "Username is required" });
          }
        if (!email){
            return res
                .status(400)
                .json({ error: true, message: "Email is required" });
        }
        if (!password){
            return res
                .status(400)
                .json({ error: true, message: "Password is required" });
        }
        if (!confirmPassword){
            return res
                .status(400)
                .json({ error: true, message: "Confirmpassword is required" });
        }
        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({ error: true, message: "Password not match" });
        }

        // use mongoose model named User อาจจะต้องย้ายไป model
        const isUser = await UserData.findOne({ userName: userName });

        if (isUser) {
            return res.json({
            error: true,
            message: "Username already exist",
            });
        }

        

        const isEmail = await UserData.findOne({ email: email });

        if (isEmail) {
            return res.json({
            error: true,
            message: "Email already exist",
            });
        }

        // Hash password
        // const hashedPassword = await hashPassword(password);

        // const token = sign({
        //     userName,
        //     email,
        //     password: hashedPassword,
        //   });


        const newUser = new UserData({
            userName,
            email,
            password,
            });

            await newUser.save();
            return res.json({
                error: false,
                newUser,
                message: "Registration Successful",
              });
    
        
          
            } catch (error) {
                
                next(error);
              }
 });

export default router