import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import './App.css'

const cases = [
  ['배우자 외도 관련 이혼소송', '2026.08.10'],
  ['상간녀 손해배상 청구소송', '2026.08.09'],
  ['배우자 부정행위 이혼소송', '2026.08.08'],
  ['상간녀 위자료 청구소송', '2026.08.07'],
  ['배우자 외도 증거 관련 소송', '2026.08.06'],
  ['상간녀 부정행위 손해배상', '2026.08.05'],
  ['외도로 인한 이혼 및 위자료', '2026.08.04'],
  ['배우자 외도 상간녀 소송', '2026.08.03'],
]

const awards = [1, 2, 3, 4, 5]
const rollingKeywords = ['증거수집', '사실확인', '소송준비']

const reasons = [
  {
    icon: '/images/reason-strategy.png',
    title: '법적 메커니즘을 꿰뚫는 결정적 증거수집',
    description: '실전 노하우를 바탕으로 소송의 판도를 바꾸는 확실한 전문 조력자가 되어드립니다.',
  },
  {
    icon: '/images/reason-response.png',
    title: '단순 정보 수집을 넘어선 전략적 대응',
    description: '현장에서 직접 확보한 명확한 물증과 함께, 사전 해결을 위한 최적의 법리 방향성까지 제시합니다.',
  },
  {
    icon: '/images/reason-speed.png',
    title: '단 2~3일, 불안을 확신으로 바꾸는 압도적 속도',
    description: '조급함과 불안 속에서 벗어날 수 있도록, 의뢰 즉시 착수하여 신속하게 결과를 전달합니다.',
  },
  {
    icon: '/images/reason-consultation.png',
    title: '간편하고 신속한 온라인 상담',
    description: '직접 찾아오지 않으셔도 되는 온라인 상담으로 부담을 덜어드립니다.',
  },
]

const steps = [
  {
    title: '민간조사 의뢰검토',
    description: '사건·영상 촬영 / 동선 관찰 / 지속적 만남 여부 / 숙박업소 출입 / 차량 동승 / 스킨십 등',
  },
  {
    title: '증거 확보',
    description: '사진·영상 확보 / 보유 자료 분석 / 증거 정리 / 사실관계 확인',
  },
  {
    title: '제휴 법무법인 무료상담',
    description: '이혼 상담 / 상간소송 검토 / 위자료 상담 / 법률 자문',
  },
  {
    title: '상간자 특정',
    description: '신원 확인 / 사실관계 확인 / 관계 파악 / 정보 확인',
  },
  {
    title: '내용증명',
    description: '법률 전문가 상담을 통한 내용증명 작성 / 관계 중단 요구 / 위자료 협의',
  },
  {
    title: '상간자 위자료 청구 소송',
    description: '증거 검토 / 위자료 청구 / 손해배상 청구 / 소송 진행',
  },
  {
    title: '이혼소송 병행 여부',
    description: '이혼 여부 검토 / 재산분할 / 양육권 상담 / 소송 진행',
  },
  {
    title: '해결 및 비밀유지',
    description: '사건 마무리 / 진행 결과 안내 / 사후 상담 / 철저한 비밀 유지',
  },
]

type ConsultationForm = {
  name: string
  phone: string
  availableTime: string
  message: string
  privacy: boolean
  website: string
}

const initialForm: ConsultationForm = {
  name: '',
  phone: '',
  availableTime: '',
  message: '',
  privacy: false,
  website: '',
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="탐정법인 정성 홈">
      <img src="/images/logo-mark.png" alt="" />
      <span className="brand-korean">탐정법인</span>
      <span className="brand-english">JEONG<br />SEONG</span>
    </a>
  )
}

function ArrowIcon() {
  return <span aria-hidden="true">→</span>
}

