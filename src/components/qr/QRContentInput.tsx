import React from 'react';
import {
  Box,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  InputAdornment,
  Switch,
  FormControlLabel,
  FormHelperText,
  Chip
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Tune as TuneIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  LocationOn as LocationIcon,
  Wifi as WifiIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Sms as SmsIcon,
  Link as LinkIcon,
  TextFields as TextIcon,
  FormatQuote as QuoteIcon,
} from '@mui/icons-material';

export const getPlaceholderByType = (type: string) => {
  switch (type) {
    case 'URL':
      return 'https://örnek.com';
    case 'TEXT':
      return 'Metninizi buraya yazın';
    case 'PHONE':
      return '+90 555 123 4567';
    case 'SMS':
      return '+90 555 123 4567';
    case 'WIFI':
      return 'Ağ adı';
    case 'EMAIL':
      return 'ornek@mail.com';
    case 'LOCATION':
      return 'Enlem, Boylam veya Adres';
    case 'METIN':
      return 'Uzun metninizi buraya yazabilirsiniz...';
    default:
      return '';
  }
};

interface QRContentInputProps {
  selectedType: string;
  qrValue: string;
  onQrValueChange: (value: string) => void;
  onGenerate: () => void;
  // Akordiyon kontrolü için
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  // State for specific QR types
  vcardName: string;
  setVcardName: (value: string) => void;
  vcardPhone: string;
  setVcardPhone: (value: string) => void;
  vcardEmail: string;
  setVcardEmail: (value: string) => void;
  vcardCompany?: string;
  setVcardCompany?: (value: string) => void;
  vcardTitle?: string;
  setVcardTitle?: (value: string) => void;
  vcardAddress?: string;
  setVcardAddress?: (value: string) => void;
  vcardWebsite?: string;
  setVcardWebsite?: (value: string) => void;
  latitude: string;
  setLatitude: (value: string) => void;
  longitude: string;
  setLongitude: (value: string) => void;
  locationName?: string;
  setLocationName?: (value: string) => void;
  wifiSSID: string;
  setWifiSSID: (value: string) => void;
  wifiPassword: string;
  setWifiPassword: (value: string) => void;
  wifiEncryption: string;
  setWifiEncryption: (value: string) => void;
  wifiHidden?: boolean;
  setWifiHidden?: (value: boolean) => void;
  eventTitle: string;
  setEventTitle: (value: string) => void;
  eventDate: string;
  setEventDate: (value: string) => void;
  eventTime: string;
  setEventTime: (value: string) => void;
  eventEndDate?: string;
  setEventEndDate?: (value: string) => void;
  eventEndTime?: string;
  setEventEndTime?: (value: string) => void;
  eventLocation?: string;
  setEventLocation?: (value: string) => void;
  eventDescription?: string;
  setEventDescription?: (value: string) => void;
  smsNumber?: string;
  setSmsNumber?: (value: string) => void;
  smsMessage?: string;
  setSmsMessage?: (value: string) => void;
}

