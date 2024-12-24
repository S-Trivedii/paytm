import mongoose from "mongoose";
import { Account } from "../models/account.model.js";

export const checkBalance = async (req, res) => {
  try {
    const userId = req.id;

    // Find the user's account based on userId
    const userAccount = await Account.findOne({ userId });

    // Check if account exists
    if (!userAccount) {
      return res.status(404).json({
        message: "User does not exist",
        success: false,
      });
    }

    // Return user's balance
    return res.status(200).json({
      message: "User balance retrieved successfully",
      balance: userAccount.balance,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error, please try again later",
      success: false,
    });
  }
};

export const transferMoney = async (req, res) => {
  const session = await mongoose.startSession();
  console.log("Hi");
  console.log(req.body);

  try {
    session.startTransaction();
    // const { amount, to } = req.body; // 'to' is the recipient's userId

    const amount = Number(req.body.amount);
    const to = req.body.to;

    const userId = req.id;

    // Fetch the user's account and check balance
    const userAccount = await Account.findOne({ userId }).session(session);

    if (!userAccount || userAccount.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Insufficient balance",
        success: false,
      });
    }

    // Fetch the recipient's account
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Invalid recipient account",
        success: false,
      });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: "Transfer successful",
      success: true,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({
      message: "Server error during transfer",
      success: false,
    });
  }
};
