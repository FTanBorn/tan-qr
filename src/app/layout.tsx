"use client";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  QrCode2 as QrCodeIcon,
  Menu as MenuIcon,
  History as HistoryIcon
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import theme, { roboto } from "@/theme";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'QR Kod Oluştur', icon: <QrCodeIcon />, path: '/', color: '#4361ee' },
    { text: 'QR Kod Geçmişi', icon: <HistoryIcon />, path: '/history', color: '#3a0ca3' },
  ];

  return (
    <html lang="tr" className={roboto.className}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
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
              {/* Mobil menü butonu */}
              {isMobile && (
                <IconButton
                  color="primary"
                  onClick={handleDrawerToggle}
                  sx={{
                    position: 'fixed',
                    top: 16,
                    left: 16,
                    zIndex: 1200,
                    bgcolor: 'background.paper',
                    boxShadow: '0 3px 16px rgba(0,0,0,0.1)',
                    borderRadius: '50%',
                    p: 1,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {/* Mobil sidebar overlay */}
              {mobileOpen && (
                <Box
                  onClick={handleDrawerToggle}
                  sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(3px)',
                    zIndex: 1150,
                    display: { xs: 'block', md: 'none' },
                    opacity: mounted ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }}
                />
              )}

              {/* Yüzen sidebar - Masaüstü */}
              {!isMobile && (
                <Paper
                  elevation={3}
                  sx={{
                    position: 'fixed',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: 28,
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '18px 10px',
                    gap: 2.5,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05)',
                    zIndex: 100,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)',
                    }
                  }}
                >
                  {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    const isHovered = hovered === item.text;

                    return (
                      <Tooltip key={item.text} title={item.text} placement="right" arrow>
                        <IconButton
                          onClick={() => router.push(item.path)}
                          onMouseEnter={() => setHovered(item.text)}
                          onMouseLeave={() => setHovered(null)}
                          sx={{
                            backgroundColor: isActive
                              ? `${item.color}15`
                              : isHovered
                                ? `${item.color}10`
                                : 'transparent',
                            color: isActive ? item.color : isHovered ? item.color : '#666',
                            borderRadius: 2,
                            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              backgroundColor: `${item.color}15`,
                            },
                            position: 'relative',
                            width: 48,
                            height: 48,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {item.icon}
                          {isActive && (
                            <Box
                              sx={{
                                position: 'absolute',
                                left: -10,
                                width: 4,
                                height: '70%',
                                backgroundColor: item.color,
                                borderRadius: 4,
                                boxShadow: `0 1px 8px ${item.color}50`
                              }}
                            />
                          )}
                        </IconButton>
                      </Tooltip>
                    );
                  })}
                </Paper>
              )}

              {/* Mobil Sidebar */}
              {isMobile && mobileOpen && (
                <Box
                  sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '75%',
                    maxWidth: '280px',
                    bgcolor: 'background.paper',
                    zIndex: 1200,
                    boxShadow: '0 4px 25px rgba(0,0,0,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    transform: mounted ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary"
                    sx={{
                      mb: 4,
                      ml: 2,
                      display: 'flex',
                      alignItems: 'center',
                      '&::before': {
                        content: '""',
                        display: 'inline-block',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        marginRight: 1.5
                      }
                    }}
                  >
                    TAN-QR
                  </Typography>

                  {menuItems.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                      <Box
                        key={item.text}
                        onClick={() => {
                          router.push(item.path);
                          setMobileOpen(false);
                        }}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 1.8,
                          borderRadius: 2.5,
                          mb: 1.5,
                          cursor: 'pointer',
                          bgcolor: isActive ? `${item.color}15` : 'transparent',
                          color: isActive ? item.color : 'text.primary',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: `${item.color}10`,
                            transform: 'translateX(4px)'
                          },
                        }}
                      >
                        <Box sx={{
                          color: isActive ? item.color : 'text.secondary',
                          mr: 2.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {item.icon}
                        </Box>
                        <Typography fontWeight={isActive ? 600 : 400}>
                          {item.text}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              )}

              {/* Main Content */}
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  width: '100%',
                  maxWidth: { sm: '100%', md: 'calc(100% - 100px)' },
                  ml: { xs: 0, md: 10 },
                  position: 'relative',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  px: { xs: 0, md: 3 },
                  py: { xs: isMobile ? 5 : 0, md: 0 }
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    bgcolor: 'background.paper',
                    width: '100%',
                    maxWidth: '1200px',
                    minHeight: { xs: '100vh', md: 'calc(100vh - 64px)' },
                    borderRadius: { xs: 0, md: '16px' },
                    boxShadow: {
                      xs: 'none',
                      md: '0 10px 40px rgba(0, 0, 0, 0.04), 0 2px 10px rgba(0, 0, 0, 0.02)'
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    border: { xs: 'none', md: '1px solid rgba(230, 235, 255, 0.7)' }
                  }}
                >
                  <Box sx={{
                    flexGrow: 1,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'radial-gradient(circle at top right, rgba(67, 97, 238, 0.02), transparent 70%)',
                      pointerEvents: 'none'
                    }
                  }}>
                    {children}
                  </Box>

                  {/* Footer */}
                  <Box
                    component="footer"
                    sx={{
                      py: 2.5,
                      mt: 5,
                      textAlign: "center",
                      borderTop: '1px solid',
                      borderColor: 'rgba(0,0,0,0.04)'
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        opacity: 0.8,
                        letterSpacing: '0.02em'
                      }}
                    >
                      © {new Date().getFullYear()} TAN-QR | Tüm Hakları Saklıdır
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
