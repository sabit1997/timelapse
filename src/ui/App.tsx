import { IoMdSettings } from "react-icons/io";
import { ScreenSharing } from "./feature/screen-sharing/components/ScreenSharing";
import { useState } from "react";

function App() {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedSource, setSelectedSource] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleSourceSelect = (source: { id: string; name: string }) => {
    setSelectedSource({ id: source.id, name: source.name });
    setIsSelecting(false);
  };

  const handleCancel = () => {
    setIsSelecting(false);
    setSelectedSource(null);
  };

  const handleSelectAgain = () => {
    setIsSelecting(true);
    setSelectedSource(null);
  };

  return (
    <div className="font-display flex flex-col justify-center items-center bg-black h-screen text-green">
      <h1 className="text-2xl mb-4">타임랩스</h1>
      <button className="absolute top-10 right-5 flex items-center gap-2">
        <IoMdSettings />
        <p>설정</p>
      </button>
      <div className="w-[80vw] h-[70vh]">
        {isSelecting ? (
          <>
            <ScreenSharing onSelectSource={handleSourceSelect} />
            <button onClick={handleCancel}>취소</button>
          </>
        ) : (
          <div>
            {!selectedSource && (
              <button onClick={() => setIsSelecting(true)}>화면 선택</button>
            )}
            {selectedSource && (
              <div className="text-center">
                <p className="mb-4">선택된 화면: {selectedSource.name}</p>
                <button onClick={handleSelectAgain}>다시 선택</button>
                <button>녹화 시작</button>
                <button>녹화 중지</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
