import { getTokenData } from "@/helpers/extractTokenData";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userSchema";
import { connectToDB } from "@/config/db";

connectToDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenData(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "Request successful",
      status: 200,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Request failed",
      status: 400,
    });
  }
}
