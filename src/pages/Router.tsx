import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "../constants/appRoutes.ts";
import { TitleMenu } from "./titlePage/TitleMenu.tsx";
import { FadingPageWrapper } from "./PageWrappers";
import { MainPage } from "./mainPage/MainPage.tsx";
import { SoundSetting } from "./titlePage/SoundSetting.tsx";

export const Routes = () =>
  createBrowserRouter([
    {
      path: AppRoutes.TitleMenu.Title.route,
      element: (
        <FadingPageWrapper>
          <TitleMenu />
        </FadingPageWrapper>
      ),
    },
    {
      path: AppRoutes.TitleMenu.SoundSetting.route,
      element: (
        <FadingPageWrapper>
          <SoundSetting />
        </FadingPageWrapper>
      ),
    },
    {
      path: AppRoutes.TitleMenu.Intro.route,
      element: (
        <FadingPageWrapper>
          <div>Made by Lunatic Games</div>
        </FadingPageWrapper>
      ),
    },
    {
      path: AppRoutes.TitleMenu.Title.route,
      element: <FadingPageWrapper>Title</FadingPageWrapper>,
    },
    {
      path: AppRoutes.MainMenu.route,
      element: <MainPage />,
    },
  ]);
