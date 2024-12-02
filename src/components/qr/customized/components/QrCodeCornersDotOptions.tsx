'use client'

import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Slider, Stack, Typography } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { qrDotShapeOptions } from '@/data/dots'
import { useCallback, useEffect, useState } from 'react'
import { CornerDotType, GradientType } from 'qr-code-styling'
import { ColorType, CornersDotShapeOption, GradientConfig } from '../../types'
import { ShapeButton, StyledSection } from '../../styles/QrCodeOptions'

const DotShape = ({ type }: { type: CornersDotShapeOption['type'] }) => {
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
      default:
        return baseStyles
    }
  }

  return <Box sx={getShapeStyles()} />
}

interface CustomizeProps {
  cornersDotColor: string
  cornersDotType: CornerDotType
  cornersDotGradient: GradientConfig | null
  setCornersDotColor: (color: string) => void
  setCornersDotType: (val: CornerDotType) => void
  setCornersDotGradient: (gradient: GradientConfig | null) => void
}

export default function QrCodeCornersDotOptions(props: CustomizeProps) {
  const { cornersDotColor, cornersDotType, setCornersDotColor, setCornersDotGradient, setCornersDotType } = props

  // State declarations
  const [colorType, setColorType] = useState<ColorType>('single')
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  const [gradientColorOne, setGradientColorOne] = useState('#000000')
  const [gradientColorTwo, setGradientColorTwo] = useState('#4B0082')
  const [gradientRotation, setGradientRotation] = useState(0)

  // Event handlers
  const handleChangeDotColor = useCallback(
    (color: string) => {
      setCornersDotColor(color)
    },
    [setCornersDotColor]
  )

  const handleChangeGradientColorOne = useCallback((color: string) => {
    setGradientColorOne(color)
  }, [])

  const handleChangeGradientColorTwo = useCallback((color: string) => {
    setGradientColorTwo(color)
  }, [])

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
      setCornersDotGradient(gradientConfig)
    } else {
      setCornersDotGradient(null)
    }
  }, [colorType, gradientType, gradientColorOne, gradientColorTwo, gradientRotation, setCornersDotGradient])

  return (
    <Box sx={{ p: 2 }}>
      {/* Shape Selection */}
      <StyledSection>
        <Typography variant='subtitle1'>Dot Shape</Typography>
        <Stack direction='row' spacing={2}>
          {qrDotShapeOptions.map(shape => (
            <ShapeButton
              key={shape.id}
              onClick={() => setCornersDotType(shape.type)}
              className={cornersDotType === shape.type ? 'selected' : ''}
            >
              <DotShape type={shape.type} />
            </ShapeButton>
          ))}
        </Stack>
      </StyledSection>

      {/* Color Type Selection */}
      <StyledSection>
        <Typography variant='subtitle1'>Color Type</Typography>
        <FormControl>
          <RadioGroup row value={colorType} onChange={e => setColorType(e.target.value as ColorType)}>
            <FormControlLabel value='single' control={<Radio />} label='Single Color' />
            <FormControlLabel value='gradient' control={<Radio />} label='Gradient' />
          </RadioGroup>
        </FormControl>

        {/* Color Selection */}
        {colorType === 'single' ? (
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography>Color:</Typography>
            <MuiColorInput
              value={cornersDotColor}
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
              <RadioGroup row value={gradientType} onChange={e => setGradientType(e.target.value as GradientType)}>
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
                  onChange={(_, value) => setGradientRotation(value as number)}
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
      </StyledSection>
    </Box>
  )
}
