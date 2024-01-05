import { getArticleDataById } from '@/libs/articles';
import { useState, useEffect } from 'react'


type Props = {
  id: string[] | string
}

export default function ArticleDetails({id}: Props) {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [images, setImages] = useState<string[]>([])
  const [cover, setCover] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [createdAt, setCreatedAt] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      const res = await getArticleDataById(id as string)
      setTitle(res.title)
      setDescription(res.description)
      setContent(res.content)
      setImages(res.images)
      setCover(res.cover)
      setTags(res.tags)
      setCreatedAt(res.createdAt)
      setUpdatedAt(res.updatedAt)
    }
    fetchData()
  }
  , [id])
  
  return (
    <>
    <div>ArticleDetail</div>
    <div>{id}</div>
    <div>{title}</div>
    <div>{description}</div>
    <div>{content}</div>
    <div>{images}</div>
    <div>{cover}</div>
    <div>{tags}</div>
    <div>{createdAt}</div>
    <div>{updatedAt}</div>

    </>
  )
}
