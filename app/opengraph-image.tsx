import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Terp Totz — Terpene Characters. Limited Drops.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '64px 72px',
          background: '#0A0A0A',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Purple ambient top-left */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -80,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(74,29,138,0.4) 0%, transparent 70%)',
          }}
        />
        {/* Orange ambient bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            right: -60,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,93,4,0.3) 0%, transparent 70%)',
          }}
        />

        {/* Season badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 24,
            padding: '6px 14px',
            border: '1px solid rgba(232,93,4,0.4)',
            background: 'rgba(232,93,4,0.1)',
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#E85D04' }} />
          <span style={{ fontSize: 11, letterSpacing: '0.25em', color: '#E85D04', textTransform: 'uppercase' }}>
            Season 1 — Live Now
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#F5EFE6',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            marginBottom: 28,
          }}
        >
          TERP TOTZ
        </div>

        {/* Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {['5 Characters', 'Season 01', 'Limited Drops'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {i > 0 && (
                <div style={{ width: 1, height: 14, background: 'rgba(245,239,230,0.2)' }} />
              )}
              <span style={{ fontSize: 13, color: 'rgba(245,239,230,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
