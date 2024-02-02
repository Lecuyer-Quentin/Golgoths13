import { getUserData } from "@/libs/users"
import UserDetails from '@/app/ui/user/userDetails'

export async function generateMetadata ({ params }: { params: { id: string } }): Promise<{ title: string, description: string }> {
    const user = await getUserData(params.id as string)
    console.log('user', user)
    if (!user) return { title: 'User not found', description: 'User not found' }
    return {
        title: user.name + ' ' + user.lastName,
        description: 'User details',
    }
    }


export default async function UserPage ( { params }: { params: { id: string } }) {

    
      return (
     <main className='flex flex-col w-full h-full px-20 py-10 min-h-screen'>
            <section className="w-full h-auto py-10">
                <UserDetails id={params.id} />
            </section>

     </main>
    
      )
    }
