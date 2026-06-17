'use client'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

type Props = {
  value: {
    forehand: number;
    backhand: number;
    serve: number;
    footwork: number;
    fitness: number;
    mental: number;
  };
  onChange: (v: Props["value"]) => void;
};

const keys = [
  "forehand",
  "backhand",
  "serve",
  "footwork",
  "fitness",
  "mental",
] as const;

export default function SkillRadarEditor({
  value,
}: Props) {
  const data = keys.map((k) => ({
    skill: k,
    value: value[k],
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <PolarRadiusAxis domain={[0, 100]} />

          <Radar
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
