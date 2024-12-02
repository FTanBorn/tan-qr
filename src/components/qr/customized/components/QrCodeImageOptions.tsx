import { Slider, Stack, Typography, Switch, FormControlLabel, Button, styled, Box } from '@mui/material'
import { CloudUpload, Delete } from '@mui/icons-material'
import { ChangeEvent, useRef } from 'react'
import Image from 'next/image'

// Styled Components
const StyledImagePreview = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '100px',
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  position: 'relative',
  alignItems: 'center'
}))

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const SliderContainer = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  '& .MuiSlider-markLabel': {
    fontSize: '0.75rem'
  }
}))

interface CustomizeProps {
  imageSource: string
  imageMargin: number
  imageSize: number
  hideBackgroundDots: boolean
  setImageSource: (source: string) => void
  setImageMargin: (margin: number) => void
  setImageSize: (size: number) => void
  setHideBackgroundDots: (hide: boolean) => void
}

export default function QrCodeImageOptions({
  imageSource,
  imageMargin,
  imageSize,
  hideBackgroundDots,
  setImageSource,
  setImageMargin,
  setImageSize,
  setHideBackgroundDots
}: CustomizeProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImageSource(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveLogo = () => {
    setImageSource('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='subtitle1' gutterBottom>
        Logo Settings
      </Typography>

      <Stack spacing={3}>
        <Stack direction='row' spacing={2}>
          <Button component='label' variant='contained' startIcon={<CloudUpload />} size='small' sx={{ minWidth: 120 }}>
            Upload Logo
            <VisuallyHiddenInput ref={fileInputRef} type='file' accept='image/*' onChange={handleFileUpload} />
          </Button>

          {imageSource && (
            <Button
              variant='outlined'
              color='error'
              startIcon={<Delete />}
              onClick={handleRemoveLogo}
              size='small'
              sx={{ minWidth: 120 }}
            >
              Remove Logo
            </Button>
          )}
        </Stack>

        {imageSource && (
          <Stack spacing={3}>
            <StyledImagePreview>
              <Image
                src={imageSource}
                alt='Selected Logo'
                fill
                style={{ objectFit: 'contain' }}
                unoptimized={imageSource.startsWith('data:')}
              />
            </StyledImagePreview>

            <SliderContainer spacing={1}>
              <Typography variant='subtitle2'>Logo Size</Typography>
              <Slider
                value={imageSize}
                onChange={(_, value) => setImageSize(value as number)}
                min={0.1}
                max={1}
                step={0.1}
                marks
                valueLabelDisplay='auto'
                valueLabelFormat={value => `${value * 100}%`}
              />
            </SliderContainer>

            <SliderContainer spacing={1}>
              <Typography variant='subtitle2'>Logo Margin</Typography>
              <Slider
                value={imageMargin}
                onChange={(_, value) => setImageMargin(value as number)}
                min={0}
                max={20}
                step={1}
                marks
                valueLabelDisplay='auto'
                valueLabelFormat={value => `${value}px`}
              />
            </SliderContainer>

            <FormControlLabel
              control={<Switch checked={hideBackgroundDots} onChange={e => setHideBackgroundDots(e.target.checked)} />}
              label='Hide Background Dots Behind Logo'
              sx={{ mt: 1 }}
            />
          </Stack>
        )}
      </Stack>
    </Box>
  )
}
