import { 
  Box, 
  Typography, 
  Tooltip, 
  ToggleButtonGroup, 
  ToggleButton,
  Accordion, 
  AccordionSummary, 
  AccordionDetails
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Settings as SettingsIcon } from '@mui/icons-material';

// Nokta şekilleri
const dotShapes = [
  { value: "square", name: "Kare", icon: "■" },
  { value: "dots", name: "Yuvarlak", icon: "●" },
  { value: "rounded", name: "Yuvarlatılmış", icon: "▢" },
  { value: "classy", name: "Şık", icon: "◆" },
  { value: "classy-rounded", name: "Şık Yuvarlatılmış", icon: "◈" },
  { value: "extra-rounded", name: "Tam Yuvarlak", icon: "○" },
];

interface ShapeOptionsProps {
  dotType: string;
  setDotType: (type: string) => void;
  cornerDotType: string;
  setCornerDotType: (type: string) => void;
  cornerSquareType: string;
  setCornerSquareType: (type: string) => void;
  // Akordiyon kontrolü için
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  disabled?: boolean; // İsteğe bağlı devre dışı bırakma özelliği
}

const ShapeOptions: React.FC<ShapeOptionsProps> = ({
  dotType,
  setDotType,
  cornerDotType,
  setCornerDotType,
  cornerSquareType,
  setCornerSquareType,
  expanded,
  onChange,
  disabled = false
}) => {
  return (
    <Accordion 
      sx={{ 
        boxShadow: 'none', 
        '&:before': { display: 'none' }, 
        border: '1px solid', 
        borderColor: 'divider', 
        borderRadius: 1,
        overflow: 'hidden'
      }}
      expanded={expanded}
      onChange={onChange}
      disabled={disabled}
    >
      <AccordionSummary 
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: 'action.hover',
          '&.Mui-expanded': {
            borderBottom: '1px solid',
            borderColor: 'divider',
          }
        }}
      >
        <SettingsIcon sx={{ mr: 1 }} color="primary" />
        <Typography variant="subtitle1">Şekiller</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Nokta şekli seçimi */}
          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{ mb: 1.5 }}>
              Nokta Şekli
            </Typography>
            <ToggleButtonGroup
              value={dotType}
              exclusive
              onChange={(_, newValue) => newValue && setDotType(newValue)}
              aria-label="dot shape"
              size="small"
              sx={{ 
                flexWrap: 'wrap',
                '& .MuiToggleButtonGroup-grouped': {
                  borderRadius: 1,
                  mx: 0.5,
                  my: 0.5,
                  border: '1px solid rgba(0, 0, 0, 0.12) !important',
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  minWidth: 42,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    }
                  }
                } 
              }}
            >
              {dotShapes.map((shape) => (
                <ToggleButton key={shape.value} value={shape.value} aria-label={shape.name}>
                  <Tooltip title={shape.name}>
                    <Box component="span" sx={{ fontWeight: 'bold' }}>{shape.icon}</Box>
                  </Tooltip>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          {/* Köşe noktası şekli seçimi */}
          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{ mb: 1.5 }}>
              Köşe Noktası Şekli
            </Typography>
            <ToggleButtonGroup
              value={cornerDotType}
              exclusive
              onChange={(_, newValue) => newValue && setCornerDotType(newValue)}
              aria-label="corner dot shape"
              size="small"
              sx={{ 
                flexWrap: 'wrap',
                '& .MuiToggleButtonGroup-grouped': {
                  borderRadius: 1,
                  mx: 0.5,
                  my: 0.5,
                  border: '1px solid rgba(0, 0, 0, 0.12) !important',
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  minWidth: 42,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    }
                  }
                } 
              }}
            >
              {dotShapes.map((shape) => (
                <ToggleButton key={shape.value} value={shape.value} aria-label={shape.name}>
                  <Tooltip title={shape.name}>
                    <Box component="span" sx={{ fontWeight: 'bold' }}>{shape.icon}</Box>
                  </Tooltip>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          {/* Köşe kare şekli seçimi */}
          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{ mb: 1.5 }}>
              Köşe Kare Şekli
            </Typography>
            <ToggleButtonGroup
              value={cornerSquareType}
              exclusive
              onChange={(_, newValue) => newValue && setCornerSquareType(newValue)}
              aria-label="corner square shape"
              size="small"
              sx={{ 
                flexWrap: 'wrap',
                '& .MuiToggleButtonGroup-grouped': {
                  borderRadius: 1,
                  mx: 0.5,
                  my: 0.5,
                  border: '1px solid rgba(0, 0, 0, 0.12) !important',
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  minWidth: 42,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    }
                  }
                } 
              }}
            >
              {dotShapes.map((shape) => (
                <ToggleButton key={shape.value} value={shape.value} aria-label={shape.name}>
                  <Tooltip title={shape.name}>
                    <Box component="span" sx={{ fontWeight: 'bold' }}>{shape.icon}</Box>
                  </Tooltip>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ShapeOptions; 