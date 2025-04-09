import { Box } from "@mui/material";
import { ReactNode } from "react";

interface LayoutContainerProps {
  children: ReactNode;
}

export default function LayoutContainer({ children }: LayoutContainerProps) {
  return (
    <Box sx={{
      display: "flex",
      minHeight: "100vh",
      width: "100%",
      position: "relative",
      bgcolor: {
        xs: "background.default",
        md: "rgba(249, 250, 255, 0.95)"
      },
      p: { xs: 0, md: 4 },
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at top right, rgba(67, 97, 238, 0.05), transparent 60%), radial-gradient(circle at bottom left, rgba(58, 12, 163, 0.04), transparent 50%)",
        zIndex: 0,
        display: { xs: "none", md: "block" }
      }
    }}>
      {children}
    </Box>
  );
} 