export const QRContentInput: React.FC<QRContentInputProps> = ({
  selectedType,
  qrValue,
  onQrValueChange,
  onGenerate,
  vcardName,
  setVcardName,
  vcardPhone,
  setVcardPhone,
  vcardEmail,
  setVcardEmail,
  vcardCompany = "",
  setVcardCompany = () => { },
  vcardTitle = "",
  setVcardTitle = () => { },
  vcardAddress = "",
  setVcardAddress = () => { },
  vcardWebsite = "",
  setVcardWebsite = () => { },
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  locationName = "",
  setLocationName = () => { },
  wifiSSID,
  setWifiSSID,
  wifiPassword,
  setWifiPassword,
  wifiEncryption,
  setWifiEncryption,
  wifiHidden = false,
  setWifiHidden = () => { },
  eventTitle,
  setEventTitle,
  eventDate,
  setEventDate,
  eventTime,
  setEventTime,
  eventEndDate = "",
  setEventEndDate = () => { },
  eventEndTime = "",
  setEventEndTime = () => { },
  eventLocation = "",
  setEventLocation = () => { },
  eventDescription = "",
  setEventDescription = () => { },
  smsNumber = "",
  setSmsNumber = () => { },
  smsMessage = "",
  setSmsMessage = () => { },
  expanded,
  onChange
}) => {

  const renderInputFields = () => {
    switch (selectedType) {
      case 'URL':
        return (
          <TextField
            fullWidth
            label="URL"
            placeholder={getPlaceholderByType(selectedType)}
            variant="outlined"
            value={qrValue}
            onChange={(e) => onQrValueChange(e.target.value)}
            sx={{ mb: 2 }}
            helperText="Web site URL'sini girin. http:// veya https:// otomatik olarak eklenecektir."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
        );
      case 'TEXT':
        return (
          <TextField
            fullWidth
            label="Metin"
            placeholder={getPlaceholderByType(selectedType)}
            variant="outlined"
            value={qrValue}
            onChange={(e) => onQrValueChange(e.target.value)}
            sx={{ mb: 2 }}
            multiline
            rows={3}
          />
        );
      case 'METIN':
        return (
          <TextField
            fullWidth
            label="Uzun Metin"
            placeholder={getPlaceholderByType(selectedType)}
            variant="outlined"
            value={qrValue}
            onChange={(e) => onQrValueChange(e.target.value)}
            sx={{ mb: 2 }}
            multiline
            rows={6}
            helperText={`${qrValue.length} karakter kullandınız. Daha uzun metinler daha karmaşık QR kod oluşturabilir.`}
          />
        );
      case 'PHONE':
        return (
          <TextField
            fullWidth
            label="Telefon Numarası"
            placeholder={getPlaceholderByType(selectedType)}
            variant="outlined"
            value={qrValue}
            onChange={(e) => onQrValueChange(e.target.value)}
            sx={{ mb: 2 }}
            helperText="Taranınca arama yapılacak telefon numarasını girin"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />
        );
      case 'SMS':
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Telefon Numarası"
              placeholder="+90 555 123 4567"
              variant="outlined"
              value={smsNumber}
              onChange={(e) => setSmsNumber(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SmsIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Mesaj İçeriği"
              placeholder="Mesaj içeriğini girin"
              variant="outlined"
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
              multiline
              rows={3}
            />
          </Stack>
        );
      case 'EMAIL':
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="E-posta Adresi"
              placeholder={getPlaceholderByType(selectedType)}
              variant="outlined"
              value={qrValue}
              onChange={(e) => onQrValueChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Konu (İsteğe Bağlı)"
              placeholder="E-posta konusu"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Mesaj (İsteğe Bağlı)"
              placeholder="E-posta mesajı"
              variant="outlined"
              multiline
              rows={3}
            />
          </Stack>
        );
      case 'VCARD':
        return (
          <Stack spacing={2}>
            <Typography variant="subtitle2" gutterBottom color="primary">
              Kişi Bilgileri
            </Typography>
            <TextField
              required
              fullWidth
              label="İsim Soyisim"
              placeholder="Adınızı girin"
              variant="outlined"
              value={vcardName}
              onChange={(e) => setVcardName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Ünvan"
              placeholder="Ünvanınızı girin"
              variant="outlined"
              value={vcardTitle}
              onChange={(e) => setVcardTitle(e.target.value)}
            />
            <TextField
              fullWidth
              label="Şirket"
              placeholder="Şirket adını girin"
              variant="outlined"
              value={vcardCompany}
              onChange={(e) => setVcardCompany(e.target.value)}
            />

            <Typography variant="subtitle2" gutterBottom color="primary" sx={{ mt: 2 }}>
              İletişim Bilgileri
            </Typography>
            <TextField
              fullWidth
              label="Telefon"
              placeholder="Telefon numaranızı girin"
              variant="outlined"
              value={vcardPhone}
              onChange={(e) => setVcardPhone(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="E-posta"
              placeholder="E-posta adresinizi girin"
              variant="outlined"
              value={vcardEmail}
              onChange={(e) => setVcardEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Web Sitesi"
              placeholder="Web sitenizi girin"
              variant="outlined"
              value={vcardWebsite}
              onChange={(e) => setVcardWebsite(e.target.value)}
            />
            <TextField
              fullWidth
              label="Adres"
              placeholder="Adresinizi girin"
              variant="outlined"
              value={vcardAddress}
              onChange={(e) => setVcardAddress(e.target.value)}
              multiline
              rows={2}
            />
          </Stack>
        );
      case 'LOCATION':
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Konum Adı"
              placeholder="Konum adı girin"
              variant="outlined"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Enlem"
                placeholder="Enlem değerini girin"
                variant="outlined"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
              <TextField
                fullWidth
                label="Boylam"
                placeholder="Boylam değerini girin"
                variant="outlined"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </Stack>
            <FormHelperText>
              Enlem ve boylam değerlerini Google Maps üzerinden alabilirsiniz
            </FormHelperText>
          </Stack>
        );
      case 'WIFI':
        return (
          <Stack spacing={2}>
            <TextField
              required
              fullWidth
              label="SSID / Ağ Adı"
              placeholder="Ağ adını girin"
              variant="outlined"
              value={wifiSSID}
              onChange={(e) => setWifiSSID(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WifiIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              type="password"
              label="Şifre"
              placeholder="Ağ şifresini girin"
              variant="outlined"
              value={wifiPassword}
              onChange={(e) => setWifiPassword(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Şifreleme Türü</InputLabel>
              <Select
                value={wifiEncryption}
                onChange={(e) => setWifiEncryption(e.target.value)}
                label="Şifreleme Türü"
              >
                <MenuItem value="WPA">WPA/WPA2</MenuItem>
                <MenuItem value="WEP">WEP</MenuItem>
                <MenuItem value="nopass">Şifresiz</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Switch checked={wifiHidden} onChange={() => setWifiHidden(!wifiHidden)} />}
              label="Gizli Ağ"
            />
          </Stack>
        );
      case 'EVENT':
        return (
          <Stack spacing={2}>
            <Typography variant="subtitle2" gutterBottom color="primary">
              Etkinlik Bilgileri
            </Typography>
            <TextField
              required
              fullWidth
              label="Başlık"
              placeholder="Etkinlik başlığını girin"
              variant="outlined"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Başlangıç Tarihi"
                type="date"
                placeholder="Etkinlik tarihini girin"
                variant="outlined"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Başlangıç Saati"
                type="time"
                placeholder="Etkinlik saatini girin"
                variant="outlined"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Bitiş Tarihi"
                type="date"
                placeholder="Bitiş tarihini girin"
                variant="outlined"
                value={eventEndDate}
                onChange={(e) => setEventEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Bitiş Saati"
                type="time"
                placeholder="Bitiş saatini girin"
                variant="outlined"
                value={eventEndTime}
                onChange={(e) => setEventEndTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <TextField
              fullWidth
              label="Etkinlik Yeri"
              placeholder="Etkinlik yerini girin"
              variant="outlined"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Açıklama"
              placeholder="Etkinlik açıklamasını girin"
              variant="outlined"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              multiline
              rows={3}
            />
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Accordion
      sx={{
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px !important',
        overflow: 'hidden',
        '&:before': { display: 'none' }
      }}
      expanded={expanded}
      onChange={onChange}
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
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              p: 0.8,
              borderRadius: '50%',
              mr: 1.5
            }}
          >
            {(() => {
              switch (selectedType) {
                case 'URL': return <LinkIcon fontSize="small" />;
                case 'TEXT': return <TextIcon fontSize="small" />;
                case 'PHONE': return <PhoneIcon fontSize="small" />;
                case 'SMS': return <SmsIcon fontSize="small" />;
                case 'EMAIL': return <MailIcon fontSize="small" />;
                case 'WIFI': return <WifiIcon fontSize="small" />;
                case 'LOCATION': return <LocationIcon fontSize="small" />;
                case 'VCARD': return <PersonIcon fontSize="small" />;
                case 'EVENT': return <EventIcon fontSize="small" />;
                case 'METIN': return <QuoteIcon fontSize="small" />;
                default: return <TuneIcon fontSize="small" />;
              }
            })()}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography sx={{ fontWeight: 500 }}>{selectedType} İçeriği</Typography>
            {(selectedType === 'VCARD' || selectedType === 'EVENT') && (
              <Chip
                label="Gelişmiş"
                size="small"
                color="primary"
                variant="outlined"
                sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
              />
            )}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 3 }}>
        {renderInputFields()}

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={onGenerate}
          sx={{
            height: 48,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            mt: 2,
            boxShadow: '0 4px 12px rgba(67, 97, 238, 0.2)',
            '&:hover': {
              boxShadow: '0 6px 14px rgba(67, 97, 238, 0.3)',
            }
          }}
        >
          QR Kod Oluştur
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default QRContentInput; 