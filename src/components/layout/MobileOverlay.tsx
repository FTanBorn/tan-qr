import { Box } from "@mui/material";

interface MobileOverlayProps {
  onClick: () => void;
  mounted: boolean;
}

export default function MobileOverlay({ onClick, mounted }: MobileOverlayProps) {
  return (
    <Box
      onClick={onClick}
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
  );
} 