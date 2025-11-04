import { useEffect } from "react";
import styles from "pages/titlePage/TitlePage.module.scss";
import Logo from "assets/img/lunatic-games-logo.png";
import { Image } from "../../components/Image/Image.tsx";

export function IntroPage() {
  useEffect(() => {}, []);

  return (
    <div>
      <Image src={Logo} className={styles.Logo} />
      {/*<div className={styles.made}>Made by Lunatic Games</div>*/}
    </div>
  );
}
