import Hero from "@/components/Hero/Hero"
import PopularSection from "@/components/PopularSection/PopularSection"
import CurrWatchingSection from "@/components/CurrWatchingSection/CurrWatchingSection"
import MoodSection from "@/components/MoodSection/MoodSection"

const MainPage = () => {
  
  return (
    <>
      <Hero />
      <PopularSection />
      <CurrWatchingSection title='Currently Watching'
        path='movie/now_playing' storageKey="movies-watching"/>
      <MoodSection />
      <CurrWatchingSection title='Upcoming' 
        path='movie/upcoming' storageKey="movies-upcoming"/>
    </>
  )
}

export default MainPage