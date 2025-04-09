import { createTheme, alpha } from "@mui/material/styles";
import { Roboto } from "next/font/google";

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#4361ee",
      light: "#6c85f2",
      dark: "#2f44c2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#3a0ca3",
      light: "#5a32b9",
      dark: "#2a0974",
      contrastText: "#fff",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#2b2d42",
      secondary: "#555b6e",
    },
    error: {
      main: "#e63946",
    },
    warning: {
      main: "#ff9f1c",
    },
    info: {
      main: "#4cc9f0",
    },
    success: {
      main: "#2ec4b6",
    },
    grey: {
      50: "#f8f9fa",
      100: "#f1f3f5",
      200: "#e9ecef",
      300: "#dee2e6",
      400: "#ced4da",
      500: "#adb5bd",
      600: "#868e96",
      700: "#495057",
      800: "#343a40",
      900: "#212529",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1rem",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 8px rgba(0, 0, 0, 0.05)",
    "0px 6px 12px rgba(0, 0, 0, 0.08)",
    "0px 8px 16px rgba(0, 0, 0, 0.08)",
    "0px 10px 20px rgba(0, 0, 0, 0.1)",
    "0px 12px 24px rgba(0, 0, 0, 0.12)",
    "0px 14px 28px rgba(0, 0, 0, 0.14)",
    "0px 16px 32px rgba(0, 0, 0, 0.16)",
    "0px 18px 36px rgba(0, 0, 0, 0.18)",
    "0px 20px 40px rgba(0, 0, 0, 0.2)",
    "0px 22px 44px rgba(0, 0, 0, 0.22)",
    "0px 24px 48px rgba(0, 0, 0, 0.24)",
    "0px 26px 52px rgba(0, 0, 0, 0.26)",
    "0px 28px 56px rgba(0, 0, 0, 0.28)",
    "0px 30px 60px rgba(0, 0, 0, 0.3)",
    "0px 32px 64px rgba(0, 0, 0, 0.32)",
    "0px 34px 68px rgba(0, 0, 0, 0.34)",
    "0px 36px 72px rgba(0, 0, 0, 0.36)",
    "0px 38px 76px rgba(0, 0, 0, 0.38)",
    "0px 40px 80px rgba(0, 0, 0, 0.4)",
    "0px 42px 84px rgba(0, 0, 0, 0.42)",
    "0px 44px 88px rgba(0, 0, 0, 0.44)",
    "0px 46px 92px rgba(0, 0, 0, 0.46)",
    "0px 48px 96px rgba(0, 0, 0, 0.48)",
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          scrollbarColor: "#bbb #f1f1f1",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#bbb",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#999",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          boxShadow: "none",
          textTransform: "none",
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            boxShadow: "none",
            transform: "translateY(0)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          },
        },
        outlined: {
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        outlined: {
          borderColor: "#e0e0e0",
        },
        elevation1: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
        },
        elevation2: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
        },
        elevation3: {
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            transition: "all 0.2s ease",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: alpha("#4361ee", 0.5),
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: "2px",
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        rail: {
          opacity: 0.5,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 8,
        },
        track: {
          borderRadius: 22 / 2,
        },
        thumb: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
