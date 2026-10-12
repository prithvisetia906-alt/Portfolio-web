import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

type Project = {
  number: string
  name: string
  category: string
  description: string
  tech: string[]
  tone: string
  layout: string
  visual: string
}

type Service = {
  number: string
  title: string
  description: string
  accent: string
}

const projects: Project[] = [
  { number: '01', name: 'NEBULA RUN', category: '3D Game Environment', description: 'A soft sci-fi playground where every structure, portal and cloud has a pulse.', tech: ['Blender', 'Unity', 'WebGL'], tone: 'peach', layout: 'wide', visual: 'planet' },
  { number: '02', name: 'MONO', category: 'Interactive Character', description: 'A small character study about expression, curiosity and the joy of being online.', tech: ['Three.js', 'React'], tone: 'lavender', layout: 'tall', visual: 'face' },
  { number: '03', name: 'LUMA', category: 'Creative Web Experience', description: 'A luminous product story that turns a long scroll into a tactile little journey.', tech: ['GSAP', 'WebGL'], tone: 'mint', layout: 'tall', visual: 'rings' },
  { number: '04', name: 'PIXELVERSE', category: 'Game World Design', description: 'A colorful map of impossible islands built for play, wonder and wayfinding.', tech: ['Unity', 'Blender'], tone: 'blue', layout: 'wide', visual: 'islands' },
  { number: '05', name: 'ORBIT', category: 'Interactive Product Experience', description: 'A product interface with just enough motion to make the useful bits feel alive.', tech: ['TypeScript', 'Figma'], tone: 'yellow', layout: 'tall', visual: 'orbit' },
  { number: '06', name: 'DREAMSCAPE', category: '3D Motion Experiment', description: 'A slow study in soft forms, bright color and the space between two frames.', tech: ['Cinema 4D', 'After Effects'], tone: 'rose', layout: 'wide', visual: 'blob' },
]

const services: Service[] = [
  { number: '01', title: '3D GAME DESIGN', description: 'Characters, environments, props and immersive game worlds.', accent: 'peach' },
  { number: '02', title: 'CREATIVE DEVELOPMENT', description: 'Interactive websites and experiences powered by modern web technology.', accent: 'lavender' },
  { number: '03', title: '3D WEB EXPERIENCES', description: 'Websites with real-time 3D, WebGL and interactive storytelling.', accent: 'mint' },
  { number: '04', title: 'MOTION & INTERACTION', description: 'Micro-interactions, animations and scroll-based experiences.', accent: 'blue' },
  { number: '05', title: 'UI / UX DESIGN', description: 'Interfaces that balance usability with visual personality.', accent: 'yellow' },
  { number: '06', title: 'DIGITAL PRODUCTS', description: 'From concept to polished interactive product.', accent: 'rose' },
]

const technologies = [
  ['Blender', '3D worlds, props and character forms.'],
  ['Three.js', 'Real-time 3D for the browser.'],
  ['React', 'Interfaces with a living component system.'],
  ['Next.js', 'Fast, flexible digital products.'],
  ['JavaScript', 'Small details with a lot of personality.'],
  ['TypeScript', 'Confident systems that scale.'],
  ['Unity', 'Playable worlds and responsive logic.'],
  ['WebGL', 'Depth, light and pixels in motion.'],
  ['Figma', 'Making the invisible visible early.'],
  ['GSAP', 'Motion with a sense of timing.'],
  ['HTML', 'A solid, semantic foundation.'],
  ['CSS', 'The final layer of the feeling.'],
] as const

const testimonials = [
  { quote: 'OGGY transformed our idea into an interactive experience that felt completely different from anything we\'d seen before.', name: 'Maya Chen', role: 'Creative Director', tone: 'peach' },
  { quote: 'His understanding of both design and technology made the entire project incredibly smooth.', name: 'Daniel Ross', role: 'Founder, PixelForge', tone: 'lavender' },
  { quote: 'Exactly the kind of creative developer you want when a normal website isn\'t enough.', name: 'Alex Morgan', role: 'Product Designer', tone: 'mint' },
]

