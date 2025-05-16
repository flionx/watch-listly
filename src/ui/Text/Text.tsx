import { FC, ReactNode } from "react"
import styles from './index.module.css'

interface Props {
    children: ReactNode
}

const TitleBig:FC<Props> = ({children}) => {
  return (
    <span className={styles.titlebig}>{children}</span>
  )
}
const TitleSubBig:FC<Props> = ({children}) => {
  return (
    <span className={styles.titlesubbig}>{children}</span>
  )
}
const TitleMiddle:FC<Props> = ({children}) => {
  return (
    <span className={styles.titlemiddle}>{children}</span>
  )
}
const TitleUnderline:FC<Props> = ({children}) => {
  return (
    <span className={styles.titleunderline}>{children}</span>
  )
}
const TitleSmall:FC<Props> = ({children}) => {
  return (
    <span className={styles.titlesmall}>{children}</span>
  )
}

export {TitleBig, TitleSubBig, TitleMiddle, TitleUnderline, TitleSmall}