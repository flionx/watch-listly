import { FC, ReactNode } from "react"
import styles from './index.module.css'

interface Props {
  children: ReactNode,
  handleClick: VoidFunction,
  noPadding?: boolean,
  transparent?: boolean
}
const ButtonGray: FC<Props> = ({children, handleClick, noPadding, transparent}) => {
  return (
    <button className={[
        styles.button,
        !noPadding ? styles.padding : '',
        transparent ? styles.transparent : ''
    ].join(' ')} 
      onClick={handleClick}>
      {children}
    </button>
  )
}
export default ButtonGray