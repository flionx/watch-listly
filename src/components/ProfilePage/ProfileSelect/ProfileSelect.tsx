import ButtonHero from "@/ui/ButtonHero/ButtonHero"
import './ProfileSelect.css'

const ProfileSelect = () => {
  return (
    <section className="profile-main__select">
        <div className="select__title profile-main-title2">Who can see your lists?</div>
        <div className="select__row">
            <select className="select__select" name="visible" >
                <option value="everybody">Everybody</option>
                <option value="everybody">Nobody</option>
                <option value="everybody">Friends</option>
            </select>
            <ButtonHero noBg onClick={() => {}}>Cancel</ButtonHero>
            <ButtonHero onClick={() => {}}>Save</ButtonHero>
        </div>
    </section>
  )
}

export default ProfileSelect