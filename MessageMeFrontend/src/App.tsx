import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Mainpage from "./Pages/Mainpage";
import CredentialsSignInPage from "./Components/CredentialsSignInPage";
import ChatIcon from "@mui/icons-material/Chat";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useDemoRouter } from "@toolpad/core/internal";
import { Box } from "@mui/material";

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
  const router = useDemoRouter("/page");
  return (
    <Router>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        branding={{
          title: "MessageMe",

          logo: <BiSolidMessageRoundedDetail className="mx-2 my-3 scale-[2]" />,
        }}
      >
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/Signin" element={<CredentialsSignInPage />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}
