import styles from "./MainPage.module.scss";
import { useLocalStorage } from "../../helpers.ts";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../common/constants/appRoutes.ts";
import { useEffect } from "react";

export function MainPage() {
  const [isAuthenticated] = useLocalStorage<boolean>("authToken", false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate(AppRoutes.TitleMenu.SoundSetting.route);
  }, [isAuthenticated]);

  return <div className={styles.MainPage}></div>;
}
