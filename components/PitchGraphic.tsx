export type PitchVariant =
  | "hero"
  | "build-up"
  | "transition"
  | "defense"
  | "attack"
  | "advantages"
  | "pocket";

type Point = [number, number];

type Scene = {
  team: Point[];
  opponents: Point[];
  ball: Point;
  passes: [Point, Point][];
  runs: [Point, Point][];
  highlight?: { x: number; y: number; w: number; h: number };
};

const SCENES: Record<PitchVariant, Scene> = {
  hero: {
    team: [[44, 200], [120, 120], [120, 200], [120, 280], [210, 160], [210, 240], [340, 60], [360, 150], [370, 250], [340, 340], [440, 200]],
    opponents: [[260, 110], [270, 200], [260, 290], [400, 120], [400, 280], [480, 160], [480, 240], [300, 160]],
    ball: [222, 160],
    passes: [[[222, 160], [352, 150]]],
    runs: [[[440, 200], [500, 140]], [[340, 340], [430, 320]]],
    highlight: { x: 310, y: 110, w: 90, h: 180 },
  },
  "build-up": {
    team: [[44, 200], [110, 110], [110, 290], [190, 200], [260, 80], [260, 320], [300, 160], [300, 240]],
    opponents: [[200, 130], [200, 270], [250, 200], [340, 120], [340, 280]],
    ball: [122, 110],
    passes: [[[122, 110], [190, 196]], [[190, 200], [300, 240]]],
    runs: [[[260, 320], [360, 340]]],
  },
  transition: {
    team: [[250, 210], [330, 120], [350, 290], [420, 200]],
    opponents: [[230, 160], [280, 260], [400, 140], [470, 230], [520, 190]],
    ball: [262, 210],
    passes: [[[262, 210], [340, 290]]],
    runs: [[[330, 120], [460, 100]], [[420, 200], [500, 280]]],
    highlight: { x: 300, y: 80, w: 220, h: 240 },
  },
  defense: {
    team: [[90, 120], [90, 200], [90, 280], [160, 150], [160, 250], [210, 200]],
    opponents: [[260, 200], [230, 90], [230, 310], [300, 150]],
    ball: [272, 200],
    passes: [],
    runs: [[[210, 200], [252, 196]], [[160, 150], [200, 120]]],
    highlight: { x: 120, y: 130, w: 100, h: 140 },
  },
  attack: {
    team: [[440, 120], [500, 200], [470, 280], [380, 200]],
    opponents: [[540, 170], [540, 240], [500, 140], [450, 220], [560, 200]],
    ball: [452, 120],
    passes: [[[452, 120], [500, 196]]],
    runs: [[[470, 280], [530, 260]], [[380, 200], [430, 180]]],
    highlight: { x: 490, y: 110, w: 90, h: 180 },
  },
  advantages: {
    team: [[260, 330], [340, 340], [320, 200], [400, 260]],
    opponents: [[330, 290], [380, 320], [360, 200]],
    ball: [272, 330],
    passes: [[[272, 330], [320, 210]]],
    runs: [[[340, 340], [460, 350]]],
  },
  pocket: {
    team: [[240, 200], [330, 200], [420, 130], [420, 270]],
    opponents: [[290, 140], [290, 260], [380, 150], [380, 250], [460, 200]],
    ball: [252, 200],
    passes: [[[252, 200], [326, 200]]],
    runs: [[[420, 130], [500, 110]]],
    highlight: { x: 300, y: 165, w: 70, h: 70 },
  },
};

type PitchGraphicProps = {
  variant?: PitchVariant;
  label?: string;
  className?: string;
};

export function PitchGraphic({ variant = "hero", label, className }: PitchGraphicProps) {
  const scene = SCENES[variant];
  const markerId = `pitch-arrow-${variant}`;

  return (
    <svg
      className={`pitch${className ? ` ${className}` : ""}`}
      viewBox="0 0 600 400"
      role="img"
      aria-label={label ?? "Tactical pitch diagram"}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" className="pitch__arrowhead" />
        </marker>
      </defs>

      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={20 + i * 93.33} y="20" width="93.33" height="360" className={i % 2 ? "pitch__stripe" : "pitch__stripe pitch__stripe--alt"} />
      ))}

      <g className="pitch__lines">
        <rect x="20" y="20" width="560" height="360" rx="2" />
        <line x1="300" y1="20" x2="300" y2="380" />
        <circle cx="300" cy="200" r="48" />
        <circle cx="300" cy="200" r="2.5" className="pitch__spot" />
        <rect x="20" y="110" width="90" height="180" />
        <rect x="490" y="110" width="90" height="180" />
        <rect x="20" y="160" width="34" height="80" />
        <rect x="546" y="160" width="34" height="80" />
      </g>

      {scene.highlight ? (
        <rect
          className="pitch__zone"
          x={scene.highlight.x}
          y={scene.highlight.y}
          width={scene.highlight.w}
          height={scene.highlight.h}
          rx="10"
        />
      ) : null}

      {scene.passes.map(([from, to], i) => (
        <line
          key={`p${i}`}
          className="pitch__pass"
          x1={from[0]}
          y1={from[1]}
          x2={to[0]}
          y2={to[1]}
          markerEnd={`url(#${markerId})`}
        />
      ))}
      {scene.runs.map(([from, to], i) => (
        <line
          key={`r${i}`}
          className="pitch__run"
          x1={from[0]}
          y1={from[1]}
          x2={to[0]}
          y2={to[1]}
          markerEnd={`url(#${markerId})`}
        />
      ))}

      {scene.opponents.map(([x, y], i) => (
        <circle key={`o${i}`} className="pitch__opponent" cx={x} cy={y} r="9" />
      ))}
      {scene.team.map(([x, y], i) => (
        <circle key={`t${i}`} className="pitch__player" cx={x} cy={y} r="10" />
      ))}
      <circle className="pitch__ball" cx={scene.ball[0]} cy={scene.ball[1]} r="5" />
    </svg>
  );
}
