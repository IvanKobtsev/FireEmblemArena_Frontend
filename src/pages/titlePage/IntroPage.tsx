import { useEffect, useState } from "react";
import styles from "pages/titlePage/TitlePage.module.scss";
import Logo from "assets/img/lunatic-games-logo.png";
import { Image } from "../../components/Image/Image.tsx";
import { AnimatePresence } from "framer-motion";
import { FadingComponentWrapper } from "../PageWrappers.tsx";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../common/constants/appRoutes.ts";

export function IntroPage() {
  const [displayText, setDisplayText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setDisplayText(true), 2000);
    setTimeout(() => navigate(AppRoutes.TitleMenu.Title.route), 4000);
  }, []);

  return (
    <div>
      <AnimatePresence mode={"wait"}>
        {displayText ? (
          <FadingComponentWrapper key={0}>
            <div className={styles.made}>Present</div>
          </FadingComponentWrapper>
        ) : (
          <FadingComponentWrapper key={1}>
            <Image src={Logo} className={styles.Logo} />
          </FadingComponentWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}
