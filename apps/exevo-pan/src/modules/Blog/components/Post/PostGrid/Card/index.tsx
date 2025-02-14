/* eslint-disable jsx-a11y/anchor-is-valid */
import { FadeImage } from 'components/Atoms'
import NextLink from 'next/link'
import { loadThumbnail } from 'utils'
import { routes } from 'Constants'
import { CardProps } from './types'

const Card = ({ post: { slug, thumbnail, title } }: CardProps) => (
  <li
    key={slug}
    className="relative left-0 flex items-center gap-2 transition-all hover:left-1"
  >
    <div className="bg-primaryVariant grid shrink-0 place-content-center rounded-md p-1.5">
      <FadeImage
        src={loadThumbnail(thumbnail, 32)}
        alt={title}
        layout="fixed"
        width={32}
        height={32}
        unoptimized
      />
    </div>

    <div className="grid gap-0.5">
      <h4 className="line-clamp-2 text-base font-normal">{title}</h4>
    </div>
    <NextLink href={`${routes.BLOG}/${slug}`}>
      <a className="text-none absolute top-0 left-0 h-full w-full">{title}</a>
    </NextLink>
  </li>
)

export default Card
