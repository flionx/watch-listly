import { FC, ReactNode } from 'react'
interface Props {
    href: string,
    children: ReactNode,
    className?: string
}

const ExternalLink:FC<Props> = ({href, className, children}) => {
  return (
    <a className={className ?? ''}
        href={href} 
        target='_blank' 
        rel='noopener noreferrer'>
        {children}
    </a>
  )
}

export default ExternalLink