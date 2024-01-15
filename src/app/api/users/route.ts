import { NextResponse, NextRequest  } from "next/server";
import { connectToDb } from "@/libs/mongo";
import User from "@/models/user";
import { hashPassword, comparePassword } from "@/libs/bcrypt";


export async function GET(request: Request) {
    try {
        await connectToDb();
        const users = await User.find();
        if (!users) {
            return NextResponse.json({ message: "No users found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Users found", users }, { status: 200 });
    } catch (error) {
        console.error('Error in GET method:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const { email, password, name, avatar, lastName, username, role } = await request.json();
    if (!email || !password) {
        return NextResponse.json({ message: "Email and Password are required" }, { status: 422 });
    }
    try{
        await connectToDb();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 422 });
        }
        const hashedPassword = await hashPassword(password);
        await User.create({ email, password: hashedPassword, name, avatar, lastName, username, role });
        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        console.error('Error in POST method:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

