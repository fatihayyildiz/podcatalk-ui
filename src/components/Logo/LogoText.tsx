export default function PodcatalkText({ size = 20 }: { size?: number }) {
  const fontSize = size;
  
  return (
    <svg
      width={fontSize * 7}
      height={fontSize * 1.2}
      viewBox="0 0 700 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        
        <filter id="shadow">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      
      <style>
        {`
          .letter {
            fill: url(#blueGradient);
            stroke: #000000;
            stroke-width: 6;
            stroke-linejoin: round;
            stroke-linecap: round;
            filter: url(#shadow);
          }
          
          .letter-inner {
            fill: none;
            stroke: #000000;
            stroke-width: 3;
            stroke-linejoin: round;
            stroke-linecap: round;
            opacity: 0.3;
          }
        `}
      </style>
      
      {/* P */}
      <g transform="translate(0, 0)">
        <path
          className="letter"
          d="M 10 20 L 10 100 L 25 100 L 25 65 L 50 65 Q 68 65 68 50 Q 68 35 68 27.5 Q 68 20 50 20 Z M 25 30 L 45 30 Q 53 30 53 42.5 Q 53 55 45 55 L 25 55 Z"
        />
        <path
          className="letter-inner"
          d="M 17 25 L 17 95"
        />
      </g>
      
      {/* O */}
      <g transform="translate(75, 0)">
        <path
          className="letter"
          d="M 35 20 Q 8 20 8 60 Q 8 100 35 100 Q 62 100 62 60 Q 62 20 35 20 Z M 35 32 Q 48 32 48 60 Q 48 88 35 88 Q 22 88 22 60 Q 22 32 35 32 Z"
        />
        <path
          className="letter-inner"
          d="M 35 37 Q 43 37 43 60 Q 43 83 35 83"
        />
      </g>
      
      {/* D */}
      <g transform="translate(145, 0)">
        <path
          className="letter"
          d="M 10 20 L 10 100 L 35 100 Q 62 100 62 60 Q 62 20 35 20 Z M 25 30 L 35 30 Q 48 30 48 60 Q 48 90 35 90 L 25 90 Z"
        />
        <path
          className="letter-inner"
          d="M 17 25 L 17 95"
        />
      </g>
      
      {/* C */}
      <g transform="translate(215, 0)">
        <path
          className="letter"
          d="M 58 30 Q 50 20 35 20 Q 8 20 8 60 Q 8 100 35 100 Q 50 100 58 90 L 48 83 Q 42 88 35 88 Q 22 88 22 60 Q 22 32 35 32 Q 42 32 48 37 Z"
        />
        <path
          className="letter-inner"
          d="M 35 37 Q 43 37 43 48"
        />
      </g>
      
      {/* A */}
      <g transform="translate(280, 0)">
        <path
          className="letter"
          d="M 3 100 L 20 20 L 43 20 L 60 100 L 47 100 L 43 75 L 20 75 L 16 100 Z M 23 65 L 40 65 L 31.5 30 Z"
        />
        <path
          className="letter-inner"
          d="M 26 35 L 29 60"
        />
      </g>
      
      {/* T */}
      <g transform="translate(345, 0)">
        <path
          className="letter"
          d="M 3 20 L 3 32 L 24 32 L 24 100 L 39 100 L 39 32 L 60 32 L 60 20 Z"
        />
        <path
          className="letter-inner"
          d="M 31.5 37 L 31.5 95"
        />
      </g>
      
      {/* A */}
      <g transform="translate(410, 0)">
        <path
          className="letter"
          d="M 3 100 L 20 20 L 43 20 L 60 100 L 47 100 L 43 75 L 20 75 L 16 100 Z M 23 65 L 40 65 L 31.5 30 Z"
        />
        <path
          className="letter-inner"
          d="M 26 35 L 29 60"
        />
      </g>
      
      {/* L */}
      <g transform="translate(475, 0)">
        <path
          className="letter"
          d="M 10 20 L 10 100 L 55 100 L 55 88 L 25 88 L 25 20 Z"
        />
        <path
          className="letter-inner"
          d="M 17 25 L 17 93"
        />
      </g>
      
      {/* K */}
      <g transform="translate(540, 0)">
        <path
          className="letter"
          d="M 10 20 L 10 100 L 25 100 L 25 67 L 32 58 L 52 100 L 68 100 L 42 52 L 66 20 L 50 20 L 25 48 L 25 20 Z"
        />
        <path
          className="letter-inner"
          d="M 17 25 L 17 95"
        />
      </g>
    </svg>
  );
}