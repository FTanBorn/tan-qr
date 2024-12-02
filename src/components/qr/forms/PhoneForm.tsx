// PhoneForm.tsx
import { useState } from 'react'
import { TextField, Button, Stack, Alert, InputAdornment } from '@mui/material'
import { QrCode2, Phone } from '@mui/icons-material'
import QRCodeFormWrapper from '../QRCodeFormWrapper'
import { QRFormSubmitData } from '../types'

interface PhoneFormProps {
  onGenerate?: (data: QRFormSubmitData) => void
  defaultPhone?: string
}

export default function PhoneForm({ onGenerate, defaultPhone = '' }: PhoneFormProps) {
  const [phoneNumber, setPhoneNumber] = useState(defaultPhone)
  const [showQR, setShowQR] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatPhoneNumber = (): string => {
    return `tel:${phoneNumber}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
    setError(null)
  }

  const handleSubmit = (formData: QRFormSubmitData) => {
    if (!phoneNumber.trim()) {
      setError('Phone number cannot be empty')
      return
    }

    const formattedPhone = formatPhoneNumber()
    const updatedFormData = {
      ...formData,
      data: formattedPhone
    }

    setError(null)
    console.log('Form submitted:', updatedFormData)
    onGenerate?.(updatedFormData)
  }

  const handleShowQR = () => {
    if (!phoneNumber.trim()) {
      setError('Phone number cannot be empty')
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
        label='Phone Number'
        placeholder='Enter phone number'
        variant='outlined'
        value={phoneNumber}
        onChange={handlePhoneChange}
        required
        error={!!error}
        helperText={error}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Phone />
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
        disabled={!phoneNumber.trim()}
      >
        Generate QR Code
      </Button>
    </Stack>
  )

  return (
    <QRCodeFormWrapper
      formContent={formContent}
      data={formatPhoneNumber()}
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
