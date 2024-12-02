import { useState } from 'react'
import { TextField, Button, Stack, Alert, InputAdornment } from '@mui/material'
import { QrCode2, TextFields } from '@mui/icons-material'
import QRCodeFormWrapper from '../QRCodeFormWrapper'
import { QRFormSubmitData } from '../types'

interface TextFormProps {
  onGenerate?: (data: QRFormSubmitData) => void
  defaultText?: string
  maxLength?: number
}

export default function TextForm({ onGenerate, defaultText = '', maxLength = 500 }: TextFormProps) {
  const [textData, setTextData] = useState(defaultText)
  const [showQR, setShowQR] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value
    setTextData(newText)
    setError(null)

    if (newText.length > maxLength) {
      setError(`Metin ${maxLength} karakterden uzun olamaz`)
      return
    }
  }

  const handleSubmit = (formData: QRFormSubmitData) => {
    if (!textData.trim()) {
      setError('Metin boş olamaz')
      return
    }

    const updatedFormData = {
      ...formData,
      data: textData
    }

    setError(null)
    console.log('Form submitted:', updatedFormData)
    onGenerate?.(updatedFormData)
  }

  const handleShowQR = () => {
    if (!textData.trim()) {
      setError('Metin boş olamaz')
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
        label='Text Message'
        placeholder='Enter your message here'
        variant='outlined'
        value={textData}
        onChange={handleTextChange}
        required
        error={!!error}
        helperText={error || `${textData.length}/${maxLength}`}
        multiline
        rows={6}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <TextFields />
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
        disabled={!!error || !textData.trim()}
      >
        QR Kod Oluştur
      </Button>
    </Stack>
  )

  return (
    <QRCodeFormWrapper
      formContent={formContent}
      data={textData}
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
