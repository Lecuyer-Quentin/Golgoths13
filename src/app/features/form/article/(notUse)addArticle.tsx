'use client'

import { useForm, useFieldArray } from "react-hook-form";
import { useTransition, useState } from "react";
import { Input } from "@nextui-org/react";

import { createArticle } from "@/libs/articles";

type FormData = {
    article: {
        title: string,
        description: string,
        content: string,
        cover: string,
        images:[
            {
                src: string,
                alt: string,
            }
        ];
        tags: string[];
    }[];
}
   


export default function AddArticle() {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const { register , handleSubmit, formState: { errors }, control, reset, watch } = useForm<FormData>({
        defaultValues: {
            article: [
                {
                    title: '',
                    description: '',
                    content: '',
                    cover: '',
                    images: [
                        {
                            src:'',
                            alt:'',
                        }
                    ],
                    tags: []
                }
            ],
        }
    })

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "article",
    });


    const onSubmit = async (values : FormData) => {
        setError('')
        setSuccess('')
        startTransition(() => {
            const { article: [{title, description, content, cover, images, tags}] } = values
            console.log(values)
            //createArticle({title, description, content, cover, image, tags})
        })
    }


    return (
        <>

        <form onSubmit={handleSubmit(onSubmit)} >
        
        </form>
        </>
    )
}
