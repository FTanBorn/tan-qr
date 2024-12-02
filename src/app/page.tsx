import QRGeneratorPage from '@/components/qr/QRGeneratorPage'
import { Typography, Box } from '@mui/material'

export default function Home() {
  return (
    <Box sx={{ my: 5 }}>
      <Typography variant='h3' component='h1' align='center' gutterBottom>
        QR Code Generator
      </Typography>
      <QRGeneratorPage />
    </Box>
  )
}
