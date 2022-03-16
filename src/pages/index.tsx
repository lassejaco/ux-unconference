import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SEO } from 'common/components/SEO'
import Logo from 'assets/images/logo.svg'
import css from './index.module.scss'
import Menu from 'common/components/menu'
import HolographicAnimation from 'common/components/holographic/Holographic'
import HeaderLogo from 'assets/images/devconnect-logo.svg'
import AmsterdamBackground from 'assets/images/amsterdam-background.png'
import AmsterdamForeground from 'assets/images/amsterdam-foreground.png'
import Link from 'common/components/link'
import ScrollDownIcon from 'assets/icons/scroll-down.svg'
import PinIcon from 'assets/icons/pin.svg'

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
    '--translateY': `${Math.min(3, translateYPercentage * -1)}%`,
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

      <div className={css['scene']}>
        <div className={css['hero']}>
          <Menu />

          <div className="section" id="title-section">
            <div className={css['title-block']}>
              <p className="title bold">
                UX<span style={{ color: '#7D7D7D' }}>AMS/XXX/22</span>
                <br />
                UNCONFERENCE
              </p>
              <HeaderLogo />
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

                <Link href="" className="button sm">
                  Add to calendar
                </Link>
              </div>
              <div className={css['location']}>
                <PinIcon />
                <p>
                  Het West-Indisch Hui
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

      <div className={css['scene']}>
        <div className={css['about']}>
          <div className="section">
            <div className={css['info-block']}>
              <div className={css['left']}>
                <Logo />
              </div>

              <div className={css['right']}>
                <div className={css['block']}>
                  <p className={css['header']}>UX Unconference</p>

                  <p className="extra-large-text">
                    Open-source design un<span style={{ textDecoration: 'line-through' }}>conference</span> and
                    structured working groups helping to drive improved User Experience and usability standards forward
                    for the decentralized eco-system.
                  </p>
                </div>

                <div className={css['block']}>
                  <p className={css['header']}>Objective</p>

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
      {/* <div className={css['scene']}></div> */}
    </div>
  )
}

export default Home
