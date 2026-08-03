"use client";
import React, { useRef, useState, useEffect } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<string>("Connecting to camera...");

  useEffect(() => {
    async function startCam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true, // Sabse safe default jo webcamtests.com par chala tha
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setStatus("Camera Live & Running!");
        }
      } catch (err: any) {
        setStatus("Error: " + err.message);
      }
    }

    startCam();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-2 text-blue-400">AI Context Observer</h1>
      <p className="mb-4 text-green-400 font-mono text-sm">{status}</p>

      {/* Yahan red border diya hai taaki video box saaf dikhe, aur height fix ki hai */}
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-red-500 bg-black">
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </main>
  );
}