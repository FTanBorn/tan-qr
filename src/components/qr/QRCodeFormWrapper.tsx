// QRCodeFormWrapper.tsx
import { ReactNode, useState } from 'react'
import { Box, Grid } from '@mui/material'
import QrCodeAccordion from './customized/QrCodeAccordion'
import QrCodeGenerator from './QrCodeGenerator'
import { DotType, CornerSquareType, CornerDotType } from 'qr-code-styling'
import { GradientConfig } from './types'

interface QRStyleOptions {
  dotColor: string
  dotType: DotType
  dotGradient: GradientConfig | null

  cornersSquareColor: string
  cornersSquareType: CornerSquareType
  cornersSquareGradient: GradientConfig | null

  cornersDotColor: string
  cornersDotType: CornerDotType
  cornersDotGradient: GradientConfig | null
}

interface QRFormSubmitData {
  data: string
  qrStyles: QRStyleOptions
}

interface QRCodeFormWrapperProps {
  formContent: ReactNode
  data: string
  showQR: boolean
  onSubmit: (data: QRFormSubmitData) => void
  customStyles?: {
    formContainer?: React.CSSProperties
    qrContainer?: React.CSSProperties
  }
}

export default function QRCodeFormWrapper({
  formContent,
  data,
  showQR,
  onSubmit,
  customStyles
}: QRCodeFormWrapperProps) {
  // Dot Options State
  const [dotColor, setDotColor] = useState<string>('#000')
  const [dotType, setDotType] = useState<DotType>('rounded')
  const [dotGradient, setDotGradient] = useState<GradientConfig | null>(null)

  // Corner Square Options State
  const [cornersSquareColor, setCornerSquareColor] = useState<string>('#000')
  const [cornersSquareType, setCornersSquareType] = useState<CornerSquareType>('square')
  const [cornersSquareGradient, setCornersSquareGradient] = useState<GradientConfig | null>(null)

  // Corner Dot Options State
  const [cornersDotColor, setCornersDotColor] = useState<string>('#000')
  const [cornersDotType, setCornersDotType] = useState<CornerDotType>('square')
  const [cornersDotGradient, setCornersDotGradient] = useState<GradientConfig | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      data,
      qrStyles: {
        dotColor,
        dotType,
        dotGradient,
        cornersSquareType,
        cornersSquareColor,
        cornersSquareGradient,
        cornersDotColor,
        cornersDotType,
        cornersDotGradient
      }
    })
  }

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate style={customStyles?.formContainer}>
      <Grid container justifyContent={'space-between'}>
        <Grid item xs={12} md={7}>
          <div>{formContent}</div>
          <div>
            {showQR && data && (
              <QrCodeAccordion
                // Dot Type
                dotColor={dotColor}
                setDotColor={setDotColor}
                dotType={dotType}
                setDotType={setDotType}
                dotGradient={dotGradient}
                setDotGradient={setDotGradient}
                // Corners Square Type
                cornersSquareColor={cornersSquareColor}
                setCornerSquareColor={setCornerSquareColor}
                cornersSquareType={cornersSquareType}
                setCornersSquareType={setCornersSquareType}
                cornersSquareGradient={cornersSquareGradient}
                setCornersSquareGradient={setCornersSquareGradient}
                // Corners Dot Type
                cornersDotColor={cornersDotColor}
                setCornersDotColor={setCornersDotColor}
                cornersDotType={cornersDotType}
                setCornersDotType={setCornersDotType}
                cornersDotGradient={cornersDotGradient}
                setCornersDotGradient={setCornersDotGradient}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={5} justifyContent={'center'} alignItems={'center'} display={'flex'}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 6,
              height: '350px',
              width: '350px',
              border: '4px dashed grey',
              borderRadius: 3,
              ...customStyles?.qrContainer
            }}
          >
            {showQR && data ? (
              <QrCodeGenerator
                data={data}
                backgroundColor={'#fff'}
                // Dot Options
                dotType={dotType}
                dotColor={dotColor}
                dotGradient={dotGradient}
                // Corners Square Options
                cornersSquareType={cornersSquareType}
                cornersSquareColor={cornersSquareColor}
                cornersSquareGradient={cornersSquareGradient}
                // Corners Dot Options
                cornersDotColor={cornersDotColor}
                cornersDotType={cornersDotType}
                cornersDotGradient={cornersDotGradient}
              />
            ) : (
              'QR Code'
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
