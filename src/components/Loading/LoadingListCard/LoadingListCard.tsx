import { FC } from 'react'
import './LoadingListCard.css'
interface Props {
  wide?: boolean
}

const LoadingListCard:FC<Props> = ({wide = false}) => {
  return (
    <div className={`card-list__row ${wide ? 'list-wide__card' : 'loading-list'}`}>
        <div className="loading-list__camera">
            <div className="loading-list__camera-reel"></div>
        </div>
    </div>
  )
}

export default LoadingListCard