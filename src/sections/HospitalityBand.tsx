import { SectionBg } from '@/components/SectionBg'
import { AnimatedText } from '@/components/AnimatedText'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/components/Reveal'

/** Full-bleed cinematic hospitality band — parallax interior + a brand statement. */
export function HospitalityBand() {
  return (
    <SectionBg
      src="/images/hospitality-lounge.webp"
      srcSet="/images/hospitality-lounge@1440.webp 1440w, /images/hospitality-lounge.webp 2400w"
      alt="A HAELO-designed hospitality interior"
      overlay="teal"
      intensity="strong"
      className="flex min-h-[80vh] items-center text-mist"
    >
      <div className="container-edge mx-auto w-full max-w-[1600px] py-28">
        <Reveal>
          <Eyebrow tick>The HAELO difference</Eyebrow>
        </Reveal>
        <AnimatedText
          as="p"
          by="line"
          text={'We build the teams behind\nthe world’s most exceptional\nbrands, destinations and\nexperiences.'}
          className="mt-8 max-w-4xl text-hero"
        />
      </div>
    </SectionBg>
  )
}
