import { useEffect, useState } from "react";
import styles from "./TitlePage.module.scss";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { useSessionStorage } from "helpers.ts";
import music from "assets/music/FireEmblem18_TrailerArrangement.mp3";
import { useAudio } from "components/Audio/MusicContextProvider.tsx";

export function TitleMenu() {
  const [animateIntro, setAnimateIntro] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [started] = useSessionStorage("started", false);
  const location = useLocation();
  const sounds = useAudio();

  useEffect(() => {
    if (started && location.pathname === "/title") {
      sounds.playAudio(music);
      setTimeout(() => setAnimateIntro(true), 4000);
    }
  }, [started, location]);

  return (
    <div
      className={clsx(styles.titleWrapper, showMenu && styles.showMenu)}
      onClick={() => setShowMenu(true)}
    >
      <svg className={styles.maskDefinitionSvg} width="0" height="0">
        <defs>
          <mask
            id="triangle-mask"
            maskUnits="objectBoundingBox"
            maskContentUnits="objectBoundingBox"
          >
            <polygon points="0,0 0.5,1 1,0" fill="white" />
          </mask>
        </defs>
      </svg>
      <div
        className={clsx(styles.titleBackground, animateIntro && styles.appear)}
      ></div>
      <div
        className={clsx(
          styles.titleBlurEffect,
          animateIntro && styles.centered,
          showMenu && styles.fillBackground,
        )}
      ></div>
      <div
        className={clsx(
          styles.titleContainer,
          animateIntro && styles.centered,
          showMenu && styles.leftTop,
        )}
      >
        <div className={styles.titleFE}>Fire Emblem</div>
        <div className={styles.titleArena}>Arena</div>
      </div>
    </div>
  );
}