const processSteps = [
  ['01', 'DISCOVER', 'Understand the idea, audience and goals.'],
  ['02', 'DESIGN', 'Create visual direction, 3D concepts and interaction systems.'],
  ['03', 'BUILD', 'Develop the experience using modern technologies.'],
  ['04', 'LAUNCH', 'Optimize, test and deliver the final product.'],
]

function useReveal<T extends HTMLElement>(threshold = 0.14) {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible')
        observer.unobserve(node)
      }
    }, { threshold })
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])
  return ref
}

function useParallax<T extends HTMLElement>(distance = 24) {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      node.style.setProperty('--scene-shift', `${((progress - 0.5) * distance).toFixed(2)}px`)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [distance])
  return ref
}

function useHeroMagnet() {
  const ref = useRef<HTMLElement | null>(null)
  const target = useRef({ x: 0, y: 0, rx: 0, ry: 0 })
  const current = useRef({ x: 0, y: 0, rx: 0, ry: 0 })
  const frame = useRef(0)
  const animate = () => {
    frame.current = 0
    const node = ref.current
    if (!node) return
    const next = current.current
    const goal = target.current
    next.x += (goal.x - next.x) * 0.075
    next.y += (goal.y - next.y) * 0.075
    next.rx += (goal.rx - next.rx) * 0.075
    next.ry += (goal.ry - next.ry) * 0.075
    node.style.setProperty('--head-x', `${next.x.toFixed(2)}px`)
    node.style.setProperty('--head-y', `${next.y.toFixed(2)}px`)
    node.style.setProperty('--head-rx', `${next.rx.toFixed(2)}deg`)
    node.style.setProperty('--head-ry', `${next.ry.toFixed(2)}deg`)
    if (Math.abs(goal.x - next.x) > 0.05 || Math.abs(goal.y - next.y) > 0.05 || Math.abs(goal.rx - next.rx) > 0.05 || Math.abs(goal.ry - next.ry) > 0.05) {
      frame.current = window.requestAnimationFrame(animate)
    }
  }
  const move = (event: React.PointerEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    target.current = { x: x * 62, y: y * 45, rx: -y * 10, ry: x * 12 }
    if (!frame.current) frame.current = window.requestAnimationFrame(animate)
  }
  const leave = () => {
    target.current = { x: 0, y: 0, rx: 0, ry: 0 }
    if (!frame.current) frame.current = window.requestAnimationFrame(animate)
  }
  useEffect(() => () => { if (frame.current) window.cancelAnimationFrame(frame.current) }, [])
  return { ref, move, leave }
}

function BrandMark({ large = false }: { large?: boolean }) {
  return <a className={`brand-mark ${large ? 'brand-mark--large' : ''}`} href="#top" aria-label="OGGY home">
    <span className="brand-gem" aria-hidden="true"><i /><i /><i /></span>
    <span>OGGY</span>
  </a>
}

function SectionLabel({ eyebrow, index }: { eyebrow: string; index: string }) {
  return <div className="section-label"><span>{index}</span><span>{eyebrow}</span><i aria-hidden="true" /></div>
}

function ArrowIcon() {
  return <span className="arrow-icon" aria-hidden="true">↗</span>
}

function MagneticButton({ children, href = '#contact', variant = 'dark', type = 'button' }: { children: ReactNode; href?: string; variant?: 'dark' | 'light' | 'outline'; type?: 'button' | 'submit' }) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null)
  const move = (event: React.PointerEvent) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8
    ref.current?.style.setProperty('--mx', `${x}px`)
    ref.current?.style.setProperty('--my', `${y}px`)
  }
  const reset = () => {
    ref.current?.style.setProperty('--mx', '0px')
    ref.current?.style.setProperty('--my', '0px')
  }
  const content = <>{children}<ArrowIcon /></>
  if (type === 'submit') return <button ref={ref as React.RefObject<HTMLButtonElement>} className={`button button--${variant}`} type="submit" onPointerMove={move} onPointerLeave={reset}>{content}</button>
  return <a ref={ref as React.RefObject<HTMLAnchorElement>} className={`button button--${variant}`} href={href} onPointerMove={move} onPointerLeave={reset}>{content}</a>
}

