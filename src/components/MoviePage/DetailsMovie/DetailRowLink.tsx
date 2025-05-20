import { FC, ReactNode } from "react"
import styles from './index.module.css'
import { Link } from "react-router-dom"
interface Props {
    link: string,
    children: ReactNode,
}
const DetailRowLink:FC<Props> = ({link, children}) => {
  return (
    <Link to={link} className={styles.rowLink}>
        {children}
        <span className={styles.linkIcon}></span>
    </Link>
  )
}

export default DetailRowLink