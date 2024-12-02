import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Slider, Stack, Typography } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { qrSquareShapeOptions } from '@/data/dots'
import { useCallback, useEffect, useState } from 'react'
import { CornerSquareType, GradientType } from 'qr-code-styling'
import { ColorType, CornersSquareShapeOption, GradientConfig } from '../../types'
import { ColorSection, ShapeButton } from '../../styles/QrCodeOptions'

const DotShape = ({ type }: { type: CornersSquareShapeOption['type'] }) => {
  const getShapeStyles = () => {
    const baseStyles = {
      width: 24,
      height: 24,
      backgroundColor: '#000',
      transition: 'all 0.2s ease-in-out'
    }

    switch (type) {
      case 'dot':
        return { ...baseStyles, borderRadius: '50%' }
      case 'square':
        return { ...baseStyles, borderRadius: 0 }
      case 'extra-rounded':
        return { ...baseStyles, borderRadius: 12 }
      default:
        return baseStyles
    }
  }

  return <Box sx={getShapeStyles()} />
}

interface CustomizeProps {
  cornersSquareColor: string
  cornersSquareType: CornerSquareType
  cornersSquareGradient: GradientConfig | null
  setCornerSquareColor: (color: string) => void
  setCornersSquareType: (val: CornerSquareType) => void
  setCornersSquareGradient: (gradient: GradientConfig | null) => void
}

export default function QrCodeCornersSquareOptions(props: CustomizeProps) {
  const {
    cornersSquareColor,
    cornersSquareType,
    setCornerSquareColor,
    setCornersSquareGradient,
    setCornersSquareType
  } = props

  const [colorType, setColorType] = useState<ColorType>('single')
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  const [gradientColorOne, setGradientColorOne] = useState('#000000')
  const [gradientColorTwo, setGradientColorTwo] = useState('#4B0082')
  const [gradientRotation, setGradientRotation] = useState(0)

  // Event handlers
  const handleChangeDotColor = useCallback(
    (color: string) => {
      setCornerSquareColor(color)
    },
    [setCornerSquareColor]
  )

  const handleChangeGradientColorOne = useCallback((color: string) => {
    setGradientColorOne(color)
  }, [])

  const handleChangeGradientColorTwo = useCallback((color: string) => {
    setGradientColorTwo(color)
  }, [])

  const handleChangeColorType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColorType(event.target.value as ColorType)
  }

  const handleChangeGradientType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGradientType(event.target.value as GradientType)
  }

  const handleChangeGradientRotation = (event: Event, newValue: number | number[]) => {
    setGradientRotation(newValue as number)
  }

  // Gradient effect
  useEffect(() => {
    if (colorType === 'gradient') {
      const gradientConfig: GradientConfig = {
        type: gradientType,
        rotation: gradientRotation,
        colorStops: [
          { offset: 0, color: gradientColorOne },
          { offset: 1, color: gradientColorTwo }
        ]
      }
      setCornersSquareGradient(gradientConfig)
    } else {
      setCornersSquareGradient(null)
    }
  }, [colorType, gradientType, gradientColorOne, gradientColorTwo, gradientRotation, setCornersSquareGradient])

  return (
    <Box sx={{ p: 2 }}>
      {/* Shape Selection */}
      <Typography variant='subtitle1' gutterBottom>
        Corner Shape
      </Typography>
      <Stack direction='row' spacing={2} mb={3}>
        {qrSquareShapeOptions.map(shape => (
          <ShapeButton
            key={shape.id}
            onClick={() => setCornersSquareType(shape.type)}
            className={cornersSquareType === shape.type ? 'selected' : ''}
          >
            <DotShape type={shape.type} />
          </ShapeButton>
        ))}
      </Stack>

      {/* Color Type Selection */}
      <ColorSection>
        <Typography variant='subtitle1'>Color Type</Typography>
        <FormControl>
          <RadioGroup value={colorType} onChange={handleChangeColorType} row>
            <FormControlLabel value='single' control={<Radio />} label='Single Color' />
            <FormControlLabel value='gradient' control={<Radio />} label='Gradient' />
          </RadioGroup>
        </FormControl>

        {/* Color Selection */}
        {colorType === 'single' ? (
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography>Color:</Typography>
            <MuiColorInput
              value={cornersSquareColor}
              onChange={handleChangeDotColor}
              size='small'
              sx={{ minWidth: 200 }}
            />
          </Stack>
        ) : (
          <Stack spacing={3}>
            {/* Gradient Type */}
            <FormControl>
              <Typography variant='subtitle2' gutterBottom>
                Gradient Type
              </Typography>
              <RadioGroup value={gradientType} onChange={handleChangeGradientType} row>
                <FormControlLabel value='linear' control={<Radio />} label='Linear' />
                <FormControlLabel value='radial' control={<Radio />} label='Radial' />
              </RadioGroup>
            </FormControl>

            {/* Gradient Colors */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <MuiColorInput
                label='Color 1'
                value={gradientColorOne}
                onChange={handleChangeGradientColorOne}
                size='small'
                sx={{ minWidth: 200 }}
              />
              <MuiColorInput
                label='Color 2'
                value={gradientColorTwo}
                onChange={handleChangeGradientColorTwo}
                size='small'
                sx={{ minWidth: 200 }}
              />
            </Stack>

            {/* Gradient Rotation */}
            {gradientType === 'linear' && (
              <Box>
                <Typography variant='subtitle2' gutterBottom>
                  Angle: {gradientRotation}°
                </Typography>
                <Slider
                  value={gradientRotation}
                  onChange={handleChangeGradientRotation}
                  valueLabelDisplay='auto'
                  step={30}
                  marks
                  min={0}
                  max={360}
                />
              </Box>
            )}
          </Stack>
        )}
      </ColorSection>
    </Box>
  )
}
