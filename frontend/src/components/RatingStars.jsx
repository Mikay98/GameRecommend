// RatingStars.jsx — displays star rating

export default function RatingStars({ rating, size = 'sm' }) {
  const full  = Math.floor(rating / 2);
  const half  = rating / 2 - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const sz    = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <span className={`inline-flex items-center gap-0.5 ${sz} text-accent-amber`}>
      {'★'.repeat(full)}
      {half && '½'}
      <span className="text-text-dim">{'★'.repeat(empty)}</span>
    </span>
  );
}
