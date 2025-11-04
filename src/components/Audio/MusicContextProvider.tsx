import React, {
  createContext,
  type RefObject,
  useContext,
  useRef,
} from "react";
import { clamp } from "../math-utils";

type MusicAudioContextType = {
  playAudio: (src: string, currentTime?: number) => void;
  playDoubleAudio: (src1: string, src2: string) => void;
  pauseAudio: () => void;
  stopAudio: () => void;
  setVolume: (volume: number) => void;
};

type AudioState = {
  isPlaying: boolean;
  timeOut: number | undefined;
  srcString: string | null;
};

const maxVolume = 0.5;

const MusicAudioContext = createContext<MusicAudioContextType | undefined>(
  undefined,
);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef(new Audio());
  const audio2Ref = useRef(new Audio());
  const audioState = useRef<AudioState>({
    isPlaying: false,
    timeOut: undefined,
    srcString: null,
  });

  const fadeOut = (audio: HTMLAudioElement) => {
    if (audio.volume !== 0) {
      audio.volume = clamp(audio.volume - 0.01, 0, maxVolume);
      audioState.current.timeOut = setTimeout(fadeOut, 5, audio);
    }
  };

  const fadeIn = (audio: HTMLAudioElement) => {
    if (audio.volume !== maxVolume) {
      audio.volume = clamp(audio.volume + 0.01, 0, maxVolume);
      audioState.current.timeOut = setTimeout(fadeIn, 5, audio);
    }
  };

  const playTrack = (
    audioRef: RefObject<HTMLAudioElement>,
    src: string,
    startAt: number,
  ) => {
    if (!audioState.current.isPlaying) {
      audioState.current.isPlaying = true;
      audioRef.current.src = src;
      audioRef.current.volume = maxVolume;
      audioRef.current.loop = true;
      audioRef.current.load();
      audioRef.current.currentTime = startAt;
      audioRef.current.play();
    } else if (audioState.current.srcString !== src) {
      audioState.current.srcString = src;
      audioState.current.isPlaying = true;
      fadeOut(audioRef.current);
      setTimeout(() => {
        clearTimeout(audioState.current.timeOut);
        audioRef.current.src = src;
        audioRef.current.volume = maxVolume;
        audioRef.current.play();

        if (startAt !== 0) {
          audioRef.current.currentTime = startAt;
          audioRef.current.volume = 0;
          fadeIn(audioRef.current);
        }
      }, 1400);
    }
  };

  const playAudio = (src: string, startAt: number = 0) => {
    fadeOut(audio2Ref.current);
    playTrack(audioRef, src, startAt);
  };

  const playDoubleAudio = (src1: string, src2: string) => {
    audioState.current.isPlaying = false;
    playTrack(audioRef, src1, 0);
    audioState.current.isPlaying = false;
    playTrack(audio2Ref, src2, 0);
    setVolume(0);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const setVolume = (volume: number) => {
    audio2Ref.current.volume = volume;
    audioRef.current.volume = maxVolume - volume * maxVolume;
  };

  return (
    <MusicAudioContext.Provider
      value={{ playAudio, pauseAudio, stopAudio, setVolume, playDoubleAudio }}
    >
      {children}
    </MusicAudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(MusicAudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
