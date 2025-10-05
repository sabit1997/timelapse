import { useEffect, useState } from "react";
import { PreviewScreen } from "./PreviewScreen";

declare global {
  interface Window {
    electronAPI: {
      getSources: () => Promise<Source[]>;
    };
  }
}

export interface Source {
  id: string;
  name: string;
  thumbnail: string;
}

interface ScreenSharingProps {
  onSelectSource: (source: { id: string; name: string }) => void;
}

export const ScreenSharing = ({ onSelectSource }: ScreenSharingProps) => {
  const [sources, setSources] = useState<Source[]>([]);
  const [sourceType, setSourceType] = useState<"screen" | "window">("screen");

  console.log(sources);

  useEffect(() => {
    const loadSources = async () => {
      const availableSources = await window.electronAPI.getSources();
      setSources(availableSources);
    };
    loadSources();
  }, []);

  const filteredSources = sources.filter((s) => s.id.startsWith(sourceType));

  const buttonOptions = [
    { id: "screen", label: "화면" },
    { id: "window", label: "윈도우" },
  ];

  return (
    <div className="w-full mb-3">
      <h2>녹화 화면 선택</h2>
      <div className="flex gap-4 justify-center mb-4">
        {buttonOptions.map((option) => (
          <button
            key={option.id}
            className={`transition-colors ${
              sourceType === option.id ? "bg-green text-black" : "text-green"
            }`}
            onClick={() => setSourceType(option.id as "screen" | "window")}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="w-full h-[40vh] overflow-y-auto grid grid-cols-3 gap-3">
        {filteredSources.map((source) => (
          <PreviewScreen
            key={source.id}
            source={source}
            onSelect={onSelectSource}
          />
        ))}
      </div>
    </div>
  );
};
