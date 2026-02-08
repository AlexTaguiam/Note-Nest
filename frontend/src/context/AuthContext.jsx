import React, { createContext, useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Fetch user role from custom claims
  const fetchUserRole = async (user) => {
    if (user) {
      try {
        const idTokenResult = await user.getIdTokenResult();
        const role = idTokenResult.claims.role || "customer";
        setUserRole(role);
        return role;
      } catch (error) {
        console.error("Error fetching role:", error);
        setUserRole("customer");
        return "customer";
      }
    }
    return null;
  };

  //Sign up with email and password
  const signup = async (email, password) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      //sync user with backend
      await api.post("/auth/sync");

      //Fetch role
      await fetchUserRole(result.user);

      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  //Login with email and password
  const login = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);

      //sync user with backend
      await api.post("auth/sync");

      await fetchUserRole(result.user);

      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  //Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);

      // Sync user with backend
      await api.post("/auth/sync");

      // Fetch role
      await fetchUserRole(result.user);

      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  //Logout
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUserRole(null);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  //Get ID token
  const getIdToken = async () => {
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return null;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        await fetchUserRole(user);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    signInWithGoogle,
    logout,
    getIdToken,
    fetchUserRole,
    error,
    loading,
  };

  return (
    <AuthContext.Provider value={{ ...value }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
