import { FC, ReactNode } from 'react'
import './ErrorMessage.css'
interface Props {
    children: ReactNode,
    onClickClose: VoidFunction,
}

const ErrorMessage:FC<Props> = ({children, onClickClose}) => {

  return (
    <div className='error-message' onClick={e => e.stopPropagation()}>
        <p className='error-message__text'>{children}</p>
        <button className='error-message__button'
            onClick={onClickClose}></button>
    </div>
  )
}

export default ErrorMessage