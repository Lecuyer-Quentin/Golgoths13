import { NextResponse, NextRequest  } from "next/server";
import { connectToDb } from "../../../libs/mongo";
import User from "../../../models/user";


export async function GET(request: Request) {
    try {
        await connectToDb();
        const users = await User.find();
        return NextResponse.json({ message: "Users found", users }, { status: 200 });
    } catch (error) {
        console.error('Error in GET method:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const { email, password } = await request.json();
    try{
        await connectToDb();
        await User.create({ email, password });
        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        console.error('Error in POST method:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
