"use client";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import theme, { roboto } from "@/theme";
import { Analytics } from '@vercel/analytics/react';

// Layout Components
import Sidebar from "@/components/layout/Sidebar";
import MobileSidebar from "@/components/layout/MobileSidebar";
import MobileMenuButton from "@/components/layout/MobileMenuButton";
import MainContent from "@/components/layout/MainContent";
import LayoutContainer from "@/components/layout/LayoutContainer";
import MobileOverlay from "@/components/layout/MobileOverlay";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <html lang="tr" className={roboto.className}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tan-QR - QR Kod Oluşturucu</title>
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Analytics />
            <LayoutContainer>
              {/* Mobile Menu Button */}
              {isMobile && <MobileMenuButton onClick={handleDrawerToggle} />}

              {/* Mobile Sidebar Overlay */}
              {mobileOpen && (
                <MobileOverlay onClick={handleDrawerToggle} mounted={mounted} />
              )}

              {/* Desktop Sidebar */}
              <Sidebar isMobile={isMobile} />

              {/* Mobile Sidebar */}
              <MobileSidebar
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                mounted={mounted}
              />

              {/* Main Content */}
              <MainContent isMobile={isMobile}>
                {children}
              </MainContent>
            </LayoutContainer>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
