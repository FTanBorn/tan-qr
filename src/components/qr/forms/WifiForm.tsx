// WifiForm.tsx
import { useState } from 'react'
import {
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment
} from '@mui/material'
import { Wifi, QrCode2, Visibility, VisibilityOff } from '@mui/icons-material'
import QRCodeFormWrapper from '../QRCodeFormWrapper'
import { EncryptionType, QRFormSubmitData } from '../types'

interface WifiFormData {
  ssid: string
  password: string
  encryption: EncryptionType
  hidden: boolean
}

export default function WifiForm() {
  const [formData, setFormData] = useState<WifiFormData>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const generateWifiString = (data: WifiFormData): string => {
    const { ssid, password, encryption, hidden } = data
    return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden};`
  }

  const handleSubmit = (qrData: QRFormSubmitData) => {
    console.log('Form submitted:', {
      wifiData: formData,
      qrStyles: qrData.qrStyles,
      qrString: generateWifiString(formData)
    })
  }

  const handleChange =
    (field: keyof WifiFormData) => (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value
      }))
    }

  const isPasswordRequired = formData.encryption !== 'nopass'

  const formContent = (
    <Stack spacing={3}>
      <TextField
        fullWidth
        label='Network Name (SSID)'
        placeholder='Enter WiFi network name'
        variant='outlined'
        value={formData.ssid}
        onChange={handleChange('ssid')}
        required
        error={showQR && !formData.ssid}
        helperText={showQR && !formData.ssid ? 'Network name is required' : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Wifi />
            </InputAdornment>
          )
        }}
      />

      <FormControl fullWidth>
        <InputLabel>Şifreleme Türü</InputLabel>
        <Select
          value={formData.encryption}
          label='Encryption Type'
          onChange={e => setFormData(prev => ({ ...prev, encryption: e.target.value as EncryptionType }))}
        >
          <MenuItem value='WPA'>WPA/WPA2</MenuItem>
          <MenuItem value='WEP'>WEP</MenuItem>
          <MenuItem value='nopass'>No password</MenuItem>
        </Select>
      </FormControl>

      {isPasswordRequired && (
        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          label='Password'
          variant='outlined'
          value={formData.password}
          onChange={handleChange('password')}
          required
          error={showQR && !formData.password}
          helperText={showQR && !formData.password ? '' : 'Password required'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      )}

      <FormControl fullWidth>
        <InputLabel>Secret Network</InputLabel>
        <Select
          value={formData.hidden ? 'true' : 'false'}
          label='Secret Network'
          onChange={e =>
            setFormData(prev => ({
              ...prev,
              hidden: e.target.value === 'true'
            }))
          }
        >
          <MenuItem value='false'>No</MenuItem>
          <MenuItem value='true'>Yes</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant='contained'
        size='large'
        type='submit'
        startIcon={<QrCode2 />}
        onClick={() => setShowQR(true)}
        disabled={!formData.ssid || (isPasswordRequired && !formData.password)}
      >
        Generate WiFi QR Code
      </Button>
    </Stack>
  )

  return (
    <QRCodeFormWrapper
      formContent={formContent}
      data={generateWifiString(formData)}
      showQR={showQR}
      onSubmit={handleSubmit}
      customStyles={{
        formContainer: {
          maxWidth: '1200px',
          margin: '0 auto'
        },
        qrContainer: {
          backgroundColor: '#f5f5f5'
        }
      }}
    />
  )
}
