import { Box, Typography } from "@mui/material";
import { QrCode2 as QrCodeIcon, History as HistoryIcon } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";

interface MobileSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  mounted: boolean;
}

export default function MobileSidebar({ mobileOpen, setMobileOpen, mounted }: MobileSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { text: 'QR Kod Oluştur', icon: <QrCodeIcon />, path: '/', color: '#4361ee' },
    { text: 'QR Kod Geçmişi', icon: <HistoryIcon />, path: '/history', color: '#3a0ca3' },
  ];

  if (!mobileOpen) return null;

  return (
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
  );
} 