function FaceScene() {
  const ref = useRef<HTMLDivElement | null>(null)
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    ref.current?.style.setProperty('--look-x', `${(x * 22).toFixed(2)}px`)
    ref.current?.style.setProperty('--look-y', `${(y * 18).toFixed(2)}px`)
    ref.current?.style.setProperty('--face-rotate-x', `${(-y * 9).toFixed(2)}deg`)
    ref.current?.style.setProperty('--face-rotate-y', `${(x * 12).toFixed(2)}deg`)
    ref.current?.style.setProperty('--glow-x', `${(x * 90 + 50).toFixed(1)}%`)
    ref.current?.style.setProperty('--glow-y', `${(y * 90 + 50).toFixed(1)}%`)
  }
  const reset = () => {
    ref.current?.style.setProperty('--look-x', '0px')
    ref.current?.style.setProperty('--look-y', '0px')
    ref.current?.style.setProperty('--face-rotate-x', '0deg')
    ref.current?.style.setProperty('--face-rotate-y', '0deg')
    ref.current?.style.setProperty('--glow-x', '50%')
    ref.current?.style.setProperty('--glow-y', '50%')
  }
  return <div className="face-scene" ref={ref} onPointerMove={onPointerMove} onPointerLeave={reset} aria-label="An interactive pastel 3D floating character head">
    <div className="face-glow" />
    <div className="face-orbit face-orbit--one" />
    <div className="face-orbit face-orbit--two" />
    <span className="scene-star star--one">✦</span><span className="scene-star star--two">·</span><span className="scene-star star--three">✦</span>
    <div className="face-character">
      <div className="ear ear--left" /><div className="ear ear--right" />
      <div className="face-head">
        <div className="face-shine" />
        <div className="brow brow--left" /><div className="brow brow--right" />
        <div className="eye eye--left"><span className="pupil" /></div>
        <div className="eye eye--right"><span className="pupil" /></div>
        <span className="nose" /><span className="mouth" />
        <span className="blush blush--left" /><span className="blush blush--right" />
      </div>
    </div>
    <div className="scene-caption"><span>FLOATING OBJECT / 001</span><span>MOVE ANYWHERE IN HERO</span></div>
  </div>
}

function FloatingForms() {
  return <div className="floating-forms" aria-hidden="true">
    <span className="float-shape float-shape--sphere" /><span className="float-shape float-shape--cube" /><span className="float-shape float-shape--pill" />
    <span className="float-line float-line--one" /><span className="float-line float-line--two" />
  </div>
}

