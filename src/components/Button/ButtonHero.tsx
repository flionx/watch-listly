import { FC, ReactNode } from 'react'
interface Props {
    noBg?: boolean, 
    onClick: VoidFunction,
    children: ReactNode,
}

const ButtonHero: FC<Props> = ({noBg, onClick, children}) => {
  return (
    <button className={`hero__button ${noBg ? 'hero__button-nobg' : ''}`}
        onClick={onClick}
    ><span></span>{children}</button>
  )
}

export default ButtonHero