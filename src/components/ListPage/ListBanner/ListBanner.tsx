import { deleteUserList } from '@/app/store/slices/userSlice'
import ModalMore from '@/components/ModalMore/ModalMore'
import { useAppDispatch } from '@/hooks/useRedux'
import ButtonGray from '@/ui/ButtonGray/ButtonGray'
import { TitleBig } from '@/ui/Text/Text'
import shareLink from '@/utils/shareLink'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
interface Props {
    listName: string,
    listKey: string,
    listType: string,
    userId: string
    isCurrentUser: boolean
}

const ListBanner: FC<Props> = ({listName, listKey, listType, userId, isCurrentUser}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    function deleteList() {
        dispatch(deleteUserList(Number(listKey)));
        navigate(`/user/${userId}`)
    }

  return (
    <section className='banner'>
        <h1><TitleBig>{listName}</TitleBig></h1>
        <div className="banner__more">
            <ButtonGray noPadding handleClick={() => setShowModal(c => !c)}>
                <span className='more'></span>
            </ButtonGray>
            {showModal && 
                <ModalMore>
                    <button onClick={() => shareLink(window.location.href)}>Share list</button>
                    {isCurrentUser && listType !== 'basic' && 
                        <button onClick={deleteList}>Delete list</button>
                    }
                </ModalMore>
            }
        </div>
    </section>
  )
}

export default ListBanner