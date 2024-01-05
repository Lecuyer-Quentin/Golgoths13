import axios from 'axios';
import { Article } from '../../types';

export async function getSortedArticlesData() {
    try {
        const res = await axios.get('/api/articles');
        const articles = res.data.articles;
        const sortedArticles = articles.sort((a : Article, b : Article) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        return sortedArticles;
    } catch (error) {
        console.log(error);
    }
}

export async function getArticleDataById(id : string) {
    try {
        const res = await axios.get('/api/articles');
        const articles = res.data.articles;
        const article = articles.find((article : Article) => article._id === id);
        return article;
    }
    catch (error) {
        console.log(error);
    }
}

export async function deleteArticle(id : string) {
    try {
        await axios.delete(`/api/articles`, { data: { id } });
    } catch (error) {
        console.log(error);
    }
}

export async function createArticle(formData : FormData) {
    try {
        await axios.post('/api/articles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    } catch (error) {
        console.log(error);
    }
}

export async function updateArticle(formData: FormData) {
    try {
        await axios.put('/api/articles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    }
    catch (error) {
        console.log(error);
    }
}




