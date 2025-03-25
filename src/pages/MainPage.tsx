import Hero from "@/components/Hero/Hero"
import PopularSection from "@/components/PopularSection/PopularSection"
import WideListSection from "@/components/WideListSection/WideListSection"
import MoodSection from "@/components/MoodSection/MoodSection"

const MainPage = () => {
  return (
    <>
      <Hero />
      <PopularSection />
      <WideListSection title='Currently Watching'
        path='movie/now_playing' storageKey="movies-watching"
      />
      <MoodSection />
      <WideListSection title='Upcoming' 
        path='movie/upcoming' storageKey="movies-upcoming"
      />
    </>
  )
}

export default MainPage