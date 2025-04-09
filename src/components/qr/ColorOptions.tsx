import { 
  Box, 
  Typography, 
  Tooltip, 
  ToggleButton, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails 
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ColorLens as ColorLensIcon } from '@mui/icons-material';

// Renk seçenekleri
const colorOptions = [
  { color: "#000000", name: "Siyah" },
  { color: "#4361ee", name: "Mavi" },
  { color: "#3a0ca3", name: "Mor" },
  { color: "#e63946", name: "Kırmızı" },
  { color: "#06d6a0", name: "Yeşil" },
  { color: "#ff9f1c", name: "Turuncu" },
];

// Gradyan renk seçenekleri
const gradientOptions = [
  { name: "Mavi-Mor", colors: ["#4361ee", "#3a0ca3"] },
  { name: "Kırmızı-Mor", colors: ["#e63946", "#3a0ca3"] },
  { name: "Yeşil-Mavi", colors: ["#06d6a0", "#4361ee"] },
  { name: "Turuncu-Kırmızı", colors: ["#ff9f1c", "#e63946"] },
];

interface ColorOptionsProps {
  fgColor: string;
  setFgColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  useGradient: boolean;
  setUseGradient: (use: boolean) => void;
  gradientColors: string[];
  setGradientColors: (colors: string[]) => void;
  // Akordiyon kontrolü için
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  disabled?: boolean; // İsteğe bağlı devre dışı bırakma özelliği
}

const ColorOptions: React.FC<ColorOptionsProps> = ({
  fgColor,
  setFgColor,
  bgColor,
  setBgColor,
  useGradient,
  setUseGradient,
  gradientColors,
  setGradientColors,
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
        <ColorLensIcon sx={{ mr: 1 }} color="primary" />
        <Typography variant="subtitle1">Renkler</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Ön Plan Rengi */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              QR Kod Rengi
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {colorOptions.map((option) => (
                <Tooltip key={option.color} title={option.name}>
                  <Box
                    onClick={() => setFgColor(option.color)}
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: option.color,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      border: fgColor === option.color 
                        ? '2px solid' 
                        : '2px solid transparent',
                      borderColor: 'primary.main',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>

          {/* Arka Plan Rengi */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Arka Plan Rengi
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Box
              onClick={() => setBgColor('#ffffff')}
              sx={{
                width: 36,
                height: 36,
                bgcolor: '#ffffff',
                borderRadius: '50%',
                cursor: 'pointer',
                border: bgColor === '#ffffff' 
                  ? '2px solid' 
                  : '1px solid',
                borderColor: 'divider',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            />
            <Box
              onClick={() => setBgColor('transparent')}
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                cursor: 'pointer',
                background: 'repeating-conic-gradient(#CCCCCC 0% 25%, transparent 0% 50%) 50% / 8px 8px',
                border: bgColor === 'transparent' 
                  ? '2px solid' 
                  : '1px solid',
                borderColor: bgColor === 'transparent' ? 'primary.main' : 'divider',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            />
            {colorOptions.slice(1, 5).map((option) => (
              <Tooltip key={option.color} title={option.name}>
                <Box
                  onClick={() => setBgColor(option.color + '15')} // 15 hexadecimal olarak %10 opaklık değeri
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: option.color + '15',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    border: bgColor === option.color + '15' 
                      ? '2px solid' 
                      : '1px solid transparent',
                    borderColor: 'primary.main',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
              </Tooltip>
            ))}
          </Box>
          </Box>
          {/* Gradyan Renk Seçimi */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle2">
                Gradyan Renk Kullan
              </Typography>
              <ToggleButton
                value="useGradient"
                selected={useGradient}
                onChange={() => setUseGradient(!useGradient)}
                size="small"
              >
                <ColorLensIcon fontSize="small" />
              </ToggleButton>
            </Box>
            
            {useGradient && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Gradyan Renk Seçin
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {gradientOptions.map((gradient, index) => (
                    <Tooltip key={index} title={gradient.name}>
                      <Box
                        onClick={() => setGradientColors(gradient.colors)}
                        sx={{
                          width: 50,
                          height: 30,
                          background: `linear-gradient(45deg, ${gradient.colors[0]}, ${gradient.colors[1]})`,
                          borderRadius: 1,
                          cursor: 'pointer',
                          border: JSON.stringify(gradientColors) === JSON.stringify(gradient.colors) 
                            ? '2px solid' 
                            : '2px solid transparent',
                          borderColor: 'primary.main',
                          transition: 'transform 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.1)'
                          }
                        }}
                      />
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ColorOptions; 