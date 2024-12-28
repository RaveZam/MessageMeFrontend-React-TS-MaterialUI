import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./Pages/Mainpage";
import ChatIcon from "@mui/icons-material/Chat";
import {
  AppProvider,
  Router as MUIRouter,
  type Navigation,
} from "@toolpad/core/AppProvider";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ArchiveIcon from "@mui/icons-material/Archive";
import Signinpage from "./Pages/Signinpage";
import * as React from "react";

import useSession from "./Hooks/useSession";

const NAVIGATION: Navigation = [
  // {
  //   kind: "header",
  //   title: "Main items",
  // },
  {
    segment: "Chats",
    title: "Chats",
    icon: <ChatIcon />,
  },

  {
    segment: "Shop",
    title: "Shop",
    icon: <LocalMallIcon />,
  },
  {
    segment: "Archive",
    title: "Archive",
    icon: <ArchiveIcon />,
  },
  {
    segment: "Requests",
    title: "Requests",
    icon: <MarkUnreadChatAltIcon />,
  },
  {
    kind: "divider",
  },
];

export default function App() {
  const [pathname, setPathname] = React.useState("/dashboard");
  const [currentSession, setcurrentSession] = React.useState<{
    user: {
      name: string;
      email: string;
      image: null;
    };
  }>({
    user: {
      name: "",
      email: "",
      image: null,
    },
  });

  const storeSession = (decoded: { email: string; username: string }): void => {
    setcurrentSession({
      user: {
        name: decoded.username,
        email: decoded.email,
        image: null,
      },
    });
    authentication.signIn();
  };

  useSession(storeSession);

  const authentication = {
    signIn: () => {
      console.log("Signin");
    },
    signOut: () => {
      localStorage.removeItem("token");
      setcurrentSession({
        user: {
          name: "",
          email: "",
          image: null,
        },
      });
    },
  };

  const router = React.useMemo<MUIRouter>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    <Router>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        authentication={authentication}
        session={currentSession}
        branding={{
          title: "MessageMe",
          logo: <BiSolidMessageRoundedDetail className="mx-2 my-3 scale-[2]" />,
        }}
      >
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/SignIn" element={<Signinpage />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}
