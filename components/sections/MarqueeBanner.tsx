export function MarqueeBanner() {
  const row1 = [
    'Season 1 Live', '★', 'Limonene Larry', '★', 'Myrcene Mike', '★',
    'Pinene Pete', '★', 'Linalool Luna', '★', 'Caryophyllene Carl', '★',
    'Limited Drops', '★', 'No Restocks', '★', 'Collect Them All', '★',
    'Season 1 Live', '★', 'Limonene Larry', '★', 'Myrcene Mike', '★',
    'Pinene Pete', '★', 'Linalool Luna', '★', 'Caryophyllene Carl', '★',
    'Limited Drops', '★', 'No Restocks', '★', 'Collect Them All', '★',
  ]

  const row2 = [
    'Terp Totz Universe', '◆', 'Terpene Science', '◆', 'Streetwear Drops', '◆',
    'Season 2 Loading', '◆', 'Collector Culture', '◆', 'St. Louis Built', '◆',
    'T-Shirts · Hoodies · Accessories', '◆', 'Characters Are the Brand', '◆',
    'Terp Totz Universe', '◆', 'Terpene Science', '◆', 'Streetwear Drops', '◆',
    'Season 2 Loading', '◆', 'Collector Culture', '◆', 'St. Louis Built', '◆',
    'T-Shirts · Hoodies · Accessories', '◆', 'Characters Are the Brand', '◆',
  ]

  return (
    <div className="border-y border-border overflow-hidden select-none">
      {/* Row 1 — orange, left to right */}
      <div className="bg-accent py-2.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {row1.map((item, i) => (
            <span
              key={i}
              className={
                item === '★'
                  ? 'mx-4 text-accent-foreground/50 text-xs'
                  : 'mx-3 text-[10px] font-mono tracking-[0.22em] uppercase text-accent-foreground font-bold'
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — dark bg, right to left */}
      <div className="bg-card py-2.5 overflow-hidden">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {row2.map((item, i) => (
            <span
              key={i}
              className={
                item === '◆'
                  ? 'mx-4 text-primary/40 text-[8px]'
                  : 'mx-3 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground'
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
