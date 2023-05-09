import { useEffect, useState } from "react";

function App() {
  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [positionDelta, setPositionDelta] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!pressed) return;

      setPosition({
        x: e.x - positionDelta.x,
        y: e.y - positionDelta.y,
      });
    };

    if (pressed) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (pressed) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [pressed, positionDelta]);

  const handleMouseDown = (e) => {
    setPositionDelta({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    setPressed(true);
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    setPressed(false);
  };

  return (
    <div
      style={{
        backgroundColor: pressed ? "red" : "lightblue",
        cursor: pressed ? "cursor" : "default",
        height: "50px",
        left: position.x,
        position: "absolute",
        top: position.y,
        width: "50px",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    ></div>
  );
}

export default App;
