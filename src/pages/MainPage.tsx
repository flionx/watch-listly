import Hero from "@/components/Hero/Hero"
import PopularSection from "@/components/PopularSection/PopularSection"
import CurrWatchingSection from "@/components/CurrWatchingSection/CurrWatchingSection"
import MoodSection from "@/components/MoodSection/MoodSection"

const MainPage = () => {
  
  return (
    <>
      <Hero />
      <PopularSection />
      <CurrWatchingSection />
      <MoodSection />
      <CurrWatchingSection />
    </>
  )
}

export default MainPage