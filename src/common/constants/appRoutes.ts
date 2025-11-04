import { createRoute } from "react-router-url-params";

export const AppRoutes = {
  TitleMenu: {
    SoundSetting: createRoute("/title/sound-setting"),
    Title: createRoute("/title"),
    Intro: createRoute("/title/intro"),
  },
  MainMenu: createRoute("/"),
  ErrorPages: {
    NotFound: createRoute("not-found"),
  },
};
