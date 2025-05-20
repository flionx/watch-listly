import { FC, ReactNode } from "react"
import styles from './index.module.css'
interface Props {
    icon: string,
    children: ReactNode,
}
const DetailRow:FC<Props> = ({icon, children}) => {
  return (
    <p className={styles.row}>
        <img src={icon} alt="icon" />
        {children}
    </p>
  )
}

export default DetailRow