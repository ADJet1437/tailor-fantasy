/**
 * Iridescent chrome sphere, built from layered gradients rather than WebGL --
 * no dependency, no GPU context, and it scales cleanly on every display.
 */
const ChromeOrb = ({ className = '' }: { className?: string }) => (
  <div className={`relative ${className}`} aria-hidden="true">
    {/* conic sweep supplies the oil-slick colour shift */}
    <div
      className="animate-spin-slow absolute inset-0 rounded-full opacity-90"
      style={{
        background:
          'conic-gradient(from 210deg, #f472b6, #a78bfa, #67e8f9, #e4c694, #f472b6)',
        filter: 'blur(2px)',
      }}
    />
    {/* radial shading turns the flat disc into a sphere */}
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background:
          'radial-gradient(120% 120% at 30% 22%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.18) 18%, rgba(0,0,0,0.05) 42%, rgba(0,0,0,0.65) 78%, rgba(0,0,0,0.9) 100%)',
        mixBlendMode: 'overlay',
      }}
    />
    {/* specular highlight */}
    <div
      className="absolute rounded-full"
      style={{
        inset: '12% auto auto 18%',
        width: '26%',
        height: '18%',
        background:
          'radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,255,255,0))',
        filter: 'blur(3px)',
      }}
    />
    {/* contact shadow grounds it */}
    <div
      className="absolute -z-10 rounded-full"
      style={{
        inset: 'auto 8% -12% 8%',
        height: '22%',
        background: 'radial-gradient(closest-side, rgba(167,139,250,0.5), transparent)',
        filter: 'blur(22px)',
      }}
    />
  </div>
);

export default ChromeOrb;
