// QR kodu biçimlendirme yardımcısı
export const formatQRValue = (
  type: string, 
  value: string,
  // Özel QR tipleri için gereken değerler
  wifiSSID?: string,
  wifiPassword?: string,
  wifiEncryption?: string,
  latitude?: string,
  longitude?: string,
  vcardName?: string,
  vcardPhone?: string,
  vcardEmail?: string,
  eventTitle?: string,
  eventDate?: string,
  eventTime?: string,
  // Ek parametreler
  wifiHidden?: boolean,
  vcardCompany?: string,
  vcardTitle?: string,
  vcardAddress?: string,
  vcardWebsite?: string,
  locationName?: string,
  eventEndDate?: string,
  eventEndTime?: string,
  eventLocation?: string,
  eventDescription?: string,
  smsNumber?: string,
  smsMessage?: string,
  emailSubject?: string,
  emailBody?: string
) => {
  switch (type) {
    case 'URL':
      // URL formatı kontrolü
      if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
        return `https://${value}`;
      }
      return value;
    case 'PHONE':
      return `tel:${value}`;
    case 'SMS':
      if (smsNumber && smsMessage) {
        return `SMSTO:${smsNumber}:${smsMessage}`;
      } else if (smsNumber) {
        return `SMSTO:${smsNumber}`;
      }
      return value;
    case 'EMAIL':
      if (value && emailSubject && emailBody) {
        return `mailto:${value}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      } else if (value && emailSubject) {
        return `mailto:${value}?subject=${encodeURIComponent(emailSubject)}`;
      } else if (value) {
        return `mailto:${value}`;
      }
      return value;
    case 'WIFI':
      if (wifiSSID) {
        let wifiString = `WIFI:S:${wifiSSID};`;
        
        if (wifiEncryption && wifiEncryption !== 'nopass') {
          wifiString += `T:${wifiEncryption};`;
        } else {
          wifiString += `T:;`;
        }
        
        if (wifiPassword && wifiEncryption !== 'nopass') {
          wifiString += `P:${wifiPassword};`;
        }
        
        if (wifiHidden) {
          wifiString += `H:true;`;
        }
        
        wifiString += `;`;
        return wifiString;
      }
      return value;
    case 'LOCATION':
      if (latitude && longitude) {
        if (locationName) {
          return `geo:${latitude},${longitude}?q=${encodeURIComponent(locationName)}`;
        }
        return `geo:${latitude},${longitude}`;
      }
      return value;
    case 'VCARD':
      if (vcardName || vcardPhone || vcardEmail || vcardCompany || vcardTitle || vcardAddress || vcardWebsite) {
        let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
        
        if (vcardName) {
          vcard += `FN:${vcardName}\n`;
          vcard += `N:${vcardName.split(' ').pop() || ''};;${vcardName.split(' ').slice(0, -1).join(' ') || ''};\n`;
        }
        
        if (vcardTitle) vcard += `TITLE:${vcardTitle}\n`;
        if (vcardCompany) vcard += `ORG:${vcardCompany}\n`;
        if (vcardPhone) vcard += `TEL;TYPE=CELL:${vcardPhone}\n`;
        if (vcardEmail) vcard += `EMAIL:${vcardEmail}\n`;
        if (vcardWebsite) {
          let website = vcardWebsite;
          if (!website.startsWith('http://') && !website.startsWith('https://')) {
            website = `https://${website}`;
          }
          vcard += `URL:${website}\n`;
        }
        if (vcardAddress) vcard += `ADR;TYPE=HOME:;;${vcardAddress};;;;\n`;
        
        vcard += 'END:VCARD';
        return vcard;
      }
      return value;
    case 'METIN':
      // Uzun metin, herhangi bir formatlama yapmadan aynen döndürüyoruz
      return value;
    case 'TEXT':
      return value;
    case 'EVENT':
      if (eventTitle || eventDate) {
        let event = 'BEGIN:VEVENT\n';
        
        if (eventTitle) event += `SUMMARY:${eventTitle}\n`;
        
        if (eventDate) {
          const formatDate = (date: string, time: string = '000000') => {
            const dateStr = date.replace(/-/g, '');
            const timeStr = time ? time.replace(/:/g, '') : '000000';
            return `${dateStr}T${timeStr}`;
          };
          
          // Başlangıç zamanı
          const startDateTime = formatDate(eventDate, eventTime);
          event += `DTSTART:${startDateTime}\n`;
          
          // Bitiş zamanı (varsa)
          if (eventEndDate) {
            const endDateTime = formatDate(eventEndDate, eventEndTime);
            event += `DTEND:${endDateTime}\n`;
          }
        }
        
        if (eventLocation) event += `LOCATION:${eventLocation}\n`;
        if (eventDescription) event += `DESCRIPTION:${eventDescription}\n`;
        
        event += 'END:VEVENT';
        return event;
      }
      return value;
    default:
      return value;
  }
};

export const createQRCodeOptions = (
  qrSize: number,
  generatedQR: string,
  dotType: string,
  fgColor: string,
  cornerSquareType: string,
  cornerDotType: string,
  bgColor: string,
  errorLevel: "L" | "M" | "Q" | "H",
  useGradient: boolean,
  gradientColors: string[],
  logoUrl: string | null = null,
  logoSize: number = 60
): Record<string, unknown> => {
  const qrCodeOptions: Record<string, unknown> = {
    width: qrSize,
    height: qrSize,
    type: "svg",
    data: generatedQR || "Örnek",
    dotsOptions: {
      type: dotType,
      color: useGradient ? undefined : fgColor,
      gradient: useGradient ? {
        type: "linear",
        rotation: 45,
        colorStops: [
          { offset: 0, color: gradientColors[0] },
          { offset: 1, color: gradientColors[1] }
        ]
      } : undefined
    },
    cornersSquareOptions: {
      type: cornerSquareType,
      color: useGradient ? undefined : fgColor,
      gradient: useGradient ? {
        type: "linear",
        rotation: 45,
        colorStops: [
          { offset: 0, color: gradientColors[0] },
          { offset: 1, color: gradientColors[1] }
        ]
      } : undefined
    },
    cornersDotOptions: {
      type: cornerDotType,
      color: useGradient ? undefined : fgColor,
      gradient: useGradient ? {
        type: "linear",
        rotation: 45,
        colorStops: [
          { offset: 0, color: gradientColors[0] },
          { offset: 1, color: gradientColors[1] }
        ]
      } : undefined
    },
    backgroundOptions: {
      color: bgColor === 'transparent' ? 'rgba(255, 255, 255, 0)' : bgColor
    },
    qrOptions: {
      errorCorrectionLevel: logoUrl ? "H" : errorLevel
    }
  };

  // Logo eklemesi
  if (logoUrl) {
    qrCodeOptions.image = logoUrl;
    qrCodeOptions.imageOptions = {
      hideBackgroundDots: true,
      imageSize: logoSize / 240,
      margin: 5,
      crossOrigin: "anonymous",
    };
  }

  return qrCodeOptions;
}; 