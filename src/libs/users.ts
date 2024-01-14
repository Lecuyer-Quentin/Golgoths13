import axios from 'axios';
import { User } from '../../types';
import { LoginSchema, LoginSchemaType } from "@/models/login";
import { hashPassword } from "@/libs/bcrypt";



export async function getSortedUsers() {
    try {
        const res = await axios.get('/api/users');
        const users = res.data.users;
        const sortedUsers = users.sort((a: User, b: User) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        );
        return sortedUsers;

    } catch (error) {
        console.log(error);
    }
}

export async function getUser(id: string) {
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
        await axios.post('/api/users', { email, password , name, avatar, lastName, username, role });
    } catch (error) {
        console.log(error);
    }
}



