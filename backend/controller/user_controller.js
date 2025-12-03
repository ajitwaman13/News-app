import UserModel from "../model/user.js";
import {
  UserValidation,
  LoginValidation,
} from "../validations/auth.validation.js";
import { statusCodes } from "../utils/statusCode.js";
import { token } from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import profileModel from "../model/profile.js";
/**
 
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 
 **/
export const NewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isValid = UserValidation.safeParse({ username, email, password });

    if (isValid.error) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ error: "Invalid data" });
    }

    const ExistingUser = await UserModel.findOne({ email });

    if (ExistingUser) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: "User already register login plz.." });
    }
    const password_bcrypt = await bcrypt.hash(password, 10);

    const NewUser = await UserModel.create({
      username,
      email,
      password: password_bcrypt,
    });
    const token_Gen = token({ id: NewUser._id });
    // console.log(token_Gen);

    res
      .status(statusCodes.OK)
      .json({ message: "User create", NewUser, token_Gen });
  } catch (e) {
    console.log(e);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "something went wrong try again..." });
  }
};

export const Login = async (req, res) => {
  try {
    console.log("login controller caled");
    const { email, password } = req.body;

    const isValid = LoginValidation.safeParse({ email, password });

    if (isValid.error) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ error: "Invalid data" });
    }

    const ExistingUser = await UserModel.findOne({ email });
    console.log("ExistingUser id ", ExistingUser._id);

    if (!ExistingUser) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: "User are not register .." });
    }
    const password_bcrypt = await bcrypt.compare(
      password,
      ExistingUser.password
    );

    if (!password_bcrypt) {
      return res
        .status(statusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    const token_Gen = token({ id: ExistingUser._id });
    // console.log("token_Gen", token_Gen);
    res
      .status(statusCodes.OK)
      .json({ message: "User Login", ExistingUser, token_Gen });
  } catch (e) {
    console.log(e);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "something went wrong try again..." });
  }
};

export const Logout = async (req, res) => {
  try {
    console.log("logout workng ");
    res.status(statusCodes.OK).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    res.status(statusCodes.BAD_REQUEST).json({ error: "Logout issue..." });
  }
};

// profile 
export const profile = async (req, res) => {
  try {
    const id = req.userId;
    console.log("profile user id ", id);

    const user = await UserModel.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ profile: user });
  } catch (e) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// chage the username and password 
export const Update_Usr = async (req, res) => {
  try {
    const { name, nickname, age, phoneNumber } = req.body;
    const id = req.userId;

    console.log("profile user id ", id);
    console.log(req.body);

    if (!name || !nickname || !age || !phoneNumber) {
      return res.status(400).json({ error: "All fields required" });
    }

    const updatedProfile = await profileModel.findOneAndUpdate(
      { userId: id },
      { name, nickname, age, phoneNumber },
      { new: true, upsert: true } 
 
    );

    res.status(statusCodes.OK).json({
      message: "User profile updated",
      profile: updatedProfile,
    });

  } catch (error) {
    console.log("error in user update ..", error);
    res.status(500).json({ error: "User update error ..." });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    // const id = req.userId;
    const id=req.params.id;

    console.log("del id is ",id)

    await UserModel.findByIdAndDelete(id);
    await profileModel.deleteOne({ userId: id });

    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};

