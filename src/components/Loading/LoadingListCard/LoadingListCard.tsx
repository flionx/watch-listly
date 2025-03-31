import { FC } from 'react'
import './LoadingListCard.css'
interface Props {
  wide?: boolean
}

const LoadingListCard:FC<Props> = ({wide = false}) => {
  return (
    <div className={`loading-list ${wide ? 'loading-wide__list' : 'card-list__row'}`}>
        <div className="loading-list__camera">
            <div className="loading-list__camera-reel"></div>
        </div>
    </div>
  )
}

export default LoadingListCard