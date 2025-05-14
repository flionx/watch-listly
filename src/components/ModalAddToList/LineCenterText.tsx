import { FC, ReactNode } from "react"
import styles from './index.module.css'

interface Props {
    children: ReactNode
}
const LineCenterText: FC<Props> = ({children}) => {
    return (
        <div className={styles.line}>
        <hr />
        <span>{children}</span>
    </div>
    )
}

export default LineCenterText;