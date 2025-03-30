import { FC, ReactNode } from "react"
interface Props {
    icon: string,
    children: ReactNode,
}
const DetailRow:FC<Props> = ({icon, children}) => {
  return (
    <p className="details-movie__row">
        <img src={icon} alt="icon" />
        {children}
    </p>
  )
}

export default DetailRow