import Hero from "@/components/Hero/Hero"
import PopularSection from "@/components/PopularSection/PopularSection"
import WideListSection from "@/components/WideListSection/WideListSection"
import MoodSection from "@/components/MoodSection/MoodSection"
import { useEffect } from "react"
import { scrollToUpPage } from "@/utils/scrollToUpPage"

const MainPage = () => {
  useEffect(() => {
    scrollToUpPage();
  }, [])

  return (
    <>
      <Hero />
      <PopularSection />
      <WideListSection title='Currently Watching'
        path='movie/now_playing' storageKey="movies-watching"
        type='movie'
      />
      <MoodSection />
      <WideListSection title='Popular Series' 
        path='tv/top_rated' storageKey="movies-series"
        type='tv'
      />
      <WideListSection title='Newest movies' 
        path='movie/upcoming' storageKey="movies-upcoming"
        type='movie'
      />
  </>)
}

export default MainPage