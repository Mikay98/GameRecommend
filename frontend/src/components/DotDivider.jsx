// DotDivider.jsx — row of dots separating sections

export default function DotDivider({ count = 40, className = '' }) {
  return (
    <div className={`flex gap-1.5 justify-center ${className}`}>
      {[...Array(count)].map((_, i) => (
        <span key={i} className="w-1 h-1 rounded-full bg-border-default" />
      ))}
    </div>
  );
}
