
interface HeaderProps {
    label: string;
}

const Header = ({ label }: HeaderProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h1>{label}</h1>
        </div>
    )
}

export default Header


