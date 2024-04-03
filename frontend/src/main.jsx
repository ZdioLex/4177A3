//React
import React from "react";
import ReactDOM from "react-dom/client";

//Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Pages
import PageNotFound from "./pages/PageNotFound.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Faq from "./pages/Faq.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import GroupPage from "./pages/GroupPage.jsx";
import AddFriends from "./pages/AddFriends.jsx";
import Profile from "./pages/profile/Profile.jsx";
import ProfileEdit from "./pages/profile/edit/EditProfile.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import MembersPage from "./pages/MembersPage.jsx";
import MemberCard from "./pages/MemberCard.jsx";
import MembersList from "./pages/MembersList.jsx";
import ChatPage from "./pages/ChatPage.jsx";

//CSS
import "./styles/index.css";
import "./styles/login-registration.css";
import "./styles/dashboard.css";
import "./styles/groupDetailsModal.css";
import "./styles/memberCard.css";
import "./styles/membersPage.css";
import Expense from "./pages/Expense.jsx";

const router = createBrowserRouter([
  // routes
  {
    path: "/", // Home Page
    element: <LandingPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/:userId/profile", // Profile Page
    element: <Profile />,
  },
  {
    path: "/:userId/:friendId/profile", // Profile Page
    element: <Profile />,
  },
  {
    path: "/:userId/profile/edit", // Profile Edit Page
    element: <ProfileEdit />,
  },
  {
    path: "/login", // Login Page
    element: <LoginPage />,
  },
  {
    path: "/registration", // Registration page
    element: <RegistrationPage />,
  },
  {
    path: "/contactus", // Contact page
    element: <ContactUs />,
  },
  {
    path: "/faq", // Faq Page
    element: <Faq />,
  },
  {
    path: "/:userId", // Dashboard Page
    element: <Dashboard />,
  },
  {
    path: "/:userId/:groupId", //THIS needs to be changed - should be accessible from /dashboard/group/id page
    element: <GroupPage />,
  },
  {
    path: "/:userId/friends", //THIS needs to be changed - should be accessible from /dashboard/group/id page
    element: <AddFriends />,
  },
  {
    path: "/:userId/:groupId/members", //THIS needs to be changed - should be accessible from /dashboard/group/id page
    element: <MembersPage />,
  },
  {
    path: "/:userId/:groupId/chat", //THIS needs to be changed - should be accessible from /dashboard/group/id page
    element: <ChatPage />,
  },
  {
    path: "/:userId/:groupId/expenses", //THIS needs to be changed - should be accessible from /dashboard/group/id page
    element: <Expense />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
