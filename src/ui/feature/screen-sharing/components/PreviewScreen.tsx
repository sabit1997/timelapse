import type { Source } from "./ScreenSharing";

interface PreviewScreenProps {
  source: Source;
  onSelect: (source: { id: string; name: string }) => void;
}

export const PreviewScreen = ({ source, onSelect }: PreviewScreenProps) => {
  return (
    <div
      className="w-full aspect-video border-2 border-green relative group cursor-pointer"
      onClick={() => onSelect({ id: source.id, name: source.name })}
    >
      <img
        src={source.thumbnail}
        alt={source.name}
        className="h-full mx-auto"
      />

      <span className="hidden absolute top-1/2 left-1/2 translate-[-50%]  text-black bg-green  group-hover:block text-[clamp(10px,2cqi,14px)] px-[1.2cqi] py-[0.6cqi] opacity-80">
        화면 선택
      </span>
      <p className="absolute bottom-0 left-0 w-full overflow-hidden bg-green px-2 text-[clamp(9px,2cqi,12px)] text-black opacity-80 whitespace-nowrap text-ellipsis">
        {source.name}
      </p>
    </div>
  );
};
