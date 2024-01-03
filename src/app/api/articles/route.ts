import { NextResponse, NextRequest  } from "next/server";
import { connectToDb } from "../../../libs/mongo";
import Article from "../../../models/article";

//todo : add auth, add validation, add error handling
//todo : add form data handling for images

export async function GET() {
    try {
        await connectToDb();
        const articles = await Article.find({});
        return NextResponse.json({ message: "Articles found", articles }, { status: 200 });
    }
    catch (error) {
        console.error('Error in GET method:', error);
        return NextResponse.json({ message: "Articles not found", error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const content = formData.get('content') as string;
        const tags = formData.getAll('tags') as string[];
        const cover = formData.getAll('cover') as string[];
        const images = formData.getAll('images') as string[];
        const createdAt = formData.get('createdAt') as string;
        const updatedAt = formData.get('updatedAt') as string;

        await connectToDb();
        const newArticle = await Article.create({
            title, description, content, tags, cover, images, createdAt, updatedAt
        });
        return NextResponse.json({ message: "Article created", article: newArticle }, { status: 201 });

    } catch (error) {
        console.error('Error in POST method:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try{ 
        const formData = await request.formData();
        const id = formData.get('id') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const content = formData.get('content') as string;
        const tags = formData.getAll('tags') as string[];
        const cover = formData.getAll('cover') as string[];
        const images = formData.getAll('images') as string[];
        const updatedAt = formData.get('updatedAt') as string;

        await connectToDb();
        const article = await Article.findByIdAndUpdate(id, { title, description, content, tags, cover, images, updatedAt });
        return NextResponse.json({ message: "Article updated", article }, { status: 200 });

    } catch (error) {
        console.error('Error in PUT method:', error);
        return NextResponse.json({ message: "Article not updated", error }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try{
        const { id } = await request.json();
        await connectToDb();
        const article = await Article.findByIdAndDelete(id);
        return NextResponse.json({ message: "Article deleted", article }, { status: 200 });

    } catch (error) {
        console.error('Error in DELETE method:', error);
        return NextResponse.json({ message: "Article not deleted", error }, { status: 500 });
    }
}
