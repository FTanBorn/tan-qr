// LocationForm.tsx
import { useState } from 'react'
import { TextField, Button, Stack, Alert, InputAdornment } from '@mui/material'
import { QrCode2, LocationOn } from '@mui/icons-material'
import QRCodeFormWrapper from '../QRCodeFormWrapper'
import { QRFormSubmitData } from '../types'

interface LocationFormProps {
  onGenerate?: (data: QRFormSubmitData) => void
}

export default function LocationForm({ onGenerate }: LocationFormProps) {
  const [location, setLocation] = useState({
    latitude: '',
    longitude: ''
  })
  const [showQR, setShowQR] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatLocation = (): string => {
    return `geo:${location.latitude},${location.longitude}`
  }

  const handleLocationChange = (field: 'latitude' | 'longitude') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(prev => ({ ...prev, [field]: e.target.value }))
    setError(null)
  }

  const handleSubmit = (formData: QRFormSubmitData) => {
    if (!location.latitude.trim() || !location.longitude.trim()) {
      setError('All fields must be filled')
      return
    }

    const formattedLocation = formatLocation()
    const updatedFormData = {
      ...formData,
      data: formattedLocation
    }

    setError(null)
    console.log('Form submitted:', updatedFormData)
    onGenerate?.(updatedFormData)
  }

  const handleShowQR = () => {
    if (!location.latitude.trim() || !location.longitude.trim()) {
      setError('All fields must be filled')
      return
    }

    setError(null)
    setShowQR(true)
  }

  const formContent = (
    <Stack spacing={3}>
      {error && <Alert severity='error'>{error}</Alert>}

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          fullWidth
          label='Latitude'
          placeholder='Enter latitude'
          variant='outlined'
          value={location.latitude}
          onChange={handleLocationChange('latitude')}
          required
          error={!!error && !location.latitude}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <LocationOn />
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label='Longitude'
          placeholder='Enter longitude'
          variant='outlined'
          value={location.longitude}
          onChange={handleLocationChange('longitude')}
          required
          error={!!error && !location.longitude}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <LocationOn />
              </InputAdornment>
            )
          }}
        />
      </Stack>

      <Button
        variant='contained'
        size='large'
        type='submit'
        startIcon={<QrCode2 />}
        onClick={handleShowQR}
        disabled={!location.latitude.trim() || !location.longitude.trim()}
      >
        Generate QR Code
      </Button>
    </Stack>
  )

  return (
    <QRCodeFormWrapper
      formContent={formContent}
      data={formatLocation()}
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
