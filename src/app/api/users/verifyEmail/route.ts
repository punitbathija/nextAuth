import { connectToDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userSchema";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);
    const user = await User.findOne({
      verifiedToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "Invalid token",
      });
    }
    console.log(user);
    user.isVerified = true;
    user.verifiedToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "User Verified",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 400,
    });
  }
}
