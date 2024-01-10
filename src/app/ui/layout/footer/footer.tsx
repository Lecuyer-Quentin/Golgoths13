import Facebook from '../../../../../public/logos/facebookLogo.png';
import Instagram from '../../../../../public/logos/instagramLogo.png';
import Twitter from '../../../../../public/logos/twitterLogo.png';
import Youtube from '../../../../../public/logos/youtubeLogo.png';
import FFBBLogo from '../../../../../public/logos/ffbbLogo.png';
import Image from 'next/image';
import Link from 'next/link';
import { StaticImageData } from 'next/image';
import { forEach } from '@/app/utils/forEach';

type SocialLink = {
    name: string,
    link: string,
    logo: StaticImageData
}
type FooterLink = {
    name: string,
    link: string
}

const socialLinks : SocialLink[] = [
    {
        name: 'Facebook',
        link: 'https://www.facebook.com/golgoths13',
        logo: Facebook
    },
    {
        name: 'Instagram',
        link: 'https://www.instagram.com/golgoths13',
        logo: Instagram
    },
    {
        name: 'Twitter',
        link: 'https://www.twitter.com/golgoths13',
        logo: Twitter
    },
    {
        name: 'Youtube',
        link: 'https://www.youtube.com/golgoths13',
        logo: Youtube
    },
    {
        name: 'FFBB',
        link: 'https://www.ffbb.com',
        logo: FFBBLogo
    }
]

const footerLink : FooterLink[] = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'Contact',
        link: '/contact'
    },
    {
        name: 'Legal',
        link: '/legal'
    },
    {
        name: 'Sitemap',
        link: '/sitemap'
    }
]


export default function Footer() {

const renderSocialLinks = () => {
    return forEach({of: socialLinks, render: (socialLink : SocialLink) => {
        const {name, link, logo} = socialLink;
            return (
                <Link key={name} href={link} target='_blank' rel='noopener noreferrer' className='m-4'>
                    <Image src={logo} alt="logo" width={30} height={30}/>
                </Link>
            )
        }
})}

const renderFooterLinks = () => {
    return forEach({of: footerLink, render: (footerLink : FooterLink) => {
        const {name, link} = footerLink;
            return (
                <li key={name} className="hover:text-yellow-400 hover:scale-110 transform transition duration-500 ease-in-out">
                    <Link href={link}>
                        {name}
                    </Link>
                </li>
            )
        }
})}

  return (
    <footer className="flex-column justify-center align-center w-full primaryColor">
      
        <div className="relative">
            <div className="flex justify-center before:bg-yellow-400 before:h-1 before:absolute before:bottom-20 before:left-0 before:content-[''] before:z-10 before:w-1/4 before:opacity-50 before:rounded-full before:shadow-2xl after:bg-yellow-400 after:h-1 after:absolute after:bottom-20 after:right-0 after:content-[''] after:z-10 after:w-1/4 after:opacity-50 after:rounded-full">
                {renderSocialLinks()}
            </div>
            

            <ul className="flex justify-center gap-8 my-2">
                {renderFooterLinks()}
            </ul>

            <div className="flex-column justify-center align-center text-yellow-400 text-sm">
                <p className="text-center">© 2024 Golgoths 13</p>
                <p className="text-center">All rights reserved</p>
            </div>
        </div>
    </footer>
  )
}
