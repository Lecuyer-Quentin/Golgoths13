import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/libs/mongo";
import User from "@/models/user";
import { hashPassword } from "@/libs/bcrypt";


export async function GET() {
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
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "User already exists", user }, { status: 422 });
        }
        const hashedPassword = await hashPassword(password);
        await User.create({ email, password: hashedPassword, name, avatar, lastName, username, role });
        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        console.error('Error in POST method:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH (request: Request) {
    const { id, role } = await request.json();
    if (!id || !role) {
        return NextResponse.json({ message: "Id and Role are required" }, { status: 422 });
    }
    try {
        await connectToDb();
        await User.findByIdAndUpdate(id, { role });
        return NextResponse.json({ message: "User updated" }, { status: 200 });
    } catch (error) {
        console.error('Error in PATCH method:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE (request: NextRequest) {
    
    try {
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json({ message: "Id is required" }, { status: 422 });
        }
        await connectToDb();
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User deleted" }, { status: 200 });
    } catch (error) {
        console.error('Error in DELETE method:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


