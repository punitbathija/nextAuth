import { connectToDB } from "@/config/db";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //If user exsists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({
        error: "User already exists",
        status: 400,
      });
    }

    //Hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //Saving the user to DB
    const newRegisteredUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const registeredUser = await newRegisteredUser.save();

    return NextResponse.json({
      success: true,
      message: "User registerd",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
