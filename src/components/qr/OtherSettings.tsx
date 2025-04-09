import { 
  Box, 
  Typography, 
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  FormatSize as FormatSizeIcon
} from '@mui/icons-material';

// Hata düzeltme seviyeleri
export const errorLevels = [
  { value: "L", label: "Düşük (7%)" },
  { value: "M", label: "Orta (15%)" },
  { value: "Q", label: "Yüksek (25%)" },
  { value: "H", label: "En Yüksek (30%)" },
];

interface OtherSettingsProps {
  qrSize: number;
  setQrSize: (size: number) => void;
  errorLevel: "L" | "M" | "Q" | "H";
  setErrorLevel: (level: "L" | "M" | "Q" | "H") => void;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  disabled?: boolean; // İsteğe bağlı devre dışı bırakma özelliği
}

const OtherSettings: React.FC<OtherSettingsProps> = ({
  qrSize,
  setQrSize,
  errorLevel,
  setErrorLevel,
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
        <FormatSizeIcon sx={{ mr: 1 }} color="primary" />
        <Typography variant="subtitle1">Diğer Ayarlar</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={3}>
          {/* QR Kod Boyutu */}
          <Box>
            <Typography variant="subtitle2" gutterBottom display="flex" alignItems="center" gap={1}>
              <FormatSizeIcon fontSize="small" />
              QR Kod Boyutu (Preview)
            </Typography>
            <Slider
              value={qrSize}
              min={150}
              max={320}
              step={10}
              onChange={(_, newValue) => setQrSize(newValue as number)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}px`}
              sx={{ mt: 1 }}
            />
          </Box>

          {/* Hata Düzeltme Seviyesi */}
          <FormControl fullWidth>
            <InputLabel id="error-correction-level">Hata Düzeltme Seviyesi</InputLabel>
            <Select
              labelId="error-correction-level"
              value={errorLevel}
              label="Hata Düzeltme Seviyesi"
              onChange={(e) => setErrorLevel(e.target.value as "L" | "M" | "Q" | "H")}
              size="small"
            >
              {errorLevels.map((level) => (
                <MenuItem key={level.value} value={level.value}>
                  {level.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default OtherSettings; 