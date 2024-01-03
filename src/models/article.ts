import mongoose, { Schema } from "mongoose"

//todo : add required fields

const articleSchema: Schema = new Schema(
    {
        title: { type: String},
        description: { type: String},
        content : { type: String },
        tags: { type: [String] },
        cover: { type: [String] },
        images: { type: [String] },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
        {timestamps: true}
);

export interface ArticleModel {
    title: string;
    description: string;
    content: string;
    tags: [string];
    cover: [string];
    images: [string];
    createdAt: Date;
    updatedAt: Date;
}


const Article = mongoose.models.Article || mongoose.model<ArticleModel>("Article", articleSchema);

export default Article;