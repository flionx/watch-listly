import { FC, ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import ButtonHero from "@/ui/ButtonHero/ButtonHero";
import { visibilityOptions } from "./selectOptions";
import { deleteUserList, setListsVisibility } from "@/app/store/slices/userSlice";
import { IUserList, TListsVisibility } from "@/types/user";
import './ProfileSelect.css';

interface Props {
  visibility?: boolean;
  lists?: IUserList[];
  children: ReactNode;
}

const ProfileSelect: FC<Props> = ({ visibility = false, lists, children }) => {
  const dispatch = useAppDispatch();
  const userSelect = useAppSelector(state => state.user.listsVisibility);
  const [select, setSelect] = useState<string | number>(visibility ? userSelect : 'novalue');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  const handleCancel = () => {
    setSelect(visibility ? userSelect : 'novalue');
  };

  const handleSave = () => {
    if (visibility) {
      dispatch(setListsVisibility(select as TListsVisibility));
    } else {
      setSelect('novalue');
    }
  };

  const handleDelete = () => {
    if (select === 'novalue') return;
    dispatch(deleteUserList(select as number));
    setSelect('novalue');
  };

  const showButtons = (visibility && userSelect !== select) || 
                      (!visibility && select !== 'novalue');

  const renderOptions = () => {
    if (visibility) {
      return Object.entries(visibilityOptions).map(([key, value]) => (
        <option key={key} value={key}>{value}</option>
      ));
    }

    return (
      <>
        <option value="novalue">Select list</option>
        {lists?.map(list => (
          <option key={list.id} value={list.id}>{list.name}</option>
        ))}
      </>
    );
  };

  return (
    <section className="profile-main__select">
      <div className="select__title profile-main-title2">{children}</div>
      <div className="select__row">
        <select
          className="select__select"
          name={visibility ? 'visibility' : 'delete'}
          value={select}
          onChange={handleChange}
        >
          {renderOptions()}
        </select>

        {showButtons && (
          <>
            <ButtonHero noBg onClick={handleCancel}>Cancel</ButtonHero>
            <ButtonHero onClick={visibility ? handleSave : handleDelete}>
              {visibility ? 'Save' : 'Delete'}
            </ButtonHero>
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileSelect;