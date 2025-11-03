import styles from "./TitlePage.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocalStorage, useSessionStorage } from "../../helpers.ts";
import { AnimatePresence } from "framer-motion";
import { AppRoutes } from "../../constants/appRoutes.ts";

export function TitleMenu() {
  const [animationOn] = useLocalStorage<boolean>("animate", true);
  const [started] = useSessionStorage<boolean>("started", false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!started) navigate(AppRoutes.TitleMenu.SoundSetting.route);
  }, [started]);

  return (
    <div className={styles.MainPage}>
      <AnimatePresence mode={animationOn ? "wait" : "popLayout"}>
        <Outlet />
      </AnimatePresence>
    </div>
  );
}
