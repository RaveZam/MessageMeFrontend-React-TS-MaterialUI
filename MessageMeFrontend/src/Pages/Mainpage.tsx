import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Listbar from "../Components/ChatComponents/Listbar";
import Chatarea from "../Components/ChatComponents/Chatarea";

export default function Mainpage() {
  return (
    <DashboardLayout sidebarExpandedWidth={300} defaultSidebarCollapsed>
      <div className="flex overflow-hidden">
        <Listbar />
        <Chatarea />
      </div>
    </DashboardLayout>
  );
}
