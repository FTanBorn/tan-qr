import React from 'react';
import { 
  Box, 
  ToggleButtonGroup, 
  ToggleButton, 
  Tabs, 
  Tab,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Link as LinkIcon,
  TextFields as TextFieldsIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Wifi as WifiIcon,
  LocationOn as LocationIcon,
  ContactPhone as ContactPhoneIcon,
  Event as EventIcon,
  Message as MessageIcon
} from '@mui/icons-material';

interface QRTypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

// QR tipleri için veri dizisi
const qrTypes = [
  { id: 'URL', label: 'URL', icon: <LinkIcon /> },
  { id: 'TEXT', label: 'Metin', icon: <TextFieldsIcon /> },
  { id: 'PHONE', label: 'Telefon', icon: <PhoneIcon /> },
  { id: 'EMAIL', label: 'E-posta', icon: <EmailIcon /> },
  { id: 'WIFI', label: 'Wi-Fi', icon: <WifiIcon /> },
  { id: 'LOCATION', label: 'Konum', icon: <LocationIcon /> },
  { id: 'VCARD', label: 'vCard', icon: <ContactPhoneIcon /> },
  { id: 'EVENT', label: 'Etkinlik', icon: <EventIcon /> },
  { id: 'SMS', label: 'SMS', icon: <MessageIcon /> }
];

const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({ selectedType, onTypeChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleTypeChange = (event: React.MouseEvent<HTMLElement>, newType: string) => {
    if (newType !== null) {
      onTypeChange(newType);
    }
  };

  // Mobil cihazlar için Tabs bileşeni kullanımı
  if (isMobile) {
    return (
      <Box sx={{ width: '100%', mb: 2, mt: 1 }}>
        <Tabs
          value={selectedType}
          onChange={(e, value) => onTypeChange(value)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '.MuiTabs-scrollButtons.Mui-disabled': {
              opacity: 0.3,
            },
            '.MuiTab-root': {
              minWidth: 'auto',
              px: 1.5,
              py: 1,
              fontSize: '0.75rem'
            }
          }}
        >
          {qrTypes.map((type) => (
            <Tab 
              key={type.id} 
              value={type.id} 
              label={type.label}
              icon={type.icon} 
              iconPosition="start"
              sx={{
                minHeight: '40px',
                borderRadius: 1
              }}
            />
          ))}
        </Tabs>
      </Box>
    );
  }
  
  // Desktop için ToggleButtonGroup kullanımı
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, overflow: 'auto', py: 1 }}>
      <ToggleButtonGroup
        value={selectedType}
        exclusive
        onChange={handleTypeChange}
        aria-label="QR kod tipi"
        size={isMobile ? "small" : "medium"}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
          '.MuiToggleButton-root': {
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px !important',
            py: 1,
            px: 1.5,
            color: 'text.secondary',
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark',
              }
            },
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            transition: 'all 0.2s',
          }
        }}
      >
        {qrTypes.map((type) => (
          <ToggleButton 
            key={type.id} 
            value={type.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            {type.icon}
            {type.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default QRTypeSelector; 