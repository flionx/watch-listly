import { FC, ReactNode } from 'react'
interface Props {
    noBg?: boolean, 
    icon?: string, 
    onClick: VoidFunction,
    children: ReactNode,
}

const ButtonHero: FC<Props> = ({noBg, icon, onClick, children}) => {
  return (
    <button className={`hero__button ${(icon ? icon + ' ': '') + (noBg ? 'hero__button-nobg' : '')}`}
        onClick={onClick}
    ><span style={{display: `${icon ? '' : 'none'}`}}></span>{children}</button>
  )
}

export default ButtonHero