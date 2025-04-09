import { 
  Box, 
  Paper, 
  Typography, 
  IconButton, 
  Tooltip,
  Divider
} from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
  SaveAlt as SaveAltIcon
} from '@mui/icons-material';
import { useRef, useEffect } from 'react';

interface QRPreviewProps {
  bgColor: string;
  qrCode: {
    append: (element: HTMLElement) => void;
    download: (options: { name: string; extension: string }) => Promise<string>;
  } | null;
  generatedQR: string;
  handleCopyQR: () => void;
  handleDownloadQR: () => void;
}

const QRPreview: React.FC<QRPreviewProps> = ({
  bgColor,
  qrCode,
  generatedQR,
  handleCopyQR,
  handleDownloadQR
}) => {
  const qrContainerRef = useRef<HTMLDivElement>(null);

  // QR kodunu DOM'a render etme
  useEffect(() => {
    if (qrCode && qrContainerRef.current) {
      qrContainerRef.current.innerHTML = '';
      qrCode.append(qrContainerRef.current);
    }
  }, [qrCode]);

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        height: 'fit-content',
        width: '100%',
        maxWidth: { xs: '100%', md: 400 },
        mx: 'auto'
      }}
    >
      <Box>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'divider',
            gap: 1
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              textAlign: 'center'
            }}
          >
            QR Kod Önizleme
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            p: { xs: 2, sm: 3 },
            backgroundColor: bgColor === 'transparent' ? 'transparent' : bgColor,
          }}
        >
          {/* QR Kod Placeholder veya Oluşturulan Kod */}
          <Box
            sx={{
              width: '100%',
              aspectRatio: '1',
              maxWidth: { xs: 240, sm: 280, md: 320 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              backgroundColor: 'white',
              boxShadow: generatedQR ? '0 10px 25px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            {qrCode ? (
              <div 
                ref={qrContainerRef} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              />
            ) : (
              <Typography 
                color="text.secondary"
                sx={{ 
                  textAlign: 'center',
                  px: 2,
                  fontSize: { xs: '0.85rem', sm: '1rem' }  
                }}
              >
                {generatedQR ? 'QR kod yükleniyor...' : 'QR kod burada görünecek'}
              </Typography>
            )}
          </Box>
        </Box>

        <Divider />

        {/* Aksiyon Butonları */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          p: { xs: 1.5, sm: 2 },
          gap: { xs: 1, sm: 2 }
        }}>
          <Tooltip title="QR Kodu Kopyala">
            <span>
              <IconButton
                color="primary"
                disabled={!generatedQR}
                onClick={handleCopyQR}
                sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 }
                }}
              >
                <ContentCopyIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="QR Kodu İndir">
            <span>
              <IconButton
                color="primary"
                disabled={!generatedQR}
                onClick={handleDownloadQR}
                sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 }
                }}
              >
                <SaveAltIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
};

export default QRPreview; 