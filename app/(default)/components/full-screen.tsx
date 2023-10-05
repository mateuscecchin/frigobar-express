"use client";

import { useState } from "react";

export function FullScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  function handleClick() {
    document.getElementById("fullscreen")?.requestFullscreen();
    setIsFullScreen(true);
  }

  if (isFullScreen) return <></>;
  return (
    <button className="text-red-500 underline my-4" onClick={handleClick}>
      Full screen mode
    </button>
  );
}
