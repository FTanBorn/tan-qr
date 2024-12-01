// URLForm.tsx
import { useState, useCallback } from 'react'
import { TextField, Button, Stack, Alert, InputAdornment } from '@mui/material'
import { QrCode2, Link as LinkIcon } from '@mui/icons-material'
import QRCodeFormWrapper from '../QRCodeFormWrapper'
import { GradientConfig } from '../types'
import { CornerSquareType, DotType } from 'qr-code-styling'

export interface QRStyleOptions {
  dotColor: string
  dotShape: string
  dotType: DotType
  cornersSquareType: CornerSquareType
  cornersSquareColor: string
  cornersDotColor: string
  dotGradient: GradientConfig | null
  cornersSquareGradient: GradientConfig | null
}

export interface QRFormSubmitData {
  data: string
  qrStyles: QRStyleOptions
}

interface URLFormProps {
  onGenerate?: (data: QRFormSubmitData) => void
  defaultUrl?: string
  maxUrlLength?: number
}

export default function URLForm({ onGenerate, defaultUrl = '', maxUrlLength = 2048 }: URLFormProps) {
  const [urlData, setUrlData] = useState(defaultUrl)
  const [showQR, setShowQR] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // URL'yi düzenleyen fonksiyon
  const formatUrl = (url: string): string => {
    const trimmedUrl = url.trim()
    if (!trimmedUrl) return ''

    if (trimmedUrl.match(/^[a-zA-Z]+:\/\//)) return trimmedUrl

    const securePortPattern = /:443$/
    if (trimmedUrl.match(securePortPattern)) {
      return `https://${trimmedUrl}`
    }

    return `http://${trimmedUrl}`
  }

  const validateUrl = useCallback((url: string): boolean => {
    if (!url.trim()) return false

    try {
      new URL(formatUrl(url))
      return true
    } catch {
      return false
    }
  }, [])

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setUrlData(newUrl)
    setError(null)

    if (newUrl.length > maxUrlLength) {
      setError(`URL ${maxUrlLength} karakterden uzun olamaz`)
      return
    }
  }

  const handleSubmit = (formData: QRFormSubmitData) => {
    if (!urlData.trim()) {
      setError('URL boş olamaz')
      return
    }

    if (!validateUrl(urlData)) {
      setError('Geçerli bir URL giriniz (örn: example.com)')
      return
    }

    const formattedUrl = formatUrl(urlData)
    const updatedFormData = {
      ...formData,
      data: formattedUrl
    }

    setError(null)
    console.log('Form submitted:', updatedFormData)
    onGenerate?.(updatedFormData)
  }

  const handleShowQR = () => {
    if (!urlData.trim()) {
      setError('URL boş olamaz')
      return
    }

    if (!validateUrl(urlData)) {
      setError('Geçerli bir URL giriniz (örn: example.com)')
      return
    }

    setError(null)
    setShowQR(true)
  }

  const formContent = (
    <Stack spacing={3}>
      {error && <Alert severity='error'>{error}</Alert>}

      <TextField
        fullWidth
        label='Website URL'
        placeholder='example.com'
        variant='outlined'
        value={urlData}
        onChange={handleUrlChange}
        required
        error={!!error}
        helperText={error}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <LinkIcon />
            </InputAdornment>
          )
        }}
      />

      <Button
        variant='contained'
        size='large'
        type='submit'
        startIcon={<QrCode2 />}
        onClick={handleShowQR}
        disabled={!!error || !urlData.trim()}
      >
        QR Kod Oluştur
      </Button>
    </Stack>
  )

  return (
    <QRCodeFormWrapper
      formContent={formContent}
      data={formatUrl(urlData)}
      showQR={showQR}
      onSubmit={handleSubmit}
      customStyles={{
        formContainer: {
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px'
        },
        qrContainer: {
          backgroundColor: '#f5f5f5',
          minHeight: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }}
    />
  )
}
