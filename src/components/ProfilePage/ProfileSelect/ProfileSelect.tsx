import { FC, ReactNode, useCallback, useState } from "react";
import ButtonHero from "@/ui/ButtonHero/ButtonHero"
import { IUserList, TListsVisibility } from "@/types/user";
import './ProfileSelect.css'
import { visibilityOptions } from "./selectOptions";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { deleteUserList, setListsVisibility } from "@/app/store/slices/userSlice";
interface Props {
  visibility?: boolean;
  lists?: IUserList[],
  children: ReactNode,
}

const ProfileSelect:FC<Props> = ({visibility = false, children, lists}) => {
  const userSelect = useAppSelector(state => state.user.listsVisibility);
  const [select, setSelect] = useState<string | number>(
    visibility ? userSelect : 'novalue'
  );
  const dispatch = useAppDispatch();

  const cancelSelect = () => setSelect(visibility ? userSelect : 'novalue');

  const saveSelect = () => {
    if (visibility) {
      dispatch(setListsVisibility(select as TListsVisibility))
    } else {
      setSelect('novalue')
    }
  }

  const deleteList = () => {
    if (select === 'novalue') return;
    dispatch(deleteUserList(select as number))
    setSelect('novalue')
  }


  return (
    <section className="profile-main__select">
        <div className="select__title profile-main-title2">{children}</div>
        <div className="select__row">
            <select className="select__select" 
              name={`${visibility ? 'visibility' : 'delete'}`} 
              value={select}
              onChange={e => setSelect(e.target.value)}
              >
                {visibility ? 
                  Object.keys(visibilityOptions).map(key => (
                    <option key={key} value={key}>{visibilityOptions[key]}</option>
                  )) : (
                    <>
                      <option key='novalue' value='novalue'>Select list</option>
                      {
                      Array.isArray(lists) && lists.length > 0 &&
                        lists.map(list => (
                          <option key={list.id} value={list.id}>{list.name}</option>
                        ))
                      }
                    </>
                )}
            </select>
            {((visibility && userSelect !== select) || 
            (!visibility && select !== 'novalue' )) && <>
              <ButtonHero noBg onClick={cancelSelect}>Cancel</ButtonHero>
              <ButtonHero onClick={visibility ? saveSelect : deleteList}>{visibility ? 'Save' : 'Delete'}</ButtonHero>
            </>}
        </div>
    </section>
  )
}

export default ProfileSelect