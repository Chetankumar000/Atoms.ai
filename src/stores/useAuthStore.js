import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null, // Stores the user object
  token: null, // Stores the JWT token
  isAuthenticated: false, // Tracks if the user is authenticated

  // Login action: Updates the store with user and token
  login: (user, token) => {
    set(() => ({
      user,
      token,
      isAuthenticated: true,
    }));

    // Save to localStorage for persistence
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  },

  // Logout action: Clears the store
  logout: () => {
    set(() => ({
      user: null,
      token: null,
      isAuthenticated: false,
    }));

    // Clear from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  // Load authentication state from localStorage (called on app load)
  initializeAuth: () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      set(() => ({
        user: JSON.parse(storedUser),
        token: storedToken,
        isAuthenticated: true,
      }));
    }
  },
}));

export default useAuthStore;
