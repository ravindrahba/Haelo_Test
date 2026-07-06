import { Hero } from '@/sections/Hero'
import { Why } from '@/sections/Why'
import { Origin } from '@/sections/Origin'
import { HospitalityBand } from '@/sections/HospitalityBand'
import { Sectors } from '@/sections/Sectors'
import { ServicesShowcase } from '@/sections/ServicesShowcase'
import { GlobalReach } from '@/sections/GlobalReach'

export default function Home() {
  return (
    <>
      <Hero />
      <div id="main">
        <Why />
        <Origin />
        <HospitalityBand />
        <Sectors />
        <ServicesShowcase />
        <GlobalReach />
      </div>
    </>
  )
}
