export function MarqueeBanner() {
  const items = [
    'Terp Totz',
    'Season 1',
    'Live Now',
    'Limonene Larry',
    'Myrcene Mike',
    'Pinene Pete',
    'Linalool Luna',
    'Limited Drops',
    'Collect Them All',
    'Terp Totz',
    'Season 1',
    'Live Now',
    'Limonene Larry',
    'Myrcene Mike',
    'Pinene Pete',
    'Linalool Luna',
    'Limited Drops',
    'Collect Them All',
  ]

  return (
    <div className="overflow-hidden bg-accent py-3 border-y border-accent">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 mx-5 text-[10px] font-mono tracking-[0.25em] uppercase text-accent-foreground font-bold"
          >
            {item}
            <span className="opacity-60">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
