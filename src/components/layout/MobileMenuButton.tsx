import { IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

interface MobileMenuButtonProps {
  onClick: () => void;
}

export default function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <IconButton
      color="primary"
      onClick={onClick}
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
  );
} 