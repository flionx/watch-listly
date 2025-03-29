import './Loading.css'

const LoadingMainPage = () => {
  return (
    <section className="loading-main">
        <div className="loading-main__info">
            <div className="loading-main__column">
            <div className="loading-main__title load-anim"></div>
            <div className="loading-main__text load-anim"></div>
            <div className="loading-main__text load-anim"></div>
            </div>
            <div className="loading-main__btns">
                <div className="loading-main__btn load-anim"></div>
                <div className="loading-main__btn load-anim"></div>
                <div className="loading-main__btn load-anim"></div>
            </div>
        </div>
        <div className="loading-main__list">
            <div className="loading-main__card load-anim"></div>
            <div className="loading-main__card load-anim"></div>
            <div className="loading-main__card load-anim"></div>
            <div className="loading-main__card load-anim"></div>
            <div className="loading-main__card load-anim"></div>
            <div className="loading-main__card load-anim"></div>
            <div className="loading-main__card load-anim"></div>
            <div className="loading-main__card load-anim"></div>
            <div className="loading-main__card load-anim"></div>
        </div>
        <div className="loading-main__btns-right">
                <div className="loading-main__btn-arr load-anim"></div>
                <div className="loading-main__btn-arr load-anim"></div>
            </div>
    </section>
  )
}

export default LoadingMainPage