function AnimatedNumber({ value, duration = 1600 }: { value: number, duration?: number }) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? value : 0
  ))

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let animationFrame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return

      const startTime = performance.now()
      const update = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        setDisplayValue(Math.round(value * easedProgress))

        if (progress < 1) animationFrame = requestAnimationFrame(update)
      }

      animationFrame = requestAnimationFrame(update)
      observer.disconnect()
    }, { threshold: 0.55 })

    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrame)
    }
  }, [duration, value])

  return <span ref={elementRef} className="count-up">{displayValue.toLocaleString('ko-KR')}</span>
}

function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    document.documentElement.classList.add('motion-ready')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 })

    elements.forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])
}

function App() {
  const [form, setForm] = useState<ConsultationForm>(initialForm)
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [rollingKeywordIndex, setRollingKeywordIndex] = useState(0)

  useScrollReveal()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(() => {
      setRollingKeywordIndex((current) => (current + 1) % rollingKeywords.length)
    }, 2400)

    return () => window.clearInterval(interval)
  }, [])

  const goToConsultation = () => {
    document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })
  }

  const submitConsultation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.privacy) {
      setSubmitState('error')
      setSubmitMessage('개인정보 처리방침에 동의해 주세요.')
      return
    }

    setSubmitState('loading')
    setSubmitMessage('')

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json() as { message?: string }

      if (!response.ok) {
        throw new Error(result.message || '상담 접수 중 문제가 발생했습니다.')
      }

      setSubmitState('success')
      setSubmitMessage(result.message || '상담이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.')
      setForm(initialForm)
    } catch (error) {
      setSubmitState('error')
      setSubmitMessage(error instanceof Error ? error.message : '잠시 후 다시 시도해 주세요.')
    }
  }

  return (
    <main id="top">
      <header className="site-header">
        <div className="award-strip">
          <p>대한민국 외도 증거 수집 전문 | 탐정법인 정성</p>
          <img src="/images/award-badge.png" alt="2024 대한민국 소비자평가 1위 브랜드 대상" />
          <button type="button" onClick={goToConsultation}>무료 익명상담 바로가기 <ArrowIcon /></button>
        </div>
        <div className="header-inner page-shell">
          <Brand />
          <span className="security-badge">최고등급 보안인증</span>
        </div>
      </header>

      <section className="hero-section page-shell" aria-labelledby="hero-title" data-reveal="scale">
        <div className="hero-card">
          <div className="hero-content">
            <p className="eyebrow">외도 증거수집 전문 탐정법인</p>
            <h1 id="hero-title">
              <span className="rolling-window" aria-label={rollingKeywords[rollingKeywordIndex]}>
                <span className="rolling-keyword" key={rollingKeywords[rollingKeywordIndex]} aria-hidden="true">{rollingKeywords[rollingKeywordIndex]}</span>
              </span>
              , 소송까지<br />확실하게 시작하기
            </h1>
            <p className="hero-description">비용없는 무료상담, 비밀보장 서비스</p>
            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={goToConsultation}>원클릭 상담</button>
              <a className="button button-secondary" href="tel:010-0000-0000">전화 상담</a>
            </div>
          </div>
          <div className="hero-metrics" aria-label="주요 실적">
            <div><strong>상담건수</strong><span><b><AnimatedNumber value={15087} /></b> +</span></div>
            <div><strong>만족도</strong><span><b><AnimatedNumber value={99} /></b> %</span></div>
          </div>
        </div>
      </section>

      <section className="coverage-section section" aria-labelledby="coverage-title">
        <div className="page-shell coverage-grid">
          <div className="section-copy" data-reveal="left">
            <p className="section-kicker">전국조사현황</p>
            <h2 id="coverage-title">단순한 증거 수집이 아닙니다</h2>
            <p>승소 가능성을 고려한 전략형 증거 설계를 진행합니다.</p>
            <div className="coverage-numbers">
              <p>시 / 군 / 구 지역수 <strong><AnimatedNumber value={120} /><sup>+</sup></strong></p>
              <p>서울특별시 · 경기도 외 전국지역 <strong><AnimatedNumber value={42} /><sup>%</sup></strong></p>
            </div>
            <p className="muted">법과 정성이 만날 때, 감춰진 진실이 드러납니다.</p>
          </div>
          <img className="coverage-map" src="/images/coverage-map.webp" alt="전국 조사 지역 분포 지도" data-reveal="right" />
        </div>
      </section>

      <section className="experience-section section" aria-labelledby="experience-title">
        <div className="page-shell">
          <div className="section-heading centered" data-reveal="up">
            <p className="section-kicker">PROVEN EXPERIENCE</p>
            <h2 id="experience-title">수많은 증거수집 경험</h2>
            <p>신뢰할 수 있는 경력의 전문가들이 팀을 꾸려<br />효과적으로 증거를 수집하며 해결하고 있습니다.</p>
          </div>
          <div className="proof-cards" data-reveal="up">
            <article style={{ backgroundImage: "url('/images/proof-handshake.webp')" }}>
              <span>만족도</span><strong><AnimatedNumber value={99} />%</strong>
            </article>
            <article style={{ backgroundImage: "url('/images/proof-office.webp')" }}>
              <span>진행건수</span><strong><AnimatedNumber value={15087} />+</strong>
            </article>
          </div>
          <div className="case-board" data-reveal="up">
            <div className="case-board-title"><strong>의뢰 사건 진행목록</strong><span>날짜</span></div>
            <ul>
              {cases.map(([title, date]) => <li key={`${title}-${date}`}><span>{title}</span><time>{date}</time></li>)}
            </ul>
            <nav className="pagination" aria-label="사건 목록 페이지"><button type="button" aria-label="이전 페이지">‹</button><b>1</b><button type="button">2</button><button type="button">3</button><span>…</span><button type="button">713</button><button type="button" aria-label="다음 페이지">›</button></nav>
          </div>
        </div>
      </section>

      <section className="insight-section section" aria-labelledby="insight-title">
        <div className="page-shell">
          <div className="section-heading centered" data-reveal="up">
            <p className="section-kicker">TRUSTED RECORD</p>
            <h2 id="insight-title">탐정법인 정성 INSIGHT</h2>
          </div>
          <div className="insight-grid" data-reveal="up">
            <img src="/images/press.webp" alt="탐정사무소 정성 소비자 선호 브랜드 수상 보도자료" />
            <article>
              <span>NEWS</span>
              <h3>[이뉴스투데이] “대한민국 소비자 선호 브랜드 1위” 수상</h3>
              <p>탐정사무소 정성 대표는 “진심으로 감사드리며 더 나은 미래를 함께 만들어가겠다”고 수상 소감을 전했습니다.</p>
              <time>2024.10.15</time>
            </article>
          </div>
          <div className="award-marquee" data-reveal="up" aria-label="탐정법인 정성 수상 인증">
            <div className="award-track">
              {[...awards, ...awards].map((award, index) => (
                <img
                  key={`${award}-${index}`}
                  src={`/images/award-${award}.webp`}
                  alt={index < awards.length ? `탐정법인 정성 수상 인증 ${award}` : ''}
                  aria-hidden={index >= awards.length}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="success-section section" aria-labelledby="success-title">
        <div className="page-shell">
          <div className="section-heading centered" data-reveal="up">
            <p className="section-kicker">REAL REVIEW</p>
            <h2 id="success-title">탐정법인 정성 성공후기</h2>
          </div>
          <div className="success-card" data-reveal="scale">
            <div className="success-image-wrap"><img src="/images/success-chat.webp" alt="의뢰인과의 실제 상담 대화 예시" /></div>
            <div className="success-copy"><span>한OO 님</span><strong>배우자 부정행위 이혼소송 문제<br />7일 만에 증거 수집 후 완벽해결</strong></div>
          </div>
          <button className="button button-blue" type="button" onClick={goToConsultation} data-reveal="up">지금 바로 해결하기</button>
        </div>
      </section>

      <section className="reasons-section section" aria-labelledby="reasons-title">
        <div className="page-shell">
          <div className="section-heading centered" data-reveal="up">
            <p className="section-kicker">WHY JEONG SEONG</p>
            <h2 id="reasons-title">정성과 함께 하셔야하는 이유</h2>
            <p>아직 고민되시나요?</p>
          </div>
          <div className="reason-list">
            {reasons.map((reason, index) => (
              <article key={reason.title} data-reveal="left" style={{ '--reveal-delay': `${index * 90}ms` } as CSSProperties}>
                <img src={reason.icon} alt="" />
                <div><h3>{reason.title}</h3><p>{reason.description}</p></div>
              </article>
            ))}
          </div>
          <button className="button button-blue" type="button" onClick={goToConsultation} data-reveal="up">상담 접수 바로가기</button>
        </div>
      </section>

      <section className="process-section section" aria-labelledby="process-title">
        <div className="page-shell">
          <div className="section-heading centered" data-reveal="up">
            <p className="section-kicker">PROCESS</p>
            <h2 id="process-title">이렇게 진행됩니다</h2>
            <p>논스톱 해결 진행 정성은 가능합니다!</p>
          </div>
          <div className="process-grid">
            {steps.map((step, index) => (
              <article key={step.title} data-reveal="up" style={{ '--reveal-delay': `${(index % 2) * 100}ms` } as CSSProperties}>
                <div className="step-image"><img src={`/images/step-${index + 1}.webp`} alt="" /><span>{index + 1}</span></div>
                <div className="step-copy"><h3>{step.title}</h3><p>{step.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="consultation" className="consultation-section section" aria-labelledby="consultation-title">
        <div className="page-shell">
          <div data-reveal="left"><Brand /></div>
          <div className="section-heading centered" data-reveal="up">
            <p className="section-kicker">PRIVATE CONSULTATION</p>
            <h2 id="consultation-title">확실한 결과 정성이 책임집니다</h2>
          </div>
          <div className="chat-bubbles" aria-hidden="true" data-reveal="scale"><p>탐정법인 정성입니다.<br />무엇을 도와드릴까요?</p><p>심증은 있는데… 물증이 없어요.<br />가능할까요?</p></div>
          <form className="consultation-form" onSubmit={submitConsultation} data-reveal="up">
            <div className="honeypot" aria-hidden="true"><label htmlFor="website">웹사이트</label><input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} /></div>
            <label><span>이름</span><input required maxLength={30} autoComplete="name" placeholder="성함을 입력해주세요." value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
            <label><span>연락처</span><input required maxLength={20} inputMode="tel" autoComplete="tel" placeholder="연락처를 입력해주세요. (숫자만 입력)" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
            <label><span>상담가능시간</span><select required value={form.availableTime} onChange={(event) => setForm({ ...form, availableTime: event.target.value })}><option value="">상담 가능한 시간을 선택해주세요.</option><option>오전 9시 ~ 12시</option><option>오후 12시 ~ 3시</option><option>오후 3시 ~ 6시</option><option>오후 6시 이후</option><option>언제든지 가능</option></select></label>
            <label className="message-row"><span>문의내용</span><textarea required maxLength={1000} placeholder="문의 내용을 입력해주세요." value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /></label>
            <label className="privacy-row"><input type="checkbox" checked={form.privacy} onChange={(event) => setForm({ ...form, privacy: event.target.checked })} /><span>개인정보처리방침 및 철저한 비밀유지 서약에 동의합니다. <b>(필수)</b></span></label>
            <button className="button submit-button" type="submit" disabled={submitState === 'loading'}>{submitState === 'loading' ? '안전하게 접수 중…' : '100% 비밀 보장 · 사건 접수하기'}</button>
            <p className={`form-result ${submitState}`} role="status" aria-live="polite">{submitMessage}</p>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-shell"><Brand /><p>상담 내용과 개인정보는 안전하게 보호됩니다.</p><small>© 2026 탐정법인 정성. All rights reserved.</small></div>
      </footer>

      <button className="mobile-sticky-cta" type="button" onClick={goToConsultation}>무료 비밀상담</button>
    </main>
  )
}

export default App
