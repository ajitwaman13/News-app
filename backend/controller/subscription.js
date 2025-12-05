import UserModel from "../model/user.js";
import { statusCodes } from "../utils/statusCode.js";

export const upgrade_User = async (req, res) => {
  try {
    console.log("hit the backend api...");
    // const userId = req.user._id;
    const userId = req.userId;
    // prime
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isPrime: true },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    return res.status(statusCodes.OK).json({
      message: "User upgraded to Prime successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isPrime: updatedUser.isPrime,
      },
    });
  } catch (error) {
    console.log("error upgrading prime ", error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error upgrading to Prime, try again..." });
  }
};

export const CheckPrimeStatus = async (req, res) => {
  try {
    const UserID = req.userId;
    console.log("hit the backend api check prime ");
    if (!UserID) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ error: "User id missing" });
    }
    const user = await UserModel.findById(UserID);
    if (!user) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    return res.status(statusCodes.OK).json({
      isPrime: user.isPrime,
    });
  } catch (error) {
    console.log(error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error showing prime status, try again..." });
  }
};
