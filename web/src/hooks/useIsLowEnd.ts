"use client";
import { useEffect, useState } from "react";

/** Returns true if the device is considered low-end and is a mobile device. */
export function useIsLowEnd(): boolean {
  const [lowEnd, setLowEnd] = useState(false);
  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency ?? 8;
    setLowEnd(isMobile && cores <= 4);
  }, []);
  return lowEnd;
}

/** Returns false immediately if WebGL is not available at all. */
export function useWebGLAvailable(): boolean {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) setOk(false);
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}
