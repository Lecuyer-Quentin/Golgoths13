import axios from 'axios';
import { Article } from '../../types';

export async function getArticlesData () {
    try{
        const data = await fetch('http://localhost:3000/api/articles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const {articles} = await data.json()
        return articles;
    } catch (err){
        console.log(err)
    }
}

export async function getSortedArticlesData(){
    try{
        const articles = await getArticlesData()
        const sortedArticles = articles.sort((a:Article, b: Article) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
        return sortedArticles

    } catch(err){
        console.log(err)
    }
}
export async function getArticleDataById(id :string){
    try{
        const articles = await getArticlesData()
        const article = articles.find((article : Article) => article._id === id);
        if(!article) {
            console.log('No article found')
        }
        return article
    } catch (err){
        console.log(err)
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




