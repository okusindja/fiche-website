"use client"

import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"

interface HeroSlide {
  id: number
  image: string
  badge: string
  title: string
  subtitle: string
  description: string
  cta: string
  ctaLink: string
  ctaSecondary: string
  ctaSecondaryLink: string
}

interface HeroCarouselProps {
  slides: HeroSlide[]
  locale: string
}

export function HeroCarousel({ slides, locale }: HeroCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "90vh" }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{
          nextEl: ".hero-next",
          prevEl: ".hero-prev",
        }}
        loop
        speed={900}
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        className="w-full h-full"
        style={{ minHeight: "90vh" }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full flex items-center" style={{ minHeight: "90vh" }}>
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={slide.id === 1}
                  sizes="100vw"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(10,40,20,0.82) 0%, rgba(10,40,20,0.55) 55%, rgba(10,40,20,0.15) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-20 py-24">
                <div className="max-w-2xl">
                  {/* Badge */}
                  <span
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 border"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.12)",
                      borderColor: "rgba(255,255,255,0.25)",
                      color: "#d4eddb",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {slide.badge}
                  </span>

                  {/* Title */}
                  <h1
                    className="font-extrabold leading-tight text-white mb-4"
                    style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
                  >
                    {slide.title}
                    <br />
                    <span style={{ color: "rgb(var(--primary-muted, 212 237 219))" }}>
                      {slide.subtitle}
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.7 }}>
                    {slide.description}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <Link
                      href={`/${locale}${slide.ctaLink}`}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: "rgb(var(--primary))",
                        boxShadow: "0 8px 24px rgba(16,145,59,0.4)",
                      }}
                    >
                      {slide.cta}
                      <ArrowRight size={18} />
                    </Link>
                    <Link
                      href={`/${locale}${slide.ctaSecondaryLink}`}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:bg-white/20"
                      style={{
                        border: "1.5px solid rgba(255,255,255,0.45)",
                        color: "white",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {slide.ctaSecondary}
                    </Link>
                  </div>

                  {/* Trust stats */}
                  <div className="flex gap-8 mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                    {[
                      { num: "15+", label: "Anos de Experiência" },
                      { num: "250+", label: "Clientes Activos" },
                      { num: "1000+", label: "Projectos" },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className="text-2xl font-extrabold" style={{ color: "rgb(var(--primary-muted, 212 237 219))" }}>
                          {s.num}
                        </div>
                        <div className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slide number */}
              <div
                className="absolute bottom-8 right-8 z-10 text-sm font-semibold tabular-nums hidden md:block"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {String(slide.id).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom nav arrows */}
      <button
        className="hero-prev absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 hidden md:flex"
        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
        aria-label="Slide anterior"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="hero-next absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 hidden md:flex"
        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
        aria-label="Próximo slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Swiper pagination dots — styled globally */}
      <style>{`
        .swiper-pagination-bullet {
          width: 8px; height: 8px;
          background: rgba(255,255,255,0.45);
          opacity: 1;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 4px;
          background: rgb(var(--primary));
        }
        .swiper-pagination {
          bottom: 24px !important;
        }
      `}</style>
    </section>
  )
}
