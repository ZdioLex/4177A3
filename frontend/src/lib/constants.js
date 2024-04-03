import {
  HomeIcon,
  CurrencyDollarIcon,
  UserIcon,
  Cog8ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export const HOME_NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Contact Us", href: "/contactus" },
  { name: "FAQ", href: "/faq" },
  { name: "Login", href: "/login" },
  { name: "Register", href: "/registration" },
];

export const GROUP_DASH_NAV_LINKS = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
  {
    name: "Friends",
    href: "/dashboard/friends",
    icon: UserGroupIcon,
  },
  {
    name: "Add Expense",
    href: "/dashboard/addExpense",
    icon: CurrencyDollarIcon,
  },
  { name: "Settings", href: "/dashboard/settings", icon: Cog8ToothIcon },
];

export const HOME_DASH_NAV_LINKS = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
  {
    name: "Friends",
    href: "/dashboard/friends",
    icon: UserGroupIcon,
  },
  { name: "Settings", href: "/dashboard/settings", icon: Cog8ToothIcon },
];

//profile constants

export const BIO =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pulvinar metus nec ultrices tempus. Proin quis consequat augue, eget varius mi. Donec eget venenatis metus, eget efficitur nibh. Suspendisse malesuada ut felis non ornare. Proin placerat non elit ac auctor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut auctor quis nibh nec aliquam. Duis vel mi enim. Nam vestibulum nulla tincidunt mauris dapibus, sit amet faucibus orci vestibulum. Morbi hendrerit mi id sollicitudin aliquet. Proin vestibulum nibh sem, in luctus arcu ultrices viverra.";

export const BASIC_INFO_KEYS = ["fullName", "birthday", "gender"];

export const CONTACT_INFO_KEYS = ["email", "address", "phoneNumber"];

export const ALL_KEYS = [
  "fullName",
  "birthday",
  "gender",
  "email",
  "address",
  "phoneNumber",
];

export const ACC_INFO_KEYS = ["username", "joinDate", "lastLogin"];

export const PROFILE_LABELS = {
  fullName: "Name",
  birthday: "Birthday",
  gender: "Gender",
  email: "Email",
  address: "Address",
  phoneNumber: "Phone Number",
  username: "Username",
  joinDate: "Join date",
  lastLogin: "Last login",
};
