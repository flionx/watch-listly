import ButtonHero from '@/ui/ButtonHero/ButtonHero'
import styles from './index.module.css'
import { FC } from 'react'
interface Props {
    closeModal: VoidFunction,
}

const ModalAddToList:FC<Props> = ({closeModal}) => {
  return (
    <div className={styles.bg} onClick={closeModal}>
        <div className={styles.modal} onClick={(e) => {e.stopPropagation()}}>
            <button className={styles.input}>
                <input type="text" placeholder='Enter list name'/>
            </button>
            <button className={styles.new}>+ Create new list</button>
            <div className={styles.line}>
                <hr />
                <span>My lists</span>
            </div>
            <ul className={styles.list}>
                <li className={styles.item}>My top 100
                    <button className={styles.add}></button>
                </li>
                <li className={styles.item}>Best
                    <button className={styles.added}></button>
                </li>
            </ul>
            <div className={styles.line}>
                <hr />
                <span>Basic lists</span>
            </div>
            <ul className={styles.list}>
                <li className={styles.item}>Seen it
                    <button className={styles.add}></button>
                </li>
                <li className={styles.item}>Want to see it
                    <button className={styles.added}></button>
                </li>
            </ul>
            <div className={styles.btns}>
                <ButtonHero noBg onClick={closeModal}>Cancel</ButtonHero>
                <ButtonHero onClick={()=>{}}>Add to list</ButtonHero>
            </div>
        </div>
    </div>
  )
}

export default ModalAddToList