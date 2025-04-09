import { Box, Paper, Typography } from "@mui/material";

interface MainContentProps {
  children: React.ReactNode;
  isMobile: boolean;
}

export default function MainContent({ children, isMobile }: MainContentProps) {
  return (
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
  );
} 