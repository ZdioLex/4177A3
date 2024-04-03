import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm"; // Ensure this import path matches your file structure
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon,
  UserIcon,
  Cog8ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import SidebarItem from "./SideBarItem";
import { getAuthOn, logoutUser } from "../services/authServices";
import { useNavigate, useParams } from "react-router-dom";

const Sidebar = ({ page }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [usersId, setUsersId] = useState("");

  useEffect(() => {
    const unsubscribeAuthOn = getAuthOn(async (user) => {
      if (user) {
        setUsersId(userId);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribeAuthOn();
  }, [navigate]);

  const logout = async () => {
    const result = await logoutUser();
    if (result.success) {
      navigate("/login");
    } else {
      console.error("Sign out error", result.error);
    }
  };

  const DASH_NAV_LINKS = [
    { name: "Home", href: `/${userId}`, icon: HomeIcon },
    { name: "Profile", href: `/${userId}/profile`, icon: UserIcon },
    {
      name: "Friends",
      href: `/${usersId}/friends`,
      icon: UserGroupIcon,
    },
  ];

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showExpenseForm, setShowExpenseForm] = useState(false); // State to control ExpenseForm visibility

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Method to show the ExpenseForm
  const handleAddExpenseClick = () => {
    setShowExpenseForm(true);
  };

  // Method to be called when saving the form
  const handleFormSave = () => {
    setShowExpenseForm(false);
    // Logic to handle form submission goes here
  };

  // Method to be called when canceling the form
  const handleFormCancel = () => {
    setShowExpenseForm(false);
  };

  return (
    <div
      style={{
        width: isCollapsed ? "70px" : "196px",
        minHeight: "100vh",
        backgroundColor: "#262753",
        color: "white",
        position: "fixed",
        top: 0,
        right: 0,
        transition: "width 0.5s",
        overflow: "hidden",
        zIndex: 1000,
      }}
    >
      <div
        className={clsx("flex items-center p-2 mt-2", {
          "justify-center": isCollapsed,
          "justify-start ml-2": !isCollapsed,
        })}
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronLeftIcon className="w-7 rounded-md hover:text-black hover:bg-purp-10" />
        ) : (
          <ChevronRightIcon className="w-7 rounded-md hover:text-black hover:bg-purp-10" />
        )}
      </div>

      {!isCollapsed ? (
        <div>
          <div className="flex items-center justify-center pb-20">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              style={{ borderRadius: "50%", width: "100px", height: "100px" }}
            />
          </div>
          {DASH_NAV_LINKS.map((link) => {
            const LinkIcon = link.icon;
            if (link.name === "Add Expense") {
              return (
                <SidebarItem
                  LinkIcon={LinkIcon}
                  label={link.name}
                  to="#"
                  onClick={handleAddExpenseClick}
                />
              );
            } else {
              return (
                <SidebarItem
                  LinkIcon={LinkIcon}
                  label={link.name}
                  to={link.href}
                />
              );
            }
          })}

          <div
            style={{
              position: "absolute",
              bottom: "20px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <SidebarItem
              LinkIcon={ArrowLeftStartOnRectangleIcon}
              label="Logout"
              to="/"
            />
          </div>
        </div>
      ) : (
        <div>
          {DASH_NAV_LINKS.map((link) => {
            const LinkIcon = link.icon;
            if (link.name === "Add Expense") {
              return (
                <SidebarItem
                  LinkIcon={LinkIcon}
                  to="#"
                  onClick={handleAddExpenseClick}
                />
              );
            } else {
              return <SidebarItem LinkIcon={LinkIcon} to={link.href} />;
            }
          })}

          <div
            style={{
              position: "absolute",
              bottom: "20px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <SidebarItem
              LinkIcon={ArrowLeftStartOnRectangleIcon}
              onClick={logout}
            />
          </div>
        </div>
      )}

      {showExpenseForm && (
        <ExpenseForm onSave={handleFormSave} onCancel={handleFormCancel} />
      )}
    </div>
  );
};

export default Sidebar;
