"use client";

import { useEffect, useRef, useState } from "react";

interface ChromaKeyVideoProps {
  src: string;
  className?: string;
  keyColor?: { r: number; g: number; b: number };
  threshold?: number;
  smoothing?: number;
}

export default function ChromaKeyVideo({
  src,
  className = "",
  keyColor = { r: 37, g: 157, b: 160 },
  threshold = 100,
  smoothing = 50,
}: ChromaKeyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;

    const processFrame = () => {
      if (video.paused || video.ended) {
        setIsProcessing(false);
        return;
      }

      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Euclidean distance in RGB space
        const diff = Math.sqrt(
          Math.pow(r - keyColor.r, 2) +
            Math.pow(g - keyColor.g, 2) +
            Math.pow(b - keyColor.b, 2)
        );

        if (diff < threshold) {
          data[i + 3] = 0;
        } else if (diff < threshold + smoothing) {
          data[i + 3] = Math.floor(((diff - threshold) / smoothing) * 255);
        }
      }

      ctx.putImageData(frame, 0, 0);
      animationFrameId = requestAnimationFrame(processFrame);
    };

    const handlePlay = () => {
      setIsProcessing(true);
      processFrame();
    };

    video.addEventListener("play", handlePlay);
    
    // Auto-play handling
    if (!video.paused) {
      handlePlay();
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      cancelAnimationFrame(animationFrameId);
    };
  }, [keyColor, threshold, smoothing]);

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="hidden"
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
}
