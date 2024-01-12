
import Link from 'next/link';
import { Button } from '@nextui-org/react';

interface BackButtonProps {
    label: string;
    href: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
    return (
        <Button 
            size="sm" 
            variant='shadow' 
            className='bg-transparent'
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>

    )
}

export default BackButton
