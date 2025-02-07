import {
  History,
  Home,
  ShieldQuestionIcon,
  CircleUser,
  Heart,
  NotebookPen
} from "lucide-react";
import { BookOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Quiz",
    url: "/quiz",
    icon: ShieldQuestionIcon,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: CircleUser,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: Heart,
  },
  {
    title: "Revision",
    url: "/revision",
    icon: NotebookPen,
  },
];

export function AppSidebar() {
  const { isSignedIn, user, isLoaded } = useUser()

  return (
    <Sidebar collapsible="icon" >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="ml-5 mt-5">
            <Link to="/dashboard" className="flex items-center text-lg font-bold">
              <BookOpen className="mr-2" /> Lexica
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-10 ml-1">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="py-3">
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span className="text-lg font-semibold">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem key="logout-item" className="py-3 pl-0.5">
                <span  className="flex"><UserButton/>{isSignedIn&&isLoaded&&<p className="pl-5 text-lg font-semibold">{user.fullName}</p>}</span>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
