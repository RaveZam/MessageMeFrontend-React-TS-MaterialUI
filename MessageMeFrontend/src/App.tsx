import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Mainpage from "./Pages/Mainpage";
import ChatIcon from "@mui/icons-material/Chat";
import {
  AppProvider,
  Router as MUIRouter,
  Session,
  type Navigation,
} from "@toolpad/core/AppProvider";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ArchiveIcon from "@mui/icons-material/Archive";
import Signinpage from "./Pages/Signinpage";
import * as React from "react";

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
const currentSession = {
  user: {
    name: "Example User",
    email: "runielle04@gmail.com",
    image: null,
  },
};

export default function App() {
  const [session, setSession] = React.useState<Session | null>(currentSession);
  const [pathname, setPathname] = React.useState("/dashboard");

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(currentSession);
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

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
        session={session}
        branding={{
          title: "MessageMe",
          logo: <BiSolidMessageRoundedDetail className="mx-2 my-3 scale-[2]" />,
        }}
      >
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/Signin" element={<Signinpage />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}
