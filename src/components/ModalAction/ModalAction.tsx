import { FC, ReactNode } from 'react'
import AuthFormNext from '../AuthForm/AuthFormNext'
import styles from './index.module.css'
interface Props {
    children?: ReactNode,
}

const ModalAction:FC<Props> = ({children}) => {
  return (
    <div className={styles.bg}>
        <dialog open className={styles.modal}>
            <AuthFormNext buttonText='Change password'/>
            {children}
        </dialog>
    </div>
  )
}

export default ModalAction