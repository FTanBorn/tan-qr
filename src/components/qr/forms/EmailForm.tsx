// EmailForm.tsx
import { useState, useCallback } from 'react'
import { TextField, Button, Stack, Alert, InputAdornment } from '@mui/material'
import { QrCode2, Email, Subject, Message } from '@mui/icons-material'
import QRCodeFormWrapper from '../QRCodeFormWrapper'
import { QRFormSubmitData } from '../types'

interface EmailFormProps {
  onGenerate?: (data: QRFormSubmitData) => void
  defaultEmail?: string
}

interface EmailData {
  to: string
  subject: string
  body: string
}

export default function EmailForm({ onGenerate, defaultEmail = '' }: EmailFormProps) {
  const [emailData, setEmailData] = useState<EmailData>({
    to: defaultEmail,
    subject: '',
    body: ''
  })
  const [showQR, setShowQR] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatEmailString = (data: EmailData): string => {
    const { to, subject, body } = data
    const encodedSubject = encodeURIComponent(subject)
    const encodedBody = encodeURIComponent(body)
    return `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`
  }

  const validateEmail = useCallback((email: string): boolean => {
    if (!email.trim()) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }, [])

  const handleEmailChange = (field: keyof EmailData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setEmailData(prev => ({ ...prev, [field]: newValue }))
    setError(null)

    if (field === 'to' && newValue.trim() && !validateEmail(newValue)) {
      setError('Geçerli bir email adresi giriniz')
    }
  }

  const handleSubmit = (formData: QRFormSubmitData) => {
    if (!emailData.to.trim()) {
      setError('Email adresi boş olamaz')
      return
    }

    if (!validateEmail(emailData.to)) {
      setError('Geçerli bir email adresi giriniz')
      return
    }

    const formattedEmail = formatEmailString(emailData)
    const updatedFormData = {
      ...formData,
      data: formattedEmail
    }

    setError(null)
    console.log('Form submitted:', updatedFormData)
    onGenerate?.(updatedFormData)
  }

  const handleShowQR = () => {
    if (!emailData.to.trim()) {
      setError('Email adresi boş olamaz')
      return
    }

    if (!validateEmail(emailData.to)) {
      setError('Geçerli bir email adresi giriniz')
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
        label='Email Address'
        placeholder='example@domain.com'
        variant='outlined'
        value={emailData.to}
        onChange={handleEmailChange('to')}
        required
        error={!!error}
        helperText={error}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Email />
            </InputAdornment>
          )
        }}
      />

      <TextField
        fullWidth
        label='Subject'
        placeholder='Email subject'
        variant='outlined'
        value={emailData.subject}
        onChange={handleEmailChange('subject')}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Subject />
            </InputAdornment>
          )
        }}
      />

      <TextField
        fullWidth
        label='Message'
        placeholder='Email body'
        variant='outlined'
        value={emailData.body}
        onChange={handleEmailChange('body')}
        multiline
        rows={4}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Message />
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
        disabled={!!error || !emailData.to.trim()}
      >
        QR Kod Oluştur
      </Button>
    </Stack>
  )

  return (
    <QRCodeFormWrapper
      formContent={formContent}
      data={formatEmailString(emailData)}
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
