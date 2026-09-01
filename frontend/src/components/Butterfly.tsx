interface ButterflyProps {
  /** wing span in px */
  size?: number;
  /** seconds per full flap cycle -- vary per instance so they never beat in unison */
  duration?: number;
  delay?: number;
  /** 0-1, how much the iridescence leans warm */
  hue?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Wings are two mirrored halves rotated on Y inside a perspective container, so
 * they fold toward and away from the viewer while the body stays put. Inline SVG
 * rather than a sprite because only separate elements can be animated apart.
 */
const Butterfly = ({
  size = 64,
  duration = 0.9,
  delay = 0,
  hue = 0,
  className = '',
  style,
}: ButterflyProps) => {
  const id = `bw-${Math.round(hue * 1000)}-${size}-${Math.round(duration * 100)}`;

  const wing = (side: 'l' | 'r') => (
    <div
      className={`butterfly-wing butterfly-wing-${side}`}
      style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <svg
        viewBox="0 0 50 100"
        width={size / 2}
        height={size}
        style={{ transform: side === 'l' ? 'scaleX(-1)' : undefined, display: 'block' }}
      >
        <defs>
          <linearGradient id={`${id}-${side}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={hue > 0.5 ? '#f4a5c0' : '#f472b6'} />
            <stop offset="45%" stopColor="#a78bfa" />
            <stop offset="78%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#e4c694" />
          </linearGradient>
        </defs>
        {/* forewing + hindwing as one silhouette */}
        <path
          d="M2 46 C6 20, 20 4, 34 6 C46 8, 49 20, 44 32 C40 42, 22 46, 2 46 Z
             M2 52 C10 52, 30 54, 38 64 C45 73, 41 88, 30 92 C18 96, 6 78, 2 52 Z"
          fill={`url(#${id}-${side})`}
          stroke="rgba(10,9,14,0.55)"
          strokeWidth="1.5"
        />
        {/* vein detail */}
        <path
          d="M4 44 C16 34, 28 20, 33 9 M4 54 C16 62, 28 76, 31 89"
          stroke="rgba(10,9,14,0.35)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );

  return (
    <div
      className={`butterfly ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      {wing('l')}
      {wing('r')}
      <span className="butterfly-body" style={{ height: size * 0.62 }} />
    </div>
  );
};

export default Butterfly;
