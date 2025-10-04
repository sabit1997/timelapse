function App() {
  return (
    <div className="font-display flex flex-col justify-center items-center bg-black h-screen text-green">
      <h1>Timelapse</h1>
      <button>설정</button>
      <div className="w-[80vw] h-[70vh]">
        <h2>녹화 화면 선택</h2>
        <button>화면</button>
        <button>윈도우</button>
        <button>녹화 시작</button>
        <button>녹화 중지</button>
      </div>
    </div>
  );
}

export default App;
