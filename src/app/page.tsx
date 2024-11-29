import QRGeneratorPage from '@/components/qr/QRGeneratorPage'
import { Container, Typography, Box } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth='lg'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h3' component='h1' align='center' gutterBottom>
          QR Kod Oluşturucu
        </Typography>
        <QRGeneratorPage />
      </Box>
    </Container>
  )
}
