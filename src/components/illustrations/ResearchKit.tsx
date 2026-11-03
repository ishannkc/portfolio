interface ResearchKitProps {
  className?: string;
}

export function ResearchKitIllustration({ className }: ResearchKitProps) {
  return (
    <svg
      aria-labelledby="research-kit-title"
      className={className}
      fill="none"
      role="img"
      viewBox="0 0 140 130"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="research-kit-title">
        Acoustic horn and touchpoint diagram representing the HCI field kit
      </title>
      <circle
        cx="70"
        cy="65"
        r="58"
        stroke="#B8923A"
        strokeDasharray="3 3"
        strokeWidth="1"
      />
      <path
        d="M25 35 Q 50 42 75 30 L 75 60 Q 50 48 25 55 Z"
        fill="#FAF0DC"
        stroke="#3B2A20"
        strokeWidth="2"
      />
      <ellipse
        cx="25"
        cy="45"
        fill="#EFE1C3"
        rx="5"
        ry="10"
        stroke="#3B2A20"
        strokeWidth="1.8"
      />
      <path
        d="M85 35 Q 92 45 85 55"
        stroke="#800020"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M93 30 Q 103 45 93 60"
        stroke="#800020"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <path
        d="M101 25 Q 114 45 101 65"
        stroke="#800020"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <circle
        cx="70"
        cy="95"
        fill="#FAF0DC"
        r="14"
        stroke="#3B2A20"
        strokeWidth="2"
      />
      <circle cx="70" cy="95" fill="#800020" r="4" />
      <line
        stroke="#3B2A20"
        strokeWidth="1.5"
        x1="50"
        x2="62"
        y1="95"
        y2="95"
      />
      <line
        stroke="#3B2A20"
        strokeWidth="1.5"
        x1="78"
        x2="90"
        y1="95"
        y2="95"
      />
      <line
        stroke="#3B2A20"
        strokeWidth="1.5"
        x1="70"
        x2="70"
        y1="75"
        y2="87"
      />
      <line
        stroke="#3B2A20"
        strokeWidth="1.5"
        x1="70"
        x2="70"
        y1="103"
        y2="115"
      />
    </svg>
  );
}
