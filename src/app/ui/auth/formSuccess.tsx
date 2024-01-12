

interface FormSuccessProps {
    message: string;
}


const FormSuccess = ({message}: FormSuccessProps) => {
   if (!message) return null
    return(
        <div className="bg-emerald-500/15 text-emerald-500 text-sm font-bold text-center">
            {message}
        </div>
    )
}


export default FormSuccess;

