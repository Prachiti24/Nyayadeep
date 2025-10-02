import React, { useEffect } from "react";
import { createContext, useReducer } from "react";
import { toast } from "react-toastify";
export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  loading: true,
  isAdmin: false,
  token: null,
  user: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload?.user,
        token: action.payload?.token,
      };

    case "LOGIN_ADMIN":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        isAdmin: true,
      };

    case "LOADING":
      return {
        ...state,
        loading: true,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        isAdmin: false,
        user: null,
        token: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const fetchUserStatus = async (token) => {
    try {
      const user = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/getUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await user.json();
      if (data.status == "success") {
        dispatch({ type: "LOGIN", payload: { user: data.data.user, token } });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    } catch (e) {
      console.log(e.message);
      toast.error("An error occured, please try again later");
    }
  };

  const fetchAdminStatus = async (token) => {
    try {
      const admin = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getAdmin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await admin.json();
      if (data.status == "success") {
        dispatch({ type: "LOGIN", payload: { user: data.admin, token } });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGOUT" });
    }
  };

  useEffect(() => {
    try {
      dispatch({ type: "LOADING" });
      const token = localStorage.getItem("token");
      if (token) {
        fetchUserStatus(token);
        fetchAdminStatus(token);
      } else {
        dispatch({ type: "LOGOUT" });
      }
    } catch (e) {
      console.log(e.message);
      toast.error("An error occured, please try again later");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
