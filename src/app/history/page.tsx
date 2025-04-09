"use client";
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Alert,
  Button
} from '@mui/material';
import { 
  Delete as DeleteIcon,
  ClearAll as ClearAllIcon,
  Link as LinkIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Wifi as WifiIcon,
  LocationOn as LocationOnIcon,
  Contacts as ContactsIcon,
  Event as EventIcon,
  TextFields as TextFieldsIcon,
  MoreVert as MoreVertIcon,
  Replay as ReplayIcon
} from '@mui/icons-material';
import { qrHistoryService, QRHistoryItem } from '@/components/qr/QRHistoryService';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

const HistoryPage = () => {
  const [historyItems, setHistoryItems] = useState<QRHistoryItem[]>([]);
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    item: QRHistoryItem;
  } | null>(null);
  const [alertInfo, setAlertInfo] = useState<{
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
  } | null>(null);
  
  const router = useRouter();

  // Geçmiş QR kodlarını yükle
  useEffect(() => {
    loadHistory();
    
    // Storage değişikliklerini dinle
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'qr-code-history') {
        loadHistory();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadHistory = () => {
    const items = qrHistoryService.getHistory();
    setHistoryItems(items);
  };

  // QR kod tipine göre ikon döndür
  const getIconForType = (type: string) => {
    switch (type) {
      case 'URL':
        return <LinkIcon />;
      case 'PHONE':
        return <PhoneIcon />;
      case 'EMAIL':
        return <EmailIcon />;
      case 'WIFI':
        return <WifiIcon />;
      case 'LOCATION':
        return <LocationOnIcon />;
      case 'VCARD':
        return <ContactsIcon />;
      case 'EVENT':
        return <EventIcon />;
      default:
        return <TextFieldsIcon />;
    }
  };

  // Zaman bilgisini formatlama
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp), 'dd MMMM yyyy HH:mm', { locale: tr });
  };

  // Context menüsünü aç
  const handleContextMenu = (event: React.MouseEvent, item: QRHistoryItem) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX,
      mouseY: event.clientY,
      item,
    });
  };

  // Context menüsünü kapat
  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  // Geçmişten öğe sil
  const handleDeleteHistoryItem = (id: string) => {
    qrHistoryService.removeFromHistory(id);
    loadHistory();
    handleCloseContextMenu();
    showAlert('QR kod geçmişten silindi', 'success');
  };

  // Tüm geçmişi temizle
  const handleClearHistory = () => {
    if (historyItems.length === 0) return;
    
    qrHistoryService.clearHistory();
    setHistoryItems([]);
    showAlert('Tüm geçmiş temizlendi', 'info');
  };

  // QR kodu yeniden oluşturmak için ana sayfaya yönlendir
  const handleRecreateQR = (item: QRHistoryItem) => {
    // Ana sayfaya state ile yönlendirme 
    // Next.js'de doğrudan state aktarımı olmadığı için sessionStorage kullanıyoruz
    sessionStorage.setItem('recreateQR', JSON.stringify(item));
    router.push('/');
    handleCloseContextMenu();
  };

  // Bildirim göster
  const showAlert = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
    setAlertInfo({ message, severity });
    
    // 3 saniye sonra bildirimi kaldır
    setTimeout(() => {
      setAlertInfo(null);
    }, 3000);
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        mt: { xs: 2, sm: 4 }, 
        mb: { xs: 4, sm: 8 },
        px: { xs: 1, sm: 2 }
      }}
    >
      {/* Bildirim */}
      {alertInfo && (
        <Alert 
          severity={alertInfo.severity}
          sx={{ 
            mb: 2, 
            position: 'fixed', 
            top: { xs: 8, sm: 16 }, 
            right: { xs: 8, sm: 16 }, 
            zIndex: 9999,
            boxShadow: 3,
            borderRadius: 2,
            width: { xs: 'calc(100% - 16px)', sm: 'auto' },
            maxWidth: { xs: 'calc(100% - 16px)', sm: '400px' }
          }}
        >
          {alertInfo.message}
        </Alert>
      )}

      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: { xs: 2, sm: 4 }, 
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Box 
          sx={{ 
            p: { xs: 2, sm: 3 }, 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 0 },
            justifyContent: "space-between", 
            alignItems: { xs: "flex-start", sm: "center" },
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
          }}
        >
          <Typography variant="h5" fontWeight={600} sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            QR Kod Geçmişi
          </Typography>
          
          {historyItems.length > 0 && (
            <Tooltip title="Tüm Geçmişi Temizle">
              <Button
                startIcon={<ClearAllIcon />}
                color="error"
                variant="outlined"
                size="small"
                onClick={handleClearHistory}
                sx={{ 
                  borderRadius: 2,
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                Temizle
              </Button>
            </Tooltip>
          )}
        </Box>

        {historyItems.length === 0 ? (
          <Box sx={{ p: { xs: 3, sm: 5 }, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary" paragraph>
              Henüz geçmiş QR kod bulunmuyor.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              QR kod oluşturduğunuzda otomatik olarak geçmişe eklenecektir.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ 
                mt: 3, 
                borderRadius: 2,
                width: { xs: '100%', sm: 'auto' }
              }}
              onClick={() => router.push('/')}
            >
              QR Kod Oluştur
            </Button>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {historyItems.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem
                  disablePadding
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      size="small"
                      onClick={(e) => handleContextMenu(e, item)}
                      sx={{ mr: { xs: 0.5, sm: 1 } }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                >
                  <ListItemButton
                    onClick={() => handleRecreateQR(item)}
                    sx={{ 
                      py: { xs: 1.5, sm: 2 }, 
                      px: { xs: 2, sm: 3 },
                      '&:hover': { bgcolor: 'action.hover' } 
                    }}
                  >
                    <ListItemAvatar sx={{ minWidth: { xs: 36, sm: 45 } }}>
                      {getIconForType(item.type)}
                    </ListItemAvatar>
                    <ListItemText 
                      primary={
                        <Typography 
                          variant="body1" 
                          fontWeight={500} 
                          noWrap
                          sx={{
                            fontSize: { xs: '0.9rem', sm: '1rem' }
                          }}
                        >
                          {item.content || item.value}
                        </Typography>
                      }
                      secondary={
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'flex-start', sm: 'center' }, 
                            gap: { xs: 0.5, sm: 1 }, 
                            mt: { xs: 0.5, sm: 0.5 }
                          }}
                        >
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            component="span"
                            sx={{ 
                              display: 'inline-flex',
                              alignItems: 'center',
                              bgcolor: 'action.selected',
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                              fontSize: { xs: '0.65rem', sm: '0.75rem' }
                            }}
                          >
                            {item.type}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            color="text.secondary" 
                            component="span"
                            sx={{
                              fontSize: { xs: '0.65rem', sm: '0.75rem' }
                            }}
                          >
                            {formatTime(item.timestamp)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      {/* Context Menu */}
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        PaperProps={{
          sx: {
            width: { xs: 200, sm: 220 },
            borderRadius: 2,
            mt: 1.5
          }
        }}
      >
        <MenuItem onClick={() => {
          if (contextMenu) {
            handleRecreateQR(contextMenu.item);
          }
        }}>
          <ListItemIcon>
            <ReplayIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Yeniden Oluştur" />
        </MenuItem>
        <MenuItem onClick={() => {
          if (contextMenu) {
            handleDeleteHistoryItem(contextMenu.item.id);
          }
        }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Sil" />
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default HistoryPage; 