import { Box, Paper, IconButton, Tooltip } from "@mui/material";
import { QrCode2 as QrCodeIcon, History as HistoryIcon } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  isMobile: boolean;
}

export default function Sidebar({ isMobile }: SidebarProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { text: 'QR Kod Oluştur', icon: <QrCodeIcon />, path: '/', color: '#4361ee' },
    { text: 'QR Kod Geçmişi', icon: <HistoryIcon />, path: '/history', color: '#3a0ca3' },
  ];

  if (isMobile) return null;

  return (
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
  );
} 