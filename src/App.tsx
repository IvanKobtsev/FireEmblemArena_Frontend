import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocalStorage } from "./helpers.ts";
import { AppRoutes } from "./common/constants/appRoutes.ts";
import { TitleMenu } from "./pages/titlePage/TitleMenu.tsx";
import { FadingPageWrapper } from "./pages/PageWrappers.tsx";
import { SoundSetting } from "./pages/titlePage/SoundSetting.tsx";
import { MainPage } from "./pages/mainPage/MainPage.tsx";
import { IntroPage } from "./pages/titlePage/IntroPage.tsx";

export function App() {
  const [animationOn] = useLocalStorage<boolean>("animate", true);
  const location = useLocation();

  return (
    <AnimatePresence mode={animationOn ? "wait" : "popLayout"}>
      <Routes location={location} key={location.pathname}>
        <Route
          path={AppRoutes.TitleMenu.Title.route}
          element={
            <FadingPageWrapper>
              <TitleMenu />
            </FadingPageWrapper>
          }
          children={
            <>
              <Route
                path={AppRoutes.TitleMenu.SoundSetting.route}
                element={
                  <FadingPageWrapper>
                    <SoundSetting />
                  </FadingPageWrapper>
                }
              />
              <Route
                path={AppRoutes.TitleMenu.Intro.route}
                element={
                  <FadingPageWrapper>
                    <IntroPage />
                  </FadingPageWrapper>
                }
              />
              <Route
                path={AppRoutes.TitleMenu.Title.route}
                element={<FadingPageWrapper>Title</FadingPageWrapper>}
              />
            </>
          }
        />
        <Route path={AppRoutes.MainMenu.route} element={<MainPage />} />
      </Routes>
    </AnimatePresence>
  );
}
