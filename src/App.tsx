import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocalStorage } from "./helpers.ts";
import { AppRoutes } from "./common/constants/appRoutes.ts";
import { TitlePage } from "./pages/titlePage/TitlePage.tsx";
import { FadingComponentWrapper } from "./pages/PageWrappers.tsx";
import { SoundSetting } from "./pages/titlePage/SoundSetting.tsx";
import { MainPage } from "./pages/mainPage/MainPage.tsx";
import { IntroPage } from "./pages/titlePage/IntroPage.tsx";
import { TitleMenu } from "./pages/titlePage/TitleMenu.tsx";

export function App() {
  const [animationOn] = useLocalStorage<boolean>("animate", true);
  const location = useLocation();

  return (
    <AnimatePresence mode={animationOn ? "wait" : "popLayout"}>
      <Routes location={location} key={location.pathname}>
        <Route
          path={AppRoutes.TitleMenu.Title.route}
          element={
            <FadingComponentWrapper>
              <TitlePage />
            </FadingComponentWrapper>
          }
          children={
            <>
              <Route
                path={AppRoutes.TitleMenu.SoundSetting.route}
                element={
                  <FadingComponentWrapper>
                    <SoundSetting />
                  </FadingComponentWrapper>
                }
              />
              <Route
                path={AppRoutes.TitleMenu.Intro.route}
                element={
                  <FadingComponentWrapper>
                    <IntroPage />
                  </FadingComponentWrapper>
                }
              />
              <Route
                path={AppRoutes.TitleMenu.Title.route}
                element={
                  <FadingComponentWrapper fadeDurationSec={4}>
                    <TitleMenu />
                  </FadingComponentWrapper>
                }
              />
            </>
          }
        />
        <Route path={AppRoutes.MainMenu.route} element={<MainPage />} />
      </Routes>
    </AnimatePresence>
  );
}
