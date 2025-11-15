import styles from "./TitlePage.module.scss";
import { Outlet, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocalStorage, useSessionStorage } from "../../helpers.ts";
import { AnimatePresence } from "framer-motion";
import { AppRoutes } from "common/constants/appRoutes.ts";

export function TitlePage() {
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
