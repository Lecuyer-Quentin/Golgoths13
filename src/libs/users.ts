import axios from 'axios';
import { User } from '../../types';

export async function getUsersData(){
    try{
        const data = await fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const {users} = await data.json()
        return users;
    } catch (err){
        console.log(err)
    }
}

export async function getSortedUsersData() {
    try {
        const users = await getUsersData()
        const sortedUsers = users.sort((a: User, b: User) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
        return sortedUsers

    } catch (err) {
        console.log(err)
    }
}

export async function getUserData(id: string) {
    try {
        const res = await axios.get(`/api/users/${id}`);
        const user = res.data.user;
        return user;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUser(id: string) {
    try {
        await axios.delete(`/api/users`, { data: { id } });
    } catch (error) {
        console.log(error);
    }
}

export async function updateUser(formData: FormData) {
    try {
        await axios.put('/api/users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    }
    catch (error) {
        console.log(error);
    }
}

export async function createUser({ email, password, name, avatar, lastName, username, role }: User) {
    try {
        const res = await axios.post('/api/users', { email, password , name, avatar, lastName, username, role });
        const user = res.data.user;
        return user;
    } catch (error) {
        console.log(error);
    }
}




