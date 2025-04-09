export interface QRHistoryItem {
  id: string;
  type: string;
  value: string;
  content?: string;
  timestamp: number;
  // QR kodunun HTML olarak önizlemesi
  htmlCode?: string;
  // QR kodunun görünüm ayarları
  customization?: {
    fgColor: string;
    bgColor: string;
    dotType: string; 
    cornerDotType: string;
    cornerSquareType: string;
    useGradient: boolean;
    gradientColors: string[];
    logoUrl?: string;
    logoSize?: number;
    qrSize: number;
    errorLevel: "L" | "M" | "Q" | "H";
  };
}

class QRHistoryService {
  private readonly STORAGE_KEY = 'qr-code-history';

  // Geçmiş QR kodlarını localStorage'dan alır
  getHistory(): QRHistoryItem[] {
    if (typeof window === 'undefined') return [];
    
    const historyData = localStorage.getItem(this.STORAGE_KEY);
    if (!historyData) return [];
    
    try {
      return JSON.parse(historyData);
    } catch (error) {
      console.error('QR kod geçmişi yüklenirken hata:', error);
      return [];
    }
  }

  // Yeni bir QR kodu geçmişe ekler
  addToHistory(item: Omit<QRHistoryItem, 'id' | 'timestamp'>): void {
    if (typeof window === 'undefined') return;
    
    const history = this.getHistory();
    
    // Yeni öğe oluştur
    const newItem: QRHistoryItem = {
      ...item,
      id: this.generateId(),
      timestamp: Date.now()
    };
    
    // 20 öğeyle sınırla ve yeni öğeyi ekle
    const updatedHistory = [newItem, ...history].slice(0, 20);
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedHistory));
      // Storage değişikliği olayını tetikle
      window.dispatchEvent(new StorageEvent('storage', {
        key: this.STORAGE_KEY
      }));
    } catch (error) {
      console.error('QR kod geçmişe eklenirken hata:', error);
    }
  }

  // Geçmişten bir öğeyi siler
  removeFromHistory(id: string): void {
    if (typeof window === 'undefined') return;
    
    const history = this.getHistory();
    const updatedHistory = history.filter(item => item.id !== id);
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedHistory));
      // Storage değişikliği olayını tetikle
      window.dispatchEvent(new StorageEvent('storage', {
        key: this.STORAGE_KEY
      }));
    } catch (error) {
      console.error('QR kod geçmişten silinirken hata:', error);
    }
  }

  // Tüm geçmişi temizler
  clearHistory(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      // Storage değişikliği olayını tetikle
      window.dispatchEvent(new StorageEvent('storage', {
        key: this.STORAGE_KEY
      }));
    } catch (error) {
      console.error('QR kod geçmişi temizlenirken hata:', error);
    }
  }

  // Benzersiz ID oluşturur
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}

// Tek instance olarak dışa aktar
export const qrHistoryService = new QRHistoryService(); 