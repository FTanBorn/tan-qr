// QRCodeFormWrapper.tsx
import { ReactNode, useState } from 'react'
import { Box, Grid } from '@mui/material'
import QrCodeAccordion from './customized/QrCodeAccordion'
import QrCodeGenerator from './QrCodeGenerator'
import { DotType, CornerSquareType } from 'qr-code-styling'
import { GradientConfig } from './types'

interface QRStyleOptions {
  dotColor: string
  dotShape: string
  dotType: DotType
  cornersSquareType: CornerSquareType
  cornerSquareColor: string
  cornersDotColor: string
  dotGradient: GradientConfig | null
  cornersSquareGradient: GradientConfig | null
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
  const [dotShape, setDotShape] = useState<string>('')
  const [dotType, setDotType] = useState<DotType>('rounded')
  const [dotGradient, setDotGradient] = useState<GradientConfig | null>(null)

  // Corner Square Options State
  const [cornerSquareColor, setCornerSquareColor] = useState<string>('#000')
  const [cornersDotColor, setCornersDotColor] = useState<string>('')
  const [cornersSquareType, setCornersSquareType] = useState<CornerSquareType>('square')
  const [cornersSquareGradient, setCornersSquareGradient] = useState<GradientConfig | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      data,
      qrStyles: {
        dotColor,
        dotShape,
        dotType,
        cornersSquareType,
        cornerSquareColor,
        cornersDotColor,
        dotGradient,
        cornersSquareGradient
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
                dotColor={dotColor}
                cornerSquareColor={cornerSquareColor}
                cornersDotColor={cornersDotColor}
                dotShape={dotShape}
                dotType={dotType}
                dotGradient={dotGradient}
                cornersSquareType={cornersSquareType}
                cornersSquareGradient={cornersSquareGradient}
                setDotColor={setDotColor}
                setCornerSquareColor={setCornerSquareColor}
                setCornersDotColor={setCornersDotColor}
                setDotShape={setDotShape}
                setDotType={setDotType}
                setDotGradient={setDotGradient}
                setCornersSquareType={setCornersSquareType}
                setCornersSquareGradient={setCornersSquareGradient}
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
                dotType={dotType}
                cornersSquareType={cornersSquareType}
                cornersSquareGradient={cornersSquareGradient}
                dotGradient={dotGradient}
                dotColor={dotColor}
                backgroundColor={'#fff'}
                cornerSquareColor={cornerSquareColor}
                cornersDotColor={cornersDotColor}
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
