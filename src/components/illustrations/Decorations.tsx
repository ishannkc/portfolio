export function CoffeeRing({
  className,
  size = 220,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div aria-hidden="true" className={className}>
      <svg fill="none" height={size} viewBox="0 0 200 200" width={size}>
        <circle
          cx="100"
          cy="100"
          opacity="0.6"
          r="75"
          stroke="#9A7B56"
          strokeDasharray="10 6 30 4"
          strokeWidth="4"
        />
        <circle
          cx="100"
          cy="100"
          opacity="0.4"
          r="70"
          stroke="#8C6D48"
          strokeWidth="1.5"
        />
        <circle
          cx="103"
          cy="98"
          opacity="0.3"
          r="65"
          stroke="#9A7B56"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}

export function ContactCoffeeRing({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <svg fill="none" height="180" viewBox="0 0 160 160" width="180">
        <circle
          cx="80"
          cy="80"
          opacity="0.6"
          r="60"
          stroke="#9A7B56"
          strokeDasharray="12 4 20 6"
          strokeWidth="3"
        />
        <circle
          cx="80"
          cy="80"
          opacity="0.4"
          r="56"
          stroke="#8C6D48"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

export function WingQuill({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 40 24"
      width="40"
    >
      <path
        d="M2 12 L 38 2 L 24 22 L 18 14 L 2 12 Z"
        fill="#800020"
        stroke="#3B2A20"
        strokeWidth="1.8"
      />
      <path d="M18 14 L 38 2" stroke="#3B2A20" strokeWidth="1.8" />
    </svg>
  );
}

export function Ornithopter({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <svg
        fill="none"
        height="90"
        stroke="#3B2A20"
        strokeWidth="1.2"
        viewBox="0 0 140 90"
        width="140"
      >
        <path
          d="M10 50 Q 50 15 130 25 Q 90 60 70 75 Q 40 65 10 50 Z"
          fill="none"
        />
        <path d="M70 75 L 35 32" />
        <path d="M70 75 L 55 24" />
        <path d="M70 75 L 75 22" />
        <path d="M70 75 L 98 23" />
        <path d="M70 75 L 118 26" />
        <circle cx="70" cy="75" r="4" />
        <line strokeDasharray="2 2" x1="70" x2="70" y1="75" y2="88" />
        <circle cx="70" cy="88" r="2" />
      </svg>
    </div>
  );
}

export function Astrolabe({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <svg
        fill="none"
        height="80"
        stroke="#3B2A20"
        strokeWidth="1.2"
        viewBox="0 0 80 80"
        width="80"
      >
        <circle cx="40" cy="40" r="32" />
        <ellipse
          cx="40"
          cy="40"
          rx="32"
          ry="12"
          strokeDasharray="3 2"
        />
        <ellipse
          cx="40"
          cy="40"
          rx="12"
          ry="32"
          strokeDasharray="3 2"
        />
        <line x1="8" x2="72" y1="40" y2="40" />
        <line x1="40" x2="40" y1="8" y2="72" />
        <circle cx="40" cy="40" fill="#B8923A" r="2" />
      </svg>
    </div>
  );
}
