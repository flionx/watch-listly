import { FC, ReactNode } from 'react'
import styles from './index.module.css'
interface Props {
    children: ReactNode
}

const DetailsSection:FC<Props> = ({children}) => {
  return (
    <div className={styles.details}>{children}</div>
  )
}

export default DetailsSection