function Navigation({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return <header className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
    <div className="nav-inner">
      <BrandMark />
      <button className={`nav-toggle ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}><span /><span /></button>
      <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
        <a href="#work" onClick={close}>WORK</a><a href="#about" onClick={close}>ABOUT</a><a href="#services" onClick={close}>SERVICES</a><a href="#experience" onClick={close}>EXPERIENCE</a><a href="#contact" onClick={close}>CONTACT</a>
        <a className="nav-hire" href="#contact" onClick={close}>HIRE OGGY <ArrowIcon /></a>
      </nav>
    </div>
  </header>
}

function Hero() {
  const [loaded, setLoaded] = useState(false)
  const magnet = useHeroMagnet()
  useEffect(() => { const timer = window.setTimeout(() => setLoaded(true), 100); return () => window.clearTimeout(timer) }, [])
  return <section id="top" ref={magnet.ref} onPointerMove={magnet.move} onPointerLeave={magnet.leave} className={`hero ${loaded ? 'is-loaded' : ''}`}>
    <FloatingForms />
    <div className="hero-grid page-pad">
      <div className="hero-copy">
        <h1>IMAGINING<br /><em>WORLDS</em><br />THAT MOVE<span className="period">.</span></h1>
        <p className="hero-lede">I design playful 3D experiences, interactive worlds and digital products where creativity meets technology.</p>
        <div className="hero-actions"><MagneticButton href="#work">View My Work</MagneticButton><MagneticButton href="#contact" variant="outline">Let’s Work Together</MagneticButton></div>
        <div className="hero-footnote"><span>SCROLL TO EXPLORE</span><span className="scroll-arrow">↓</span><span className="hero-index">01 / 12</span></div>
      </div>
      <div className="hero-visual"><FaceScene /></div>
    </div>
    <div className="hero-bottom"><span>PLAYFUL WORLDS / REAL-TIME CURIOSITY / DIGITAL CRAFT</span><span className="hero-bottom-mark">✳</span><span>OGGY® / FICTIONAL PORTFOLIO DEMO</span></div>
  </section>
}

function AboutScene() {
  const sceneRef = useParallax<HTMLDivElement>(26)
  return <div className="about-scene" ref={sceneRef} aria-hidden="true">
    <div className="about-planet"><span className="planet-ring" /><span className="planet-ring planet-ring--two" /><span className="planet-dot dot--one" /><span className="planet-dot dot--two" /></div>
    <div className="about-spark spark--one">✦</div><div className="about-spark spark--two">✦</div>
    <div className="about-scene-label">OBJECT STUDY / 002</div>
  </div>
}

function About() {
  const ref = useReveal<HTMLElement>()
  return <section id="about" className="about section section--cream" ref={ref}>
    <div className="page-pad">
      <SectionLabel eyebrow="A LITTLE ABOUT OGGY" index="02" />
      <div className="about-grid">
        <div className="about-copy reveal reveal--left">
          <h2>MAKING DIGITAL<br /><em>THINGS FEEL</em><br />ALIVE<span className="period">.</span></h2>
          <p className="lead-copy">I work where 3D design, game environments and creative development overlap — turning a loose feeling into something you can click, explore and remember.</p>
          <p className="body-copy">From motion systems to WebGL worlds, I like building experiences that feel generous, a little unexpected and very considered. This fictional OGGY persona is a portfolio demo for teams who want a digital presence with a point of view.</p>
          <div className="about-links"><a href="#services">See what I can build <ArrowIcon /></a><span>3D DESIGN / WEB / MOTION</span></div>
        </div>
        <div className="about-object reveal reveal--right"><AboutScene /></div>
      </div>
      <div className="stats-row reveal">
        <div className="stat"><strong>08<span>+</span></strong><span>YEARS CREATING</span></div><div className="stat"><strong>42</strong><span>PROJECTS</span></div><div className="stat"><strong>18</strong><span>GLOBAL CLIENTS</span></div><div className="stat"><strong>12</strong><span>AWARDS</span></div><p className="fiction-note">* Fictional demo statistics for the OGGY persona.</p>
      </div>
    </div>
  </section>
}

function ProjectVisual({ project }: { project: Project }) {
  return <div className={`project-visual project-visual--${project.visual}`}>
    {project.visual === 'planet' && <><span className="pv-planet" /><span className="pv-ring" /><span className="pv-star pv-star--one">✦</span><span className="pv-star pv-star--two">✦</span><span className="pv-mini-orb" /></>}
    {project.visual === 'face' && <><span className="pv-face"><i /><i /><b /></span><span className="pv-shadow" /></>}
    {project.visual === 'rings' && <><span className="pv-ring-stack" /><span className="pv-torus" /><span className="pv-sun" /></>}
    {project.visual === 'islands' && <><span className="pv-island pv-island--one" /><span className="pv-island pv-island--two" /><span className="pv-cloud pv-cloud--one" /><span className="pv-cloud pv-cloud--two" /></>}
    {project.visual === 'orbit' && <><span className="pv-orbit-core" /><span className="pv-orbit-path pv-orbit-path--one" /><span className="pv-orbit-path pv-orbit-path--two" /><span className="pv-orbit-dot" /></>}
    {project.visual === 'blob' && <><span className="pv-blob" /><span className="pv-blob pv-blob--two" /><span className="pv-beam" /></>}
    <span className="visual-grain" />
  </div>
}

function WorkCard({ project }: { project: Project }) {
  const ref = useReveal<HTMLElement>(0.08)
  return <article ref={ref} className={`project-card project-card--${project.layout} reveal`}>
    <a href="#contact" className="project-card-link" aria-label={`View ${project.name} project`}>
      <ProjectVisual project={project} />
      <div className="project-meta"><span>{project.number}</span><span>{project.category}</span><span className="project-view">VIEW PROJECT <ArrowIcon /></span></div>
      <div className="project-info"><h3>{project.name}</h3><p>{project.description}</p><div className="tech-list">{project.tech.map(item => <span key={item}>{item}</span>)}</div></div>
    </a>
  </article>
}

function Work() {
  const ref = useReveal<HTMLElement>()
  return <section id="work" className="work section section--warm" ref={ref}>
    <div className="page-pad">
      <SectionLabel eyebrow="SELECTED WORK" index="03" />
      <div className="section-heading-row"><div><h2>SELECTED<br /><em>WORK</em><span className="period">.</span></h2></div><div className="section-intro"><span className="tiny-label">A FEW WORLDS I'VE BUILT</span><p>Some experiments, client stories and interactive places that found their way out of my sketchbook.</p></div></div>
      <div className="projects-grid">{projects.map(project => <WorkCard key={project.number} project={project} />)}</div>
    </div>
  </section>
}

function NebulaScene() {
  const sceneRef = useParallax<HTMLDivElement>(42)
  return <div className="nebula-scene" ref={sceneRef} aria-label="Stylized 3D game environment with portals, rocks and a small character">
    <div className="nebula-sky" /><div className="nebula-cloud cloud--one" /><div className="nebula-cloud cloud--two" />
    <div className="nebula-portal"><span /><span /></div><div className="nebula-tower tower--one" /><div className="nebula-tower tower--two" />
    <div className="nebula-rock rock--one" /><div className="nebula-rock rock--two" /><div className="nebula-rock rock--three" /><div className="nebula-ground" />
    <div className="nebula-character"><span className="character-head" /><span className="character-body" /><span className="character-leg leg--one" /><span className="character-leg leg--two" /></div>
    <div className="nebula-label"><span>NEBULA RUN / ENVIRONMENT STUDY</span><span>SCROLL TO TRAVEL</span></div>
  </div>
}

function Featured() {
  const ref = useReveal<HTMLElement>(0.05)
  return <section className="featured section" ref={ref}>
    <div className="featured-head page-pad"><SectionLabel eyebrow="FEATURED PROJECT" index="05" /><div className="featured-title-row"><h2>NEBULA<br /><em>RUN</em><span className="period">.</span></h2><p>A playable universe designed to make the browser feel a little more like a place.</p></div></div>
    <div className="featured-visual-wrap"><NebulaScene /></div>
    <div className="featured-details page-pad"><div className="feature-story"><span className="tiny-label">THE BRIEF</span><p>Build a world with enough atmosphere to feel endless, but enough landmarks to feel like home. Nebula Run is a fictional environment study about scale, softness and tiny moments of discovery.</p><a href="#contact">Start a conversation <ArrowIcon /></a></div><div className="feature-spec"><span className="tiny-label">ROLE</span><div className="spec-tags"><span>3D DESIGN</span><span>GAME DEVELOPMENT</span><span>ENVIRONMENT ART</span></div><span className="tiny-label">TECHNOLOGY</span><div className="spec-tags"><span>BLENDER</span><span>THREE.JS</span><span>UNITY</span><span>WEBGL</span></div></div><div className="feature-number">01<br /><span>/ 06</span></div></div>
  </section>
}

function ServiceIcon({ accent }: { accent: string }) {
  return <span className={`service-icon service-icon--${accent}`} aria-hidden="true"><i /><i /><i /></span>
}

function Services() {
  const ref = useReveal<HTMLElement>()
  return <section id="services" className="services section section--cream" ref={ref}>
    <div className="page-pad"><SectionLabel eyebrow="CAPABILITIES" index="05" /><div className="section-heading-row services-heading"><div><h2>WHAT I CAN<br /><em>BUILD</em><span className="period">.</span></h2></div><p className="section-side-note">A small studio of one, with a big toolkit for making digital experiences feel human.</p></div><div className="services-list">{services.map((service, index) => <a className="service-row" href="#contact" key={service.number}><span className="service-number">{service.number}</span><ServiceIcon accent={service.accent} /><div className="service-title"><h3>{service.title}</h3><p>{service.description}</p></div><span className="service-arrow"><ArrowIcon /></span></a>)}</div></div>
  </section>
}

function TechOrbit() {
  const [active, setActive] = useState(0)
  return <div className="tech-orbit-wrap"><div className="tech-orbit" aria-label="Interactive technology orbit"><div className="orbit-ring orbit-ring--one" /><div className="orbit-ring orbit-ring--two" /><div className="orbit-center"><span>OGGY</span><small>TOOLKIT</small></div>{technologies.map(([name], index) => <button key={name} className={`tech-node ${index === active ? 'is-active' : ''}`} style={{ '--node-index': index, '--node-count': technologies.length } as React.CSSProperties} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>{name}</button>)}</div><div className="tech-detail"><span className="tiny-label">CURRENTLY IN ORBIT</span><h3>{technologies[active][0]}</h3><p>{technologies[active][1]}</p><div className="tech-detail-line"><span /><span>HOVER OR TAB AROUND</span></div></div></div>
}

function Skills() {
  const ref = useReveal<HTMLElement>()
  return <section className="skills section section--warm" ref={ref}><div className="page-pad"><SectionLabel eyebrow="THE TOOLKIT" index="06" /><div className="skills-grid"><div className="skills-copy"><h2>CURIOUS BY<br /><em>DEFAULT</em><span className="period">.</span></h2><p>Good ideas rarely live in one tool. I move between pixels, polygons, prototypes and the tiny details that make an interaction click.</p><div className="skills-note"><span className="note-star">✳</span><span>12 TOOLS<br />ONE POINT OF VIEW</span></div></div><TechOrbit /></div></div></section>
}

function Experience() {
  const ref = useReveal<HTMLElement>()
  return <section id="experience" className="experience section section--cream" ref={ref}><div className="page-pad"><SectionLabel eyebrow="EXPERIENCE / FICTIONAL DEMO" index="07" /><div className="experience-grid"><div><h2>THE LONG<br /><em>VERSION</em><span className="period">.</span></h2><p className="section-side-note">A timeline of the places, people and side quests that shaped the way Oggy builds.</p></div><div className="timeline"><div className="timeline-line"><span /></div><div className="timeline-item"><span className="timeline-year">2026</span><div><h3>Independent Creative Developer</h3><p>OGGY / Global, remote</p><span>Making playful digital worlds for curious people.</span></div></div><div className="timeline-item"><span className="timeline-year">2024</span><div><h3>3D Game Designer</h3><p>PixelForge Studio / London</p><span>Environment systems, world building and the occasional portal.</span></div></div><div className="timeline-item"><span className="timeline-year">2022</span><div><h3>Junior 3D Artist</h3><p>MotionLab / Amsterdam</p><span>Small team, big renders, lots of coffee.</span></div></div><p className="fiction-note">* Fictional experience history for this OGGY portfolio demo.</p></div></div></div></section>
}

function Testimonials() {
  const ref = useReveal<HTMLElement>()
  return <section className="testimonials section section--peach" ref={ref}><div className="page-pad"><SectionLabel eyebrow="KIND WORDS / FICTIONAL DEMO" index="08" /><div className="testimonial-heading"><h2>NOT A<br /><em>NORMAL</em><br />WEBSITE<span className="period">.</span></h2><p>“The right kind of strange is usually the memorable kind.”</p></div><div className="testimonial-grid">{testimonials.map(item => <figure className={`testimonial testimonial--${item.tone}`} key={item.name}><span className="quote-mark">“</span><blockquote>{item.quote}</blockquote><figcaption><strong>{item.name}</strong><span>{item.role}</span></figcaption></figure>)}</div></div></section>
}

function Process() {
  const ref = useReveal<HTMLElement>()
  return <section className="process section section--warm" ref={ref}><div className="page-pad"><SectionLabel eyebrow="HOW IT COMES TOGETHER" index="09" /><div className="process-heading"><h2>FROM FIRST<br /><em>SPARK</em> TO<br />FULL GLOW<span className="period">.</span></h2><p>Every project is a little different. The rhythm usually looks something like this.</p></div><div className="process-grid">{processSteps.map(([number, title, description]) => <div className="process-step" key={number}><span className="process-number">{number}</span><span className="process-dot" /><h3>{title}</h3><p>{description}</p></div>)}</div></div></section>
}

function Contact() {
  const ref = useReveal<HTMLElement>()
  const [sent, setSent] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true) }
  return <section id="contact" className="contact section" ref={ref}><div className="contact-shape contact-shape--one" /><div className="contact-shape contact-shape--two" /><div className="page-pad"><SectionLabel eyebrow="YOUR TURN" index="10" /><div className="contact-grid"><div className="contact-copy"><h2>LET’S BUILD<br /><em>SOMETHING</em><br />UNEXPECTED<span className="period">.</span></h2><p>Have an idea that deserves more than a normal website?</p><div className="contact-actions"><MagneticButton href="mailto:hello@oggy.studio">Email Oggy</MagneticButton><a href="mailto:hello@oggy.studio" className="contact-email">hello@oggy.studio <ArrowIcon /></a></div></div><form className="contact-form" onSubmit={submit}>{sent ? <div className="form-success"><span>✦</span><h3>MESSAGE RECEIVED.</h3><p>OGGY will be in touch with a little more imagination soon.</p><button type="button" onClick={() => setSent(false)}>Send another <ArrowIcon /></button></div> : <><div className="form-row"><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@studio.com" /></label></div><div className="form-row"><label>Project type<select name="type" defaultValue=""><option value="" disabled>Choose one</option><option>Portfolio website</option><option>3D experience</option><option>Game world</option><option>Something unexpected</option></select></label><label>Budget<select name="budget" defaultValue=""><option value="" disabled>Choose a range</option><option>$5k — $10k</option><option>$10k — $25k</option><option>$25k+</option></select></label></div><label>Message<textarea required name="message" rows={4} placeholder="Tell me about the idea..." /></label><div className="form-submit"><button className="button button--dark" type="submit">Start a Project <ArrowIcon /></button><span>Your info stays in this fictional demo.</span></div></>}</form></div><div className="social-row"><span className="tiny-label">FIND OGGY ELSEWHERE</span><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowIcon /></a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a><a href="https://behance.net" target="_blank" rel="noreferrer">Behance <ArrowIcon /></a><a href="https://github.com" target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a><a href="https://dribbble.com" target="_blank" rel="noreferrer">Dribbble <ArrowIcon /></a></div></div></section>
}

function Footer() {
  return <footer className="footer"><div className="page-pad"><div className="footer-top"><BrandMark large /><span className="footer-tagline">3D DESIGNER · CREATIVE DEVELOPER<br />· DIGITAL ARTIST</span><a href="#top" className="back-top">BACK TO TOP ↑</a></div><div className="footer-bottom"><span>© 2026 OGGY / FICTIONAL PORTFOLIO DEMO</span><span>DESIGNED TO MAKE DIGITAL EXPERIENCES FEEL ALIVE.</span><span>OGGY®</span></div></div></footer>
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="site-shell"><Navigation scrolled={scrolled} /><main><Hero /><About /><Work /><Featured /><Services /><Skills /><Experience /><Testimonials /><Process /><Contact /></main><Footer /></div>
}

createRoot(document.getElementById('root')!).render(<App />)
