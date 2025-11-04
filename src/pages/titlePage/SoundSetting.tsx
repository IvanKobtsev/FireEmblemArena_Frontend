import { Button } from "../../components/Button/Button";
import styles from "./TitlePage.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../common/constants/appRoutes.ts";
import { useSessionStorage } from "../../helpers.ts";
import { playSound } from "../../components/Audio/audioHelpers.ts";
import OptionAccepted from "assets/sounds/menu/OptionAccepted.wav";

export function SoundSetting() {
  const [choice, setChoice] = useState<string | null>(null);
  const navigate = useNavigate();
  const [, setStarted] = useSessionStorage<boolean>("started", false);

  useEffect(() => {
    if (choice) {
      if (choice === "Yes") playSound(OptionAccepted);
      setStarted(true);
      setTimeout(() => navigate(AppRoutes.TitleMenu.Intro.route), 1000);
    }
  }, [choice, navigate, setStarted]);

  return (
    <div className={styles.soundSetting}>
      <div className={styles.mainMessage}>
        This game has music and sound effects.
        <br />
        Do you want to play with audio ON?
      </div>
      <div className={styles.subMessage}>
        (it can be changed later in the settings)
      </div>
      <div className={styles.choiceButtons}>
        <Button
          title={"Yes"}
          disabled={!!choice && choice !== "Yes"}
          onClick={() => {
            setChoice("Yes");
          }}
        />
        <Button
          title={"No, turn it off"}
          disabled={!!choice && choice !== "No"}
          onClick={() => {
            setChoice("No");
          }}
        />
      </div>
    </div>
  );
}
