import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SEO } from 'common/components/SEO'
import Logo from 'assets/images/logo.svg'
import css from './index.module.scss'
import Menu from 'common/components/menu'
import HolographicAnimation from 'common/components/holographic/Holographic'
import DevconnectLogo from 'assets/images/devconnect-logo.svg'
import AmsterdamBackground from 'assets/images/amsterdam-background.png'
import AmsterdamForeground from 'assets/images/amsterdam-foreground.png'
import Link from 'common/components/link'
import ScrollDownIcon from 'assets/icons/scroll-down.svg'
import PinIcon from 'assets/icons/pin.svg'
import EFLogo from 'assets/images/ef-logo.svg'
import PlusIcon from 'assets/icons/plus.svg'
import MinusIcon from 'assets/icons/minus.svg'
import DiscordIcon from 'assets/icons/discord.svg'
import { DESCRIPTION } from 'common/components/SEO'

const FAQ = [
  {
    title: 'What is an UNCONFERENCE?',
    text: (
      <>
        An <u>unconference</u> is a participant-driven meeting. Avoiding hierarchical aspects of a conventional
        conference, such as sponsored presentations and top-down organization. The attendees steer the discussions and
        sessions at hand, leading to working groups being led by the participant who suggested it&apos;s topic or
        directed open discussions of the session topic.
      </>
    ),
  },
  {
    title: 'What is the event agenda?',
    text: (
      <>
        An unconference is a participant-driven meeting. Avoiding hierarchical aspects of a conventional conference,
        such as sponsored presentations and top-down organization. The attendees steer the discussions and sessions at
        hand, leading to working groups being led by the participant who suggested it&apos;s topic or directed open
        discussions of the session topic.
      </>
    ),
  },
  {
    title: 'Do I need to be familiar with WEB3 UX design methodologies to attend?',
    text: <>Bla</>,
  },
  {
    title: 'Can I participate remotely?',
    text: <>Bla</>,
  },
  {
    title: 'How should I prepare for the UNCONFERENCE?',
    text: <>Bla</>,
  },
  {
    title: 'Can I present and promote my project?',
    text: <>Bla</>,
  },
]

const Accordion = () => {
  const [open, setOpen] = React.useState<string | null>(null)

  return (
    <ul className={css['accordion']}>
      {FAQ.map(faqItem => {
        let className = css['accordion-item']

        const selected = faqItem.title === open

        if (selected) className += ` ${css['open']}`

        return (
          <li key={faqItem.title} onClick={() => setOpen(selected ? null : faqItem.title)} className={className}>
            <div className={css['header']}>
              <p className={css['title']}>{faqItem.title}</p>
              {selected ? <MinusIcon /> : <PlusIcon />}
            </div>
            <p className={css['content']}>{faqItem.text}</p>
          </li>
        )
      })}
    </ul>
  )
}

export const Copyright = () => {
  return (
    <div className={'copyright-block'}>
      <p className={`copyright tiny-text`}>
        © 2022 Web3 Design, EMPIRE. Trademarks and brands are the property of their respective owners.
      </p>
      <p className={`empire uppercase bold`}>Empire</p>
    </div>
  )
}

const Newsletter = () => {
  const [email, setEmail] = React.useState('')

  return (
    <div className={css['newsletter']}>
      <p className={css['grey']}>Subscribe to our newsletter</p>

      <div className={css['input-submit']}>
        <input
          type="text"
          value={email}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
        />

        <button className={`button sm grey`} onClick={() => alert('not implemented')}>
          Subscribe
        </button>
      </div>
    </div>
  )
}

const useParallax = (elementRef: any) => {
  const [parallaxMultiplier, setParallaxMultiplier] = React.useState(0)

  React.useEffect(() => {
    const element = elementRef.current

    if (!element) return

    let options = {
      threshold: new Array(101).fill(0).map((v, i) => i * 0.01),
    }

    const callback = (entries: any) => {
      const { intersectionRatio, boundingClientRect } = entries[0]

      const scrolledBeyond = boundingClientRect.y < 0

      const maxMagnitude = 200

      if (scrolledBeyond) {
        const magnitude = 100 + (100 - intersectionRatio * 100)

        setParallaxMultiplier(magnitude / maxMagnitude)
      } else {
        const magnitude = intersectionRatio * 100

        setParallaxMultiplier(magnitude / maxMagnitude)
      }
    }

    const observer = new IntersectionObserver(callback, options)

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef])

  return parallaxMultiplier
}

const parallax = (parallaxMultiplier: any) => {
  const baselineTranslateY = 30 // Upper limit translate Y
  const targetTransLateY = -20 // Lower limit translate Y
  const range = baselineTranslateY - targetTransLateY
  const translateYPercentage = baselineTranslateY - parallaxMultiplier * range

  return {
    transform: `translateY(${Math.min(3, translateYPercentage * -1)}%)`,
  }
}

const Background = () => {
  const ref = React.useRef<any>()
  const parallaxMultiplier = useParallax(ref)

  return (
    <>
      <div className={css['background']} ref={ref}>
        <div style={parallax(parallaxMultiplier)}>
          <Image src={AmsterdamBackground} alt="Background" layout="fill" objectFit="contain" objectPosition="bottom" />
        </div>
      </div>
      <div className={css['foreground']}>
        <Image src={AmsterdamForeground} alt="Background" layout="fill" objectFit="contain" objectPosition="bottom" />
      </div>
    </>
  )
}

