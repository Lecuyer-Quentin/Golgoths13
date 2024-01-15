import { comparePassword } from "@/libs/bcrypt";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectToDb } from "@/libs/mongo";

export async function POST(request: Request) {
    const { email, password } = await request.json();
    if (!email || !password) {
        return NextResponse.json({ message: "Email and Password are required" }, { status: 422 });
    }
    try {
        await connectToDb();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }
        return NextResponse.json({ message: "User logged in", user }, { status: 200 });
    } catch (error) {
        console.error('Error in POST method:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}