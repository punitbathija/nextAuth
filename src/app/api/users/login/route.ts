import { connectToDB } from "@/config/db";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    // Check if user exsists in DB
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        error: "User not found",
        status: 400,
      });
    }
    // Comparing the password

    const validatePassword = bcryptjs.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json({
        error: "Invalid password",
        status: 400,
      });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //Creating a token for the user

    const token = await jwt.sign(tokenData, process.env.token_secret!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      user: tokenData,
      success: true,
      message: "Signed in successfully",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  } finally {
  }
}
