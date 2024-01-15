
import Link from 'next/link';
import { Button } from '@nextui-org/react';

interface BackButtonProps {
    children?: React.ReactNode;
    label: string;
}

export const BackButton = ({ children, label }: BackButtonProps) => {
    return (
        <Button 
            size="sm" 
            variant='shadow' 
            className='bg-transparent'
        >

            {children ? children : label}
        </Button>

    )
}

export default BackButton
