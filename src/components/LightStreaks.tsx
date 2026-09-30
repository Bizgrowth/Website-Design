// Cinematic diagonal light streaks with an ember glow, in the style of the
// Fusion AI template. Pure CSS (no image): each streak is a blurred gradient
// bar rotated along the same diagonal, blended with "screen".
type Streak = { top: string; h: number; blur: number; tone: "blue" | "core" | "ember" | "haze"; delay: number; opacity: number };

const streaks: Streak[] = [
  { top: "6%", h: 140, blur: 55, tone: "haze", delay: 0, opacity: 0.7 },
  { top: "17%", h: 4, blur: 2, tone: "ember", delay: 1.2, opacity: 0.9 },
  { top: "20%", h: 16, blur: 7, tone: "blue", delay: 0.4, opacity: 1 },
  { top: "21.4%", h: 3, blur: 1, tone: "core", delay: 0.4, opacity: 1 },
  { top: "30%", h: 70, blur: 30, tone: "haze", delay: 2, opacity: 0.6 },
  { top: "36%", h: 9, blur: 4, tone: "blue", delay: 2.6, opacity: 0.95 },
  { top: "36.8%", h: 2, blur: 0.5, tone: "core", delay: 2.6, opacity: 1 },
  { top: "43%", h: 3, blur: 1.5, tone: "ember", delay: 3.4, opacity: 0.75 },
  { top: "52%", h: 22, blur: 10, tone: "blue", delay: 1.6, opacity: 0.85 },
  { top: "53.6%", h: 3, blur: 1, tone: "core", delay: 1.6, opacity: 0.95 },
  { top: "62%", h: 6, blur: 3, tone: "blue", delay: 3.8, opacity: 0.7 },
  { top: "70%", h: 90, blur: 40, tone: "haze", delay: 3, opacity: 0.45 },
];

export function LightStreaks({ intensity = 1, className = "" }: { intensity?: number; className?: string }) {
  return (
    <div aria-hidden className={`light-streaks pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="ember-glow" />
      <div className="streak-field" style={{ opacity: intensity }}>
        {streaks.map((s, i) => (
          <span
            key={i}
            className={`streak streak-${s.tone}`}
            style={{ top: s.top, height: s.h, filter: `blur(${s.blur}px)`, opacity: s.opacity, animationDelay: `${s.delay}s` }}
          />
        ))}
      </div>
    </div>
  );
}
