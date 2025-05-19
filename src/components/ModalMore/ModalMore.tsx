import { FC, ReactNode } from 'react'
import styles from './index.module.css'
interface Props {
    children: ReactNode
}

const ModalMore: FC<Props> = ({children}) => {
  return (
    <div className={styles.modal}>
        {children}
    </div>
  )
}

export default ModalMore