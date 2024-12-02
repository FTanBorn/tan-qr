'use client'

import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Slider, Stack, Typography, styled } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { useCallback, useEffect, useState } from 'react'
import { GradientType } from 'qr-code-styling'
import { ColorType, GradientConfig } from '../../types'

// Styled Components
const StyledSection = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}))

const ColorInputWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}))

interface CustomizeProps {
  backgroundColor: string
  backgroundGradient: GradientConfig | null
  setBackgroundColor: (color: string) => void
  setBackgroundGradient: (gradient: GradientConfig | null) => void
}

export default function QrCodeBackgroundOptions(props: CustomizeProps) {
  const { backgroundColor, setBackgroundColor, setBackgroundGradient } = props

  const [colorType, setColorType] = useState<ColorType>('single')
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  const [gradientColorOne, setGradientColorOne] = useState('#000000')
  const [gradientColorTwo, setGradientColorTwo] = useState('#4B0082')
  const [gradientRotation, setGradientRotation] = useState(0)

  const handleChangeBackgroundColor = useCallback(
    (color: string) => {
      setBackgroundColor(color)
    },
    [setBackgroundColor]
  )

  const handleChangeGradientColorOne = useCallback((color: string) => {
    setGradientColorOne(color)
  }, [])

  const handleChangeGradientColorTwo = useCallback((color: string) => {
    setGradientColorTwo(color)
  }, [])

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
      setBackgroundGradient(gradientConfig)
    } else {
      setBackgroundGradient(null)
    }
  }, [colorType, gradientType, gradientColorOne, gradientColorTwo, gradientRotation, setBackgroundGradient])

  return (
    <Box sx={{ p: 2 }}>
      <StyledSection>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Typography>Color Type:</Typography>
          <FormControl>
            <RadioGroup row value={colorType} onChange={e => setColorType(e.target.value as ColorType)}>
              <FormControlLabel value='single' control={<Radio />} label='Single Color' />
              <FormControlLabel value='gradient' control={<Radio />} label='Color gradient' />
            </RadioGroup>
          </FormControl>
        </Stack>

        {colorType === 'single' ? (
          <ColorInputWrapper>
            <Typography>Dot Color:</Typography>
            <MuiColorInput
              value={backgroundColor}
              onChange={handleChangeBackgroundColor}
              size='small'
              sx={{ minWidth: 200 }}
            />
          </ColorInputWrapper>
        ) : (
          <Stack spacing={3}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography>Gradient Type:</Typography>
              <FormControl>
                <RadioGroup row value={gradientType} onChange={e => setGradientType(e.target.value as GradientType)}>
                  <FormControlLabel value='linear' control={<Radio />} label='Linear' />
                  <FormControlLabel value='radial' control={<Radio />} label='Radial' />
                </RadioGroup>
              </FormControl>
            </Stack>

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

            {gradientType === 'linear' && (
              <Box>
                <Typography gutterBottom>Rotation: {gradientRotation}°</Typography>
                <Slider
                  value={gradientRotation}
                  onChange={(_, value) => setGradientRotation(value as number)}
                  valueLabelDisplay='auto'
                  step={30}
                  marks
                  min={0}
                  max={360}
                  sx={{ width: '100%', maxWidth: 400 }}
                />
              </Box>
            )}
          </Stack>
        )}
      </StyledSection>
    </Box>
  )
}
