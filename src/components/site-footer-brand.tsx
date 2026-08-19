const VIEWBOX_WIDTH = 1000
const VIEWBOX_HEIGHT = 240
const DEFAULT_GRADIENT_X = VIEWBOX_WIDTH / 2
const BHANU_WORDMARK_PATH =
  "M14.60 49.90Q11.10 49.90 9.22 48.68Q7.35 47.45 6.50 45.95L5.65 45.95L5.65 49.20L0 49.20L0 14.20L5.75 14.20L5.75 27.60L6.60 27.60Q7.15 26.60 8.13 25.75Q9.10 24.90 10.68 24.35Q12.25 23.80 14.60 23.80Q17.65 23.80 20.20 25.28Q22.75 26.75 24.30 29.60Q25.85 32.45 25.85 36.45L25.85 37.25Q25.85 41.25 24.30 44.10Q22.75 46.95 20.18 48.43Q17.60 49.90 14.60 49.90M12.90 44.90Q16 44.90 18.05 42.88Q20.10 40.85 20.10 37.10L20.10 36.60Q20.10 32.80 18.08 30.80Q16.05 28.80 12.90 28.80Q9.80 28.80 7.72 30.80Q5.65 32.80 5.65 36.60L5.65 37.10Q5.65 40.85 7.72 42.88Q9.80 44.90 12.90 44.90ZM31.95 49.20L31.95 14.20L37.70 14.20L37.70 27.75L38.55 27.75Q38.95 26.90 39.85 26.05Q40.75 25.20 42.23 24.65Q43.70 24.10 45.95 24.10Q48.80 24.10 51.00 25.38Q53.20 26.65 54.43 28.95Q55.65 31.25 55.65 34.40L55.65 49.20L49.90 49.20L49.90 34.85Q49.90 31.85 48.43 30.38Q46.95 28.90 44.25 28.90Q41.20 28.90 39.45 30.93Q37.70 32.95 37.70 36.70L37.70 49.20L31.95 49.20ZM70.35 49.90Q67.75 49.90 65.65 48.98Q63.55 48.05 62.33 46.30Q61.10 44.55 61.10 42Q61.10 39.50 62.33 37.80Q63.55 36.10 65.70 35.23Q67.85 34.35 70.60 34.35L77.75 34.35L77.75 32.85Q77.75 30.90 76.55 29.68Q75.35 28.45 72.80 28.45Q70.30 28.45 69.03 29.63Q67.75 30.80 67.35 32.65L62.05 30.90Q62.65 28.95 63.98 27.35Q65.30 25.75 67.50 24.78Q69.70 23.80 72.90 23.80Q77.75 23.80 80.53 26.23Q83.30 28.65 83.30 33.25L83.30 42.95Q83.30 44.45 84.70 44.45L86.80 44.45L86.80 49.20L82.75 49.20Q80.95 49.20 79.80 48.30Q78.65 47.40 78.65 45.85L78.65 45.75L77.80 45.75Q77.50 46.45 76.75 47.45Q76 48.45 74.48 49.18Q72.95 49.90 70.35 49.90M71.30 45.20Q74.15 45.20 75.95 43.58Q77.75 41.95 77.75 39.20L77.75 38.70L70.95 38.70Q69.10 38.70 67.95 39.50Q66.80 40.30 66.80 41.85Q66.80 43.35 68 44.28Q69.20 45.20 71.30 45.20ZM91.55 49.20L91.55 24.50L97.20 24.50L97.20 27.95L98.05 27.95Q98.70 26.55 100.40 25.30Q102.10 24.05 105.55 24.05Q108.40 24.05 110.60 25.35Q112.80 26.65 114.03 28.95Q115.25 31.25 115.25 34.40L115.25 49.20L109.50 49.20L109.50 34.85Q109.50 31.85 108.03 30.38Q106.55 28.90 103.85 28.90Q100.80 28.90 99.05 30.93Q97.30 32.95 97.30 36.70L97.30 49.20L91.55 49.20ZM131.35 49.60Q128.50 49.60 126.30 48.33Q124.10 47.05 122.90 44.73Q121.70 42.40 121.70 39.30L121.70 24.50L127.40 24.50L127.40 38.85Q127.40 41.85 128.88 43.30Q130.35 44.75 133.05 44.75Q136.10 44.75 137.88 42.75Q139.65 40.75 139.65 37L139.65 24.50L145.35 24.50L145.35 49.20L139.75 49.20L139.75 45.75L138.90 45.75Q138.25 47.10 136.53 48.35Q134.80 49.60 131.35 49.60Z"

export function SiteFooterInteractiveLogotype({
  text = "Tavish",
}: {
  text?: string
}) {
  return (
    <div className="screen-line-bottom after:z-1 after:bg-foreground/15">
      <div className="overflow-hidden">
        <div className="flex w-full translate-y-[28%] items-center justify-center">
          <svg
            className="container h-auto w-full"
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label={text}
            role="img"
          >
            <g transform="translate(40 -73) scale(6.2)">
              <text
                x="0"
                y="49.9"
                textLength="145"
                lengthAdjust="spacingAndGlyphs"
                className="fill-foreground/5 stroke-foreground/10 font-bold lowercase"
                strokeWidth="0.35"
                fontSize="42"
                vectorEffect="non-scaling-stroke"
                style={{
                  fontFamily:
                    "var(--font-heading), var(--font-sans), sans-serif",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                }}
              >
                {text}
              </text>
              <text
                x="0"
                y="49.9"
                textLength="145"
                lengthAdjust="spacingAndGlyphs"
                className="font-bold lowercase"
                fontSize="42"
                fill="url(#footer-logotype-gradient)"
                style={{
                  fontFamily:
                    "var(--font-heading), var(--font-sans), sans-serif",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                }}
              >
                {text}
              </text>
            </g>
            <defs>
              <linearGradient
                id="footer-logotype-gradient"
                x1={DEFAULT_GRADIENT_X}
                y1="0"
                x2={DEFAULT_GRADIENT_X}
                y2={VIEWBOX_HEIGHT}
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.55"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
                <stop offset="1" stopColor="var(--foreground)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
