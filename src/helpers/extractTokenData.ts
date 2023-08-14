import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decryptToken: any = jwt.verify(token, process.env.token_secret!);
    return decryptToken.id;
  } catch (error: any) {
    console.log("Error occured", error.message);
  }
};