const Home: NextPage = () => {
  return (
    <div>
      <SEO />
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${css['scene']} ${css['no-overflow']}`}>
        <div className={css['hero']}>
          <Menu />

          <div className="section" id="title-section">
            <div className={css['title-block']}>
              <h1 className="title bold">
                UX<span style={{ color: '#7D7D7D' }}>AMS/XXX/22</span>
                <br />
                UNCONFERENCE
              </h1>
              <DevconnectLogo />
            </div>
          </div>

          <div className="section">
            <div className={css['bottom-block']}>
              <div className={css['date-block']}>
                <p className={`${css['date']}`}>APR 18 —</p>
                <p className={css['where']}>
                  Devconnect
                  <span>Amsterdam</span>
                </p>
              </div>
              <div className={css['call-to-action']}>
                <Link href="" className="button sm">
                  Apply
                </Link>

                <Link
                  href={(() => {
                    const googleCalUrl = new URL(`https://www.google.com/calendar/render?action=TEMPLATE`)

                    googleCalUrl.searchParams.append('text', `UX Unconference`)
                    googleCalUrl.searchParams.append('details', DESCRIPTION)

                    googleCalUrl.searchParams.append(
                      'location',
                      `Het West-Indisch Huis
    Herenmarkt 99, 1013 EC Amsterdam, Netherlands`
                    )

                    googleCalUrl.searchParams.append('dates', `20220418T080000/20220418T160000`)

                    return googleCalUrl.href
                  })()}
                  className="button sm"
                >
                  Add to calendar
                </Link>
              </div>
              <div className={css['location']}>
                <PinIcon />
                <p className="bold big-text">
                  Het West-Indisch Huis
                  <br />
                  Herenmarkt 99, 1013 EC Amsterdam, Netherlands
                </p>
              </div>
            </div>
            <div className={css['scroll-to-continue']}>
              <ScrollDownIcon />
              <p>Scroll to continue</p>
            </div>
          </div>

          <div className={css['animated-background']}>
            <HolographicAnimation />
          </div>
        </div>
      </div>

      <div className={`${css['scene']} ${css['grow-naturally']} ${css['grow-vertically']}`} id="about">
        <div className={css['about']}>
          <div className="section">
            <div className={css['info-block']}>
              <div className={css['left']}>
                <Logo />
              </div>

              <div className={css['right']}>
                <div className={css['block']}>
                  <h3 className={css['header']}>UX Unconference</h3>

                  <p className="extra-large-text">
                    Open-source design un<span style={{ textDecoration: 'line-through' }}>conference</span> and
                    structured working groups helping to drive improved User Experience and usability standards forward
                    for the decentralized eco-system.
                  </p>
                </div>

                <div className={css['block']}>
                  <h3 className={css['header']}>Objective</h3>

                  <p className={css['grey']}>
                    Enable cross pollination of fresh perspectives and emerging UX methodologies. Bringing together
                    developers and designers in the ecosystem working at the various layers of the Web3 Tech Stack to
                    share their unique solutions and encourage interoperability amongst various systems. Helping to
                    create consistent and sustainable mental models for the users to easily grasp when interacting with
                    the entire Web 3 Tech Stack.
                  </p>
                </div>

                <div className={css['call-to-action']}>
                  <Link href="" className="button sm">
                    Notion workspace
                  </Link>

                  <Link href="" className="button sm">
                    Discord
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Background />
        </div>
      </div>

      <div className="section" id="faq">
        <div className={css['faq']}>
          <div className={css['left']}>
            <h2 className="extra-large-text">Frequently Asked Questions</h2>
          </div>

          <div className={css['right']}>
            <Accordion />
          </div>
        </div>
      </div>

      <div className="section">
        <div className={css['footer']}>
          <div className={css['block-1']}>
            <div className={css['left']}>
              <p className={`${css['header']} extra-large-text`}>
                <span className="bold">Collaborate</span> to create the Web3 UX that we deserve, not one that Zuck &
                Mates can co-opt with their metabucks.
              </p>

              <p className={`${css['grey']}`}>
                The unconference is a no-shill zone, designed to facilitate sharing and collaboration on research and
                standardized work being done to improve the overall UX of the ecosystem.
              </p>
            </div>

            <div className={css['right']}>
              <div className={css['content']}>
                <p className="small-text">Made possible with support by:</p>

                <div className={css['logos']}>
                  <DevconnectLogo />
                  <EFLogo />
                </div>
              </div>
            </div>
          </div>

          <div className={css['block-2']}>
            <div className={css['left']}>
              <div className={css['logo-block']}>
                <Logo />
                <p className={css['title']}>
                  UX
                  <br />
                  UNCONF
                  <br />
                  <span>22 —</span>
                </p>
              </div>
              <div className={css['social-media']}>
                <p className={css['grey']}>Community</p>
                <DiscordIcon />
              </div>
            </div>

            <div className={css['right']}>
              <Newsletter />
            </div>
          </div>

          <Copyright />
        </div>
      </div>
    </div>
  )
}

export default Home
