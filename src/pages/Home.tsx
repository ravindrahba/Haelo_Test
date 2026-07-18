import { Hero } from '@/sections/Hero'
import { Why } from '@/sections/Why'
import { Origin } from '@/sections/Origin'
import { Sectors } from '@/sections/Sectors'
import { ServicesShowcase } from '@/sections/ServicesShowcase'
import { GlobalReach } from '@/sections/GlobalReach'

// The <HospitalityBand /> block ("The HAELO difference / We build the teams
// behind the world's most exceptional brands…") was removed at the client's
// request — feedback PDF p8. The section component is still in the tree, so it
// can be dropped back in if they change their mind.
export default function Home() {
  return (
    <>
      <Hero />
      <div id="main">
        <Why />
        <Origin />
        <Sectors />
        <ServicesShowcase />
        <GlobalReach />
      </div>
    </>
  )
}
