

interface FormErrorProps {
    message: string;
}


const FormError = ({message}: FormErrorProps) => {
    if (!message) return null
    return(
        <div className="bg-red-500/15 text-red-500 text-sm font-bold text-center">
            {message}
        </div>
    )
}


export default FormError;

