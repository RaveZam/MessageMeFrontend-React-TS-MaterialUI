import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ArchiveIcon from "@mui/icons-material/Archive";

ChatIcon;
import ChatIcon from "@mui/icons-material/Chat";
import CredentialsSignInPage from "./Components/CredentialsSignInPage";

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

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        // Small width on extra small screens, larger width on small and up
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

export default function App() {
  const router = useDemoRouter("/page");

  return (
    <>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        branding={{
          title: "MessageMe",
          logo: <BiSolidMessageRoundedDetail className="mt-3 scale-150" />,
        }}
      >
        <DashboardLayout sidebarExpandedWidth={300} defaultSidebarCollapsed>
          {/* <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799181496!2d-74.25987571760744!3d40.69767006358627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18b60165%3A0x8b621f8a7a7d28a4!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1633452834502!5m2!1sen!2s"
            style={{ flex: 1, border: 0 }}
            allowFullScreen
            loading="lazy"
          /> */}
          <DemoPageContent pathname={router.pathname} />
          <CredentialsSignInPage />
        </DashboardLayout>
      </AppProvider>
    </>
  );
}
