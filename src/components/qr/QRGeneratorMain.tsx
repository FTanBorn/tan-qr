import { useState, useEffect } from 'react';
import { Box, Stack, Typography, Alert, Fade } from '@mui/material';
import QRTypeSelector from './QRTypeSelector';
import QRContentInput from './QRContentInput';
import ColorOptions from './ColorOptions';
import ShapeOptions from './ShapeOptions';
import LogoOptions from './LogoOptions';
import OtherSettings from './OtherSettings';
import QRPreview from './QRPreview';
import { formatQRValue, createQRCodeOptions } from './QRService';
import { QRHistoryItem, qrHistoryService } from './QRHistoryService';

// QR kod tipi tanımlaması
interface QRCodeType {
    append: (element: HTMLElement) => void;
    download: (options: { name: string; extension: string }) => Promise<string>;
}

const QRGeneratorMain = () => {
    const [selectedType, setSelectedType] = useState('URL');
    const [qrValue, setQrValue] = useState('');
    const [generatedQR, setGeneratedQR] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [qrCode, setQrCode] = useState<QRCodeType | null>(null);
    const [expandedAccordion, setExpandedAccordion] = useState<string | false>("content");

    // QR Kod özelleştirme ayarları
    const [qrSize, setQrSize] = useState<number>(240);
    const [fgColor, setFgColor] = useState<string>("#000000");
    const [bgColor, setBgColor] = useState<string>("#ffffff");
    const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("L");
    const [dotType, setDotType] = useState<string>("square");
    const [cornerDotType, setCornerDotType] = useState<string>("square");
    const [cornerSquareType, setCornerSquareType] = useState<string>("square");
    const [useGradient, setUseGradient] = useState<boolean>(false);
    const [gradientColors, setGradientColors] = useState<string[]>(["#4361ee", "#3a0ca3"]);
    const [logoUrl, setLogoUrl] = useState<string>("");
    const [logoSize, setLogoSize] = useState<number>(60);

    // Farklı QR tipleri için ek state değişkenleri
    const [wifiSSID, setWifiSSID] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');
    const [wifiEncryption, setWifiEncryption] = useState('WPA');
    const [wifiHidden, setWifiHidden] = useState(false);
    
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [locationName, setLocationName] = useState('');
    
    // vCard QR tipi için state
    const [vcardName, setVcardName] = useState('');
    const [vcardPhone, setVcardPhone] = useState('');
    const [vcardEmail, setVcardEmail] = useState('');
    const [vcardCompany, setVcardCompany] = useState('');
    const [vcardTitle, setVcardTitle] = useState('');
    const [vcardAddress, setVcardAddress] = useState('');
    const [vcardWebsite, setVcardWebsite] = useState('');
    
    // Event QR tipi için state
    const [eventTitle, setEventTitle] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    
    // SMS QR tipi için state
    const [smsNumber, setSmsNumber] = useState('');
    const [smsMessage, setSmsMessage] = useState('');
    
    // Email QR tipi için state - şu an için kullanılmıyor
    const emailSubject = '';
    const emailBody = '';

    // Geçmişten yüklenen QR kodunu kontrol etme
    useEffect(() => {
        // Sadece tarayıcı ortamında çalıştır
        if (typeof window !== 'undefined') {
            const recreateQRData = sessionStorage.getItem('recreateQR');
            if (recreateQRData) {
                try {
                    const historyItem: QRHistoryItem = JSON.parse(recreateQRData);
                    
                    // QR tipi ve değerini ayarla
                    setSelectedType(historyItem.type);
                    
                    // QR kod tipine göre değerleri ayarla
                    switch (historyItem.type) {
                        case 'URL':
                        case 'TEXT':
                        case 'PHONE':
                        case 'EMAIL':
                            setQrValue(historyItem.value);
                            break;
                        case 'WIFI':
                            // WiFi bilgilerini parse et
                            const wifiRegex = /WIFI:S:(.*?);T:(.*?);P:(.*?);(H:.*?;)?;/;
                            const wifiMatch = historyItem.value.match(wifiRegex);
                            if (wifiMatch) {
                                setWifiSSID(wifiMatch[1] || '');
                                setWifiEncryption(wifiMatch[2] || 'WPA');
                                setWifiPassword(wifiMatch[3] || '');
                                setWifiHidden(wifiMatch[4] ? true : false);
                            }
                            break;
                        case 'LOCATION':
                            // Konum bilgilerini parse et
                            const geoRegex = /geo:([\d.-]+),([\d.-]+)(?:\?q=(.*))?/;
                            const geoMatch = historyItem.value.match(geoRegex);
                            if (geoMatch) {
                                setLatitude(geoMatch[1] || '');
                                setLongitude(geoMatch[2] || '');
                                setLocationName(geoMatch[3] || '');
                            }
                            break;
                        case 'VCARD':
                            // vCard bilgilerini ayarla
                            const nameMatch = historyItem.value.match(/N:([^;\r\n]+)/);
                            const telMatch = historyItem.value.match(/TEL:([^;\r\n]+)/);
                            const emailMatch = historyItem.value.match(/EMAIL:([^;\r\n]+)/);
                            const orgMatch = historyItem.value.match(/ORG:([^;\r\n]+)/);
                            const titleMatch = historyItem.value.match(/TITLE:([^;\r\n]+)/);
                            const adrMatch = historyItem.value.match(/ADR:([^;\r\n]+)/);
                            const urlMatch = historyItem.value.match(/URL:([^;\r\n]+)/);
                            
                            if (nameMatch) setVcardName(nameMatch[1]);
                            if (telMatch) setVcardPhone(telMatch[1]);
                            if (emailMatch) setVcardEmail(emailMatch[1]);
                            if (orgMatch) setVcardCompany(orgMatch[1]);
                            if (titleMatch) setVcardTitle(titleMatch[1]);
                            if (adrMatch) setVcardAddress(adrMatch[1]);
                            if (urlMatch) setVcardWebsite(urlMatch[1]);
                            break;
                        case 'EVENT':
                            // Etkinlik bilgilerini parse et
                            const summaryMatch = historyItem.value.match(/SUMMARY:([^\r\n]+)/);
                            const locationMatch = historyItem.value.match(/LOCATION:([^\r\n]+)/);
                            const descriptionMatch = historyItem.value.match(/DESCRIPTION:([^\r\n]+)/);
                            const dtStartMatch = historyItem.value.match(/DTSTART:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/);
                            const dtEndMatch = historyItem.value.match(/DTEND:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/);
                            
                            if (summaryMatch) setEventTitle(summaryMatch[1]);
                            if (locationMatch) setEventLocation(locationMatch[1]);
                            if (descriptionMatch) setEventDescription(descriptionMatch[1]);
                            
                            if (dtStartMatch) {
                                setEventDate(`${dtStartMatch[1]}-${dtStartMatch[2]}-${dtStartMatch[3]}`);
                                setEventTime(`${dtStartMatch[4]}:${dtStartMatch[5]}`);
                            }
                            
                            if (dtEndMatch) {
                                setEventEndDate(`${dtEndMatch[1]}-${dtEndMatch[2]}-${dtEndMatch[3]}`);
                                setEventEndTime(`${dtEndMatch[4]}:${dtEndMatch[5]}`);
                            }
                            break;
                        default:
                            setQrValue(historyItem.value);
                    }
                    
                    // QR kodunu doğrudan oluştur
                    setGeneratedQR(historyItem.value);
                    
                    // Bildirim göster
                    showAlertMessage('Geçmiş QR kodu yüklendi');
                    
                    // Session storage'ı temizle
                    sessionStorage.removeItem('recreateQR');
                } catch (error) {
                    console.error('QR kodu yüklenirken hata oluştu:', error);
                    sessionStorage.removeItem('recreateQR');
                }
            }
        }
    }, []);

    // QR kodu oluşturma
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let qrCodeStyling: any = null;

        const loadQRCodeStyling = async () => {
            try {
                // Dinamik olarak qr-code-styling modülünü import ediyoruz (sadece client tarafında çalışır)
                const QRCodeStylingModule = await import('qr-code-styling');
                qrCodeStyling = QRCodeStylingModule.default;

                if (qrCodeStyling && generatedQR) {
                    const qrCodeOptions = createQRCodeOptions(
                        qrSize,
                        generatedQR,
                        dotType,
                        fgColor,
                        cornerSquareType,
                        cornerDotType,
                        bgColor,
                        errorLevel,
                        useGradient,
                        gradientColors,
                        logoUrl,
                        logoSize
                    );

                    const newQrCode = new qrCodeStyling(qrCodeOptions);
                    setQrCode(newQrCode);
                }
            } catch (error) {
                console.error("QR code styling modülü yüklenirken hata oluştu:", error);
            }
        };

        // Yalnızca tarayıcı ortamında çalıştır (server-side rendering'de hata vermemesi için)
        if (typeof window !== 'undefined') {
            loadQRCodeStyling();
        }
    }, [qrSize, fgColor, bgColor, dotType, cornerDotType, cornerSquareType, errorLevel, generatedQR, useGradient, gradientColors, logoUrl, logoSize]);

    const handleQRGenerate = () => {
        // Tip bazlı validasyon kontrolleri
        if (selectedType === 'URL' && !qrValue.trim()) {
            showAlertMessage('Lütfen bir URL girin');
            return;
        }
        if (selectedType === 'WIFI' && !wifiSSID.trim()) {
            showAlertMessage('Lütfen bir ağ adı (SSID) girin');
            return;
        }
        if (selectedType === 'VCARD' && !vcardName.trim()) {
            showAlertMessage('Lütfen en azından bir isim girin');
            return;
        }
        if (selectedType === 'SMS' && !smsNumber.trim()) {
            showAlertMessage('Lütfen bir telefon numarası girin');
            return;
        }
        if (selectedType === 'EVENT' && !eventTitle.trim()) {
            showAlertMessage('Lütfen bir etkinlik başlığı girin');
            return;
        }
        if (selectedType === 'LOCATION' && (!latitude.trim() || !longitude.trim())) {
            showAlertMessage('Lütfen enlem ve boylam değerlerini girin');
            return;
        }
        if ((selectedType === 'TEXT' || selectedType === 'METIN' || selectedType === 'PHONE') && !qrValue.trim()) {
            showAlertMessage(`Lütfen bir ${selectedType.toLowerCase()} değeri girin`);
            return;
        }

        // QR kod içeriğini oluşturma
        const formattedValue = formatQRValue(
            selectedType,
            qrValue,
            wifiSSID,
            wifiPassword,
            wifiEncryption,
            latitude,
            longitude,
            vcardName,
            vcardPhone,
            vcardEmail,
            eventTitle,
            eventDate,
            eventTime,
            wifiHidden,
            vcardCompany,
            vcardTitle,
            vcardAddress,
            vcardWebsite,
            locationName,
            eventEndDate,
            eventEndTime,
            eventLocation,
            eventDescription,
            smsNumber,
            smsMessage,
            emailSubject,
            emailBody
        );

        setGeneratedQR(formattedValue);
    };

    const showAlertMessage = (message: string) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    // Geçmişe ekleme için içerik oluşturan yardımcı fonksiyon
    const getContentForHistory = (): string => {
        switch (selectedType) {
            case 'URL':
            case 'TEXT':
            case 'PHONE':
            case 'EMAIL':
                return qrValue;
            case 'WIFI':
                return wifiSSID || 'WiFi';
            case 'LOCATION':
                return locationName || `${latitude}, ${longitude}`;
            case 'VCARD':
                return vcardName || 'Kişi';
            case 'EVENT':
                return eventTitle || 'Etkinlik';
            case 'SMS':
                return smsNumber || 'SMS';
            default:
                return qrValue || selectedType;
        }
    };

    // QR kodu geçmişe ekle
    const addToHistory = () => {
        if (generatedQR && qrCode) {
            try {
                const content = getContentForHistory();
                
                // HTML kodunu almak için QR kodunu geçici bir elemente ekle
                const tempElement = document.createElement('div');
                qrCode.append(tempElement);
                const htmlCode = tempElement.innerHTML;
                
                qrHistoryService.addToHistory({
                    type: selectedType,
                    content: content,
                    value: generatedQR,
                    htmlCode: htmlCode,
                    customization: {
                        fgColor,
                        bgColor,
                        dotType,
                        cornerDotType,
                        cornerSquareType,
                        useGradient,
                        gradientColors,
                        logoUrl,
                        logoSize,
                        qrSize,
                        errorLevel
                    }
                });
            } catch (error) {
                console.error('QR kod geçmişe eklenirken hata oluştu:', error);
            }
        }
    };

    const handleCopyQR = () => {
        if (qrCode && generatedQR) {
            qrCode.download({
                name: "qrcode-temp",
                extension: "png"
            }).then((dataUrl: string) => {
                const img = new Image();
                img.src = dataUrl;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            navigator.clipboard.write([
                                new ClipboardItem({
                                    'image/png': blob
                                })
                            ]).then(() => {
                                showAlertMessage('QR kod kopyalandı!');
                                
                                // QR kodu geçmişe ekle
                                addToHistory();
                            }).catch(err => {
                                console.error('Kopyalama başarısız:', err);
                                showAlertMessage('Kopyalama başarısız!');
                            });
                        }
                    });
                };
            });
        }
    };

    const handleDownloadQR = () => {
        if (qrCode && generatedQR) {
            qrCode.download({
                name: `qrcode-${Date.now()}`,
                extension: "png"
            });
            
            // QR kodu geçmişe ekle
            addToHistory();
            showAlertMessage('QR kod indirildi ve geçmişe eklendi!');
        }
    };

    const handleTypeChange = (newType: string) => {
        setSelectedType(newType);
        setQrValue('');
        setGeneratedQR('');
    };

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setLogoUrl(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setLogoUrl("");
    };

    // Accordion değişimini yönet
    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        // QR kodu oluşturulmadan önce yalnızca içerik accordion'ının açılmasına izin ver
        if (!generatedQR && panel !== "content") {
            return;
        }
        setExpandedAccordion(isExpanded ? panel : false);
    };

    return (
        <Box sx={{
            maxWidth: '100%',
            mx: 'auto',
            p: { xs: 1, sm: 2, md: 3 },
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Bildirim Alanı */}
            <Fade in={showAlert}>
                <Alert
                    severity="success"
                    sx={{
                        position: 'fixed',
                        top: { xs: 16, sm: 24 },
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        borderRadius: 2,
                        maxWidth: { xs: 'calc(100% - 32px)', sm: 'auto' }
                    }}
                >
                    {alertMessage}
                </Alert>
            </Fade>

            {/* Başlık */}
            <Box sx={{ textAlign: 'center', mb: { xs: 1, sm: 2 } }}>
                <Typography 
                    variant="subtitle1" 
                    component="h1" 
                    fontWeight="bold"
                    sx={{ 
                        display: 'inline-block',
                        mb: 0,
                        fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                >
                    QR Kod Oluşturucu
                </Typography>
            </Box>

            {/* QR Tipleri */}
            <QRTypeSelector
                selectedType={selectedType}
                onTypeChange={handleTypeChange}
            />

            {/* QR Oluşturma Alanı */}
            <Box
                component="main"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'calc(50% - 16px) calc(50% - 16px)' },
                    gridTemplateRows: { xs: 'auto auto', md: 'auto' },
                    gap: { xs: 3, md: 4 },
                    alignItems: 'start',
                    position: 'relative',
                    flex: 1,
                    overflow: { xs: 'visible', md: 'hidden' }
                }}
            >
                {/* Sol Taraf - Input ve Özelleştirme */}
                <Box sx={{
                    overflowY: 'auto',
                    maxHeight: { xs: 'auto', md: 'calc(100vh - 200px)' },
                    pr: { xs: 0, md: 1 },
                    order: { xs: 2, md: 1 }
                }}>
                    {/* QR Kod İçeriği */}
                    <QRContentInput
                        selectedType={selectedType}
                        qrValue={qrValue}
                        onQrValueChange={setQrValue}
                        onGenerate={handleQRGenerate}
                        vcardName={vcardName}
                        setVcardName={setVcardName}
                        vcardPhone={vcardPhone}
                        setVcardPhone={setVcardPhone}
                        vcardEmail={vcardEmail}
                        setVcardEmail={setVcardEmail}
                        vcardCompany={vcardCompany}
                        setVcardCompany={setVcardCompany}
                        vcardTitle={vcardTitle}
                        setVcardTitle={setVcardTitle}
                        vcardAddress={vcardAddress}
                        setVcardAddress={setVcardAddress}
                        vcardWebsite={vcardWebsite}
                        setVcardWebsite={setVcardWebsite}
                        latitude={latitude}
                        setLatitude={setLatitude}
                        longitude={longitude}
                        setLongitude={setLongitude}
                        locationName={locationName}
                        setLocationName={setLocationName}
                        wifiSSID={wifiSSID}
                        setWifiSSID={setWifiSSID}
                        wifiPassword={wifiPassword}
                        setWifiPassword={setWifiPassword}
                        wifiEncryption={wifiEncryption}
                        setWifiEncryption={setWifiEncryption}
                        wifiHidden={wifiHidden}
                        setWifiHidden={setWifiHidden}
                        eventTitle={eventTitle}
                        setEventTitle={setEventTitle}
                        eventLocation={eventLocation}
                        setEventLocation={setEventLocation}
                        eventDescription={eventDescription}
                        setEventDescription={setEventDescription}
                        eventDate={eventDate}
                        setEventDate={setEventDate}
                        eventTime={eventTime}
                        setEventTime={setEventTime}
                        eventEndDate={eventEndDate}
                        setEventEndDate={setEventEndDate}
                        eventEndTime={eventEndTime}
                        setEventEndTime={setEventEndTime}
                        smsNumber={smsNumber}
                        setSmsNumber={setSmsNumber}
                        smsMessage={smsMessage}
                        setSmsMessage={setSmsMessage}
                        expanded={expandedAccordion === "content"}
                        onChange={handleAccordionChange("content")}
                    />

                    <Stack spacing={1.5} sx={{ mt: { xs: 2, sm: 3 } }}>
                        {/* Renkler */}
                        <ColorOptions
                            fgColor={fgColor}
                            setFgColor={setFgColor}
                            bgColor={bgColor}
                            setBgColor={setBgColor}
                            useGradient={useGradient}
                            setUseGradient={setUseGradient}
                            gradientColors={gradientColors}
                            setGradientColors={setGradientColors}
                            expanded={expandedAccordion === "colors"}
                            onChange={handleAccordionChange("colors")}
                            disabled={!generatedQR}
                        />

                        {/* Şekiller */}
                        <ShapeOptions
                            dotType={dotType}
                            setDotType={setDotType}
                            cornerDotType={cornerDotType}
                            setCornerDotType={setCornerDotType}
                            cornerSquareType={cornerSquareType}
                            setCornerSquareType={setCornerSquareType}
                            expanded={expandedAccordion === "shapes"}
                            onChange={handleAccordionChange("shapes")}
                            disabled={!generatedQR}
                        />

                        {/* Logo */}
                        <LogoOptions
                            logoUrl={logoUrl}
                            logoSize={logoSize}
                            handleLogoUpload={handleLogoUpload}
                            removeLogo={removeLogo}
                            setLogoSize={setLogoSize}
                            expanded={expandedAccordion === "logo"}
                            onChange={handleAccordionChange("logo")}
                            disabled={!generatedQR}
                        />

                        {/* Diğer Ayarlar */}
                        <OtherSettings
                            qrSize={qrSize}
                            setQrSize={setQrSize}
                            errorLevel={errorLevel}
                            setErrorLevel={setErrorLevel}
                            expanded={expandedAccordion === "other"}
                            onChange={handleAccordionChange("other")}
                            disabled={!generatedQR}
                        />
                    </Stack>
                </Box>

                {/* Sağ Taraf - QR Kod Önizleme */}
                <Box sx={{ 
                    order: { xs: 1, md: 2 },
                    width: '100%',
                    position: { xs: 'relative', md: 'sticky' },
                    top: { md: '20px' },
                    alignSelf: { xs: 'center', md: 'start' }
                }}>
                    <QRPreview
                        bgColor={bgColor}
                        qrCode={qrCode}
                        generatedQR={generatedQR}
                        handleCopyQR={handleCopyQR}
                        handleDownloadQR={handleDownloadQR}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default QRGeneratorMain; 