// Logo pixel-art FICHE — fiel ao design Figma original
// SVG construído a partir das coordenadas exactas do Figma (unit=29px)

interface FicheLogoProps {
  /** Modo de exibição */
  variant?: "full" | "compact" | "icon"
  /** Cor primária (overrides CSS var) */
  primaryColor?: string
  /** Cor do texto (preto ou branco) */
  textColor?: string
  className?: string
  width?: number
}

export function FicheLogo({
  variant = "compact",
  primaryColor,
  textColor = "#212829",
  className = "",
  width,
}: FicheLogoProps) {
  const green = primaryColor ?? "rgb(var(--primary))"

  // ── Icon only (pequeno quadrado F) ─────────────────────────────────────
  if (variant === "icon") {
    const w = width ?? 32
    return (
      <svg
        width={w}
        height={w}
        viewBox="0 0 5 5"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="FICHE"
      >
        {/* F pixel icon: left col, top row, middle arm */}
        <rect x="0" y="0" width="1" height="5" fill={textColor} />
        <rect x="0" y="0" width="5" height="1" fill={textColor} />
        <rect x="0" y="2" width="3" height="1" fill={green} />
      </svg>
    )
  }

  // ── Compact: wordmark horizontal (navbar) ───────────────────────────────
  if (variant === "compact") {
    const h = width ? Math.round(width * (147 / 792)) : 28
    const w = width ?? Math.round(h * (792 / 147))
    return (
      <svg
        width={w}
        height={h}
        viewBox="0 0 792 147"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="FICHE"
        role="img"
      >
        {/* ── F ── */}
        <rect x="0"   y="0"   width="29"  height="147" fill={textColor} />
        <rect x="7"   y="0"   width="147" height="29"  fill={textColor} />
        <rect x="55"  y="63"  width="50"  height="29"  fill={textColor} />

        {/* ── I ── */}
        <rect x="189" y="0"   width="29"  height="147" fill={textColor} />

        {/* ── C ── */}
        <rect x="259" y="0"   width="29"  height="147" fill={textColor} />
        <rect x="266" y="0"   width="147" height="29"  fill={textColor} />
        <rect x="266" y="118" width="147" height="29"  fill={textColor} />

        {/* ── H ── */}
        <rect x="448" y="0"   width="29"  height="147" fill={textColor} />
        <rect x="567" y="0"   width="29"  height="147" fill={textColor} />
        <rect x="504" y="63"  width="50"  height="29"  fill={textColor} />

        {/* ── E ── */}
        <rect x="637" y="0"   width="29"  height="147" fill={textColor} />
        <rect x="645" y="0"   width="147" height="29"  fill={textColor} />
        <rect x="693" y="63"  width="50"  height="29"  fill={green}     />
        <rect x="645" y="118" width="147" height="29"  fill={textColor} />
      </svg>
    )
  }

  // ── Full: wordmark + tagline (footer / hero / splash) ──────────────────
  const h = width ? Math.round(width * (222 / 792)) : 60
  const w = width ?? Math.round(h * (792 / 222))
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 792 222"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FICHE — Comércio e Prestação de Serviços"
      role="img"
    >
      <defs>
        <linearGradient id="tagGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#003913" />
          <stop offset="100%" stopColor="#10913b" />
        </linearGradient>
      </defs>

      {/* ── F ── */}
      <rect x="0"   y="0"   width="29"  height="147" fill={textColor} />
      <rect x="7"   y="0"   width="147" height="29"  fill={textColor} />
      <rect x="55"  y="63"  width="50"  height="29"  fill={textColor} />

      {/* ── I ── */}
      <rect x="189" y="0"   width="29"  height="147" fill={textColor} />

      {/* ── C ── */}
      <rect x="259" y="0"   width="29"  height="147" fill={textColor} />
      <rect x="266" y="0"   width="147" height="29"  fill={textColor} />
      <rect x="266" y="118" width="147" height="29"  fill={textColor} />

      {/* ── H ── */}
      <rect x="448" y="0"   width="29"  height="147" fill={textColor} />
      <rect x="567" y="0"   width="29"  height="147" fill={textColor} />
      <rect x="504" y="63"  width="50"  height="29"  fill={textColor} />

      {/* ── E ── */}
      <rect x="637" y="0"   width="29"  height="147" fill={textColor} />
      <rect x="645" y="0"   width="147" height="29"  fill={textColor} />
      <rect x="693" y="63"  width="50"  height="29"  fill={green}     />
      <rect x="645" y="118" width="147" height="29"  fill={textColor} />

      {/* ── Tagline ── */}
      <text
        x="396"
        y="210"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="600"
        fontSize="34"
        letterSpacing="4.42"
        fill="url(#tagGrad)"
      >
        COMÉRCIO E PRESTAÇÃO DE SERVIÇOS
      </text>
    </svg>
  )
}
