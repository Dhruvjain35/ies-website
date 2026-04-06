"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface Chapter {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number];
}

interface WorldMapProps {
  chapters: Chapter[];
  activeId: string | null;
  onHover: (chapter: Chapter | null) => void;
}

export default function WorldMap({ chapters, activeId, onHover }: WorldMapProps) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 130,
        center: [20, 25],
      }}
      width={900}
      height={450}
      style={{ width: "100%", height: "auto", background: "#111111" }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }: { geographies: any[] }) =>
          geographies.map((geo: any) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#1a1a1a"
              stroke="#2A2A2A"
              strokeWidth={0.5}
              style={{
                default: { outline: "none" },
                hover: { fill: "#222222", outline: "none" },
                pressed: { outline: "none" },
              }}
            />
          ))
        }
      </Geographies>

      {chapters.map((chapter) => (
        <Marker
          key={chapter.id}
          coordinates={chapter.coordinates}
          onMouseEnter={() => onHover(chapter)}
          onMouseLeave={() => onHover(null)}
        >
          <circle
            r={activeId === chapter.id ? 6 : 4}
            fill="#C5A059"
            opacity={activeId === chapter.id ? 1 : 0.8}
            style={{ cursor: "pointer", transition: "all 150ms" }}
          />
          {activeId === chapter.id && (
            <circle
              r={10}
              fill="none"
              stroke="#C5A059"
              strokeWidth={1}
              opacity={0.4}
            />
          )}
        </Marker>
      ))}
    </ComposableMap>
  );
}
