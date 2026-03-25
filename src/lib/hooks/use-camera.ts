'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

interface CameraState {
  readonly isActive: boolean;
  readonly error: string | null;
}

interface UseCameraReturn {
  readonly videoRef: React.RefObject<HTMLVideoElement | null>;
  readonly isActive: boolean;
  readonly error: string | null;
  readonly start: () => Promise<void>;
  readonly stop: () => void;
  readonly capture: () => string | null;
}

export function useCamera(): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [state, setState] = useState<CameraState>({
    isActive: false,
    error: null,
  });

  const stop = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setState({ isActive: false, error: null });
  }, []);

  const start = useCallback(async () => {
    try {
      setState({ isActive: false, error: null });

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setState({ isActive: true, error: null });
    } catch (err) {
      const message = err instanceof Error
        ? err.message
        : 'Camera access denied';
      setState({ isActive: false, error: message });
    }
  }, []);

  const capture = useCallback((): string | null => {
    const video = videoRef.current;
    if (!video || !state.isActive) return null;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.85);
  }, [state.isActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    videoRef,
    isActive: state.isActive,
    error: state.error,
    start,
    stop,
    capture,
  };
}
