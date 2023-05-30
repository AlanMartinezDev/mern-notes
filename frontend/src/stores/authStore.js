import { create } from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  loggedIn: null,

  loginForm: {
    email: "",
    password: "",
  },

  signupForm: {
    email: "",
    password: "",
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value,
        },
      };
    });
  },

  updateSignupForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        singupForm: {
          ...state.signupForm,
          [name]: value,
        },
      };
    });
  },

  login: async (e) => {
    const { loginForm } = authStore.getState();

    await axios.post("/login", loginForm, {
      withCredentials: true,
    });

    set({ loggedIn: true });
  },

  checkAuth: async () => {
    try {
      await axios.get("/check-auth", { withCredentials: true });
      set({ loggedIn: true });
    } catch (error) {
      set({ loggedIn: false });
    }
  },

  signup: async () => {
    const { signupForm } = authStore.getState();

    const res = axios.post("/signup", signupForm, { withCredentials: true });

    console.log("signup");
  },
}));

export default authStore;
