export type Article = {
    _id: string;
    title: string;
    description: string;
    content: string;
    tags: string[];
    cover: string[];
    images: string[];
    createdAt: string;
    updatedAt: string;
};

export type User = {
    _id: string;
    username: string;
    name: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
};

