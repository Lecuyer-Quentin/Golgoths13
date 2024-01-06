import { Article } from '../../../../../../../types'

type Props = {
    article: Article
    }

export default function ArticleItem({ article }: Props) {

    const { title, description, tags} = article;

  return (
    <li className='flex flex-row'>
        <p>{title}</p>
        <p>{description}</p>
        <p>{tags}</p>
    </li>
    )
}
