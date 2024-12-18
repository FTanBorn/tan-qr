// QRCodeFormWrapper.tsx
import { ReactNode, useState } from 'react'
import { Box, Grid, useTheme } from '@mui/material'
import QrCodeAccordion from './customized/QrCodeAccordion'
import QrCodeGenerator from './QrCodeGenerator'
import { DotType, CornerSquareType, CornerDotType } from 'qr-code-styling'
import { GradientConfig, QRFormSubmitData } from './types'

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
  const theme = useTheme()

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

  // Background Options State
  const [backgroundColor, setBackgroundColor] = useState<string>('#fff')
  const [backgroundGradient, setBackgroundGradient] = useState<GradientConfig | null>(null)

  // Image Options State
  const [imageSource, setImageSource] = useState<string>('')
  const [imageMargin, setImageMargin] = useState<number>(5)
  const [imageSize, setImageSize] = useState<number>(0.4)
  const [hideBackgroundDots, setHideBackgroundDots] = useState<boolean>(false)

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
        cornersDotGradient,
        backgroundColor,
        backgroundGradient,
        imageSource,
        imageMargin,
        imageSize,
        hideBackgroundDots
      }
    })
  }

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box>{formContent}</Box>

          {showQR && data && (
            <Box sx={{ backgroundColor: 'background.paper', borderRadius: 1, mt: 2 }}>
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
                // Background Type
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}
                backgroundGradient={backgroundGradient}
                setBackgroundGradient={setBackgroundGradient}
                // Image Type
                imageSource={imageSource}
                imageMargin={imageMargin}
                imageSize={imageSize}
                hideBackgroundDots={hideBackgroundDots}
                setImageSource={setImageSource}
                setImageMargin={setImageMargin}
                setImageSize={setImageSize}
                setHideBackgroundDots={setHideBackgroundDots}
              />
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={4} display='flex' justifyContent='center' alignItems='center'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '350px',
              width: '350px',
              border: '3px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              backgroundColor: theme.palette.grey[50],
              ...customStyles?.qrContainer
            }}
          >
            {showQR && data ? (
              <QrCodeGenerator
                data={data}
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
                // Background Options
                backgroundColor={backgroundColor}
                backgroundGradient={backgroundGradient}
                // Image Options
                imageSource={imageSource}
                imageMargin={imageMargin}
                imageSize={imageSize}
                hideBackgroundDots={hideBackgroundDots}
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
