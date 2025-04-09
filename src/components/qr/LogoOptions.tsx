import { 
  Box, 
  Typography, 
  Button, 
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Tune as TuneIcon
} from '@mui/icons-material';

interface LogoOptionsProps {
  logoUrl: string;
  logoSize: number;
  handleLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeLogo: () => void;
  setLogoSize: (size: number) => void;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  disabled?: boolean; // İsteğe bağlı devre dışı bırakma özelliği
}

const LogoOptions: React.FC<LogoOptionsProps> = ({
  logoUrl,
  logoSize,
  handleLogoUpload,
  removeLogo,
  setLogoSize,
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
        <TuneIcon sx={{ mr: 1 }} color="primary" />
        <Typography variant="subtitle1">Logo</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={3}>
          {/* Logo Yükleme */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Logo Ekle
            </Typography>
            <Box sx={{ mt: 1 }}>
              <input
                accept="image/*"
                type="file"
                id="logo-upload"
                onChange={handleLogoUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="logo-upload">
                <Button
                  variant="outlined"
                  component="span"
                  size="small"
                  startIcon={<TuneIcon />}
                  sx={{ mr: 1 }}
                >
                  Logo Seç
                </Button>
              </label>
              
              {logoUrl && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={removeLogo}
                >
                  Logoyu Kaldır
                </Button>
              )}
            </Box>

            {logoUrl && (
              <>
                <Box sx={{ 
                  mt: 2, 
                  display: 'flex', 
                  alignItems: 'center',
                  p: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1
                }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundImage: `url(${logoUrl})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      borderRadius: 1,
                      mr: 2
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Logo boyutu
                  </Typography>
                </Box>
                
                <Slider
                  value={logoSize}
                  min={30}
                  max={120}
                  step={5}
                  onChange={(_, newValue) => setLogoSize(newValue as number)}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}px`}
                  sx={{ mt: 2 }}
                />
              </>
            )}
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default LogoOptions; 