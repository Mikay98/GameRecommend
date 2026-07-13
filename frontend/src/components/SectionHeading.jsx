// SectionHeading.jsx — Section heading with // marker prefix

export default function SectionHeading({ marker = 'coral', label, subtitle, className = '' }) {
  const markerColor = {
    coral: 'text-accent-coral',
    amber: 'text-accent-amber',
    sky:   'text-accent-sky',
  }[marker] ?? 'text-accent-coral';

  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="font-display text-2xl font-semibold text-text-primary flex items-center gap-3">
        <span className={`font-display text-sm tracking-widest ${markerColor}`}>//</span>
        {label}
      </h2>
      {subtitle && (
        <p className="mt-1.5 text-sm text-text-secondary ml-8">{subtitle}</p>
      )}
    </div>
  );
}
