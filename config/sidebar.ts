// config/sidebar.ts
import {
  BaggageClaim,
  BarChart2,
  BarChart4,
  Book,
  BookOpen,
  Cable,
  CalendarHeart,
  CheckCheck,
  CircleDollarSign,
  FolderTree,
  HandCoins,
  Home,
  House,
  Image,
  LucideIcon,
  Mail,
  Presentation,
  Settings,
  Speaker,
  User2,
  Users,
  Users2,
} from "lucide-react";

export interface ISidebarLink {
  title: string;
  href?: string;
  icon: LucideIcon;
  dropdown: boolean;
  permission: string; // Required permission to view this item
  dropdownMenu?: MenuItem[];
}

type MenuItem = {
  title: string;
  href: string;
  permission: string; // Required permission to view this menu item
};

export const sidebarLinks: ISidebarLink[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    dropdown: false,
    permission: "dashboard.read",
  },
  {
    title: "Users",
    icon: Users,
    href: "/dashboard/users",
    dropdown: true,
    permission: "users.read",
    dropdownMenu: [
      {
        title: "Users",
        href: "/dashboard/users",
        permission: "users.read",
      },
      {
        title: "Roles",
        href: "/dashboard/users/roles",
        permission: "roles.read",
      },
      {
        title: "Change Password",
        href: "/dashboard/change-password",
        permission: "roles.read",
      },
      {
        title: "Profile",
        href: "/dashboard/profile",
        permission: "roles.read",
      },
    ],
  },
  // {
  //   title: "Inventory",
  //   icon: BaggageClaim,
  //   dropdown: true,
  //   href: "/dashboard/inventory/products",
  //   permission: "products.read",
  //   dropdownMenu: [
  //     {
  //       title: "Categories",
  //       href: "/dashboard/inventory/categories",
  //       permission: "categories.read",
  //     },
  //     {
  //       title: "Products",
  //       href: "/dashboard/inventory/products",
  //       permission: "products.read",
  //     },
  //   ],
  // },
  // {
  //   title: "Sales",
  //   icon: CircleDollarSign,
  //   dropdown: true,
  //   href: "/dashboard/sales",
  //   permission: "sales.read",
  //   dropdownMenu: [
  //     {
  //       title: "Sales",
  //       href: "/dashboard/sales",
  //       permission: "sales.read",
  //     },
  //     {
  //       title: "Customers",
  //       href: "/dashboard/sales/customers",
  //       permission: "customers.read",
  //     },
  //   ],
  // },
  {
    title: "Team Members",
    icon: Users,
    dropdown: false,
    href: "/dashboard/team",
    permission: "team.read",
  },
  {
    title: "Categories",
    icon: Users,
    dropdown: false,
    href: "/dashboard/categories",
    permission: "categories.read",
  },
  {
    title: "Events",
    icon: CalendarHeart,
    dropdown: false,
    href: "/dashboard/events",
    permission: "events.read",
  },
  {
    title: "Campaigns",
    icon: Speaker,
    dropdown: false,
    href: "/dashboard/campaigns",
    permission: "campaigns.read",
  },
  {
    title: "Stories",
    icon: BookOpen,
    dropdown: false,
    href: "/dashboard/stories",
    permission: "stories.read",
  },
  {
    title: "Stories",
    icon: BookOpen,
    dropdown: false,
    href: "/dashboard/stories",
    permission: "stories.read",
  },
  {
    title: "Children",
    icon: User2,
    dropdown: false,
    href: "/dashboard/children",
    permission: "children.read",
  },
  {
    title: "Messages",
    icon: Mail,
    dropdown: false,
    href: "/dashboard/messages",
    permission: "messages.read",
  },
  {
    title: "donations",
    href: "/dashboard/donations",
    icon: HandCoins,
    dropdown: false,
    permission: "donations.read",
  },
  {
    title: "Members",
    href: "/dashboard/members",
    icon: Users2,
    dropdown: false,
    permission: "members.read",
  },
  {
    title: "Banners",
    href: "/dashboard/banners",
    icon: Image,
    dropdown: false,
    permission: "banners.read",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    dropdown: false,
    permission: "settings.read",
  },
];
