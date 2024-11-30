// src/components/qr/QRGenerator.tsx
'use client'

import { Box, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Slider, Stack, Typography } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { qrShapeOptions } from '@/data/dots'
import { useCallback, useEffect, useState } from 'react'
import { DotType } from 'qr-code-styling'

interface ShapeOption {
  id: number
  type: 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded'
  label: string
}

type GradientType = 'linear' | 'radial'

interface GradientConfig {
  type: GradientType
  rotation: number
  colorStops: Array<{
    offset: number
    color: string
  }>
}

const DotShape = ({ type }: { type: ShapeOption['type'] }) => {
  const getShapeStyles = () => {
    const baseStyles = {
      width: 24,
      height: 24,
      backgroundColor: '#000'
    }

    switch (type) {
      case 'dots':
        return { ...baseStyles, borderRadius: '50%' }
      case 'rounded':
        return { ...baseStyles, borderRadius: 8 }
      case 'classy':
        return { ...baseStyles, transform: 'rotate(45deg)' }
      case 'classy-rounded':
        return { ...baseStyles, borderRadius: 8, transform: 'rotate(45deg)' }
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
  dotColor: string
  dotType: DotType
  dotGradient: GradientConfig | null

  setDotColor: (color: string) => void
  setDotType: (type: DotType) => void
  setDotGradient: (gradient: GradientConfig | null) => void
}

export default function QrCodeDotOptions(props: CustomizeProps) {
  const { dotColor, dotType } = props
  const { setDotColor, setDotType, setDotGradient } = props

  const [colorType, setColorType] = useState<'single' | 'gradient'>('single')
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  const [gradientColorOne, setGradientColorOne] = useState('#000000')
  const [gradientColorTwo, setGradientColorTwo] = useState('#4B0082')
  const [gradientRotation, setGradientRotation] = useState(0)

  const handleChangeDotColor = (color: string) => {
    setDotColor(color)
  }

  const handleChangeGradientColorOne = useCallback((color: string) => {
    setGradientColorOne(color)
  }, [])

  const handleChangeGradientColorTwo = useCallback((color: string) => {
    setGradientColorTwo(color)
  }, [])

  const handleChangeColorType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as 'single' | 'gradient'
    setColorType(value)
  }

  const handleChangeGradientType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as 'linear' | 'radial'
    setGradientType(value)
  }

  const handleChangeGradientRotation = (event: Event, newValue: number | number[]) => {
    setGradientRotation(newValue as number)
  }

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
      setDotGradient(gradientConfig)
    } else {
      setDotGradient(null)
    }
  }, [colorType, gradientType, gradientColorOne, gradientColorTwo, gradientRotation, setDotGradient])

  return (
    <Grid container p={1} spacing={2}>
      <Stack direction={'row'} spacing={0.5} mt={1} alignItems={'center'}>
        <Typography>Dot Options:</Typography>
        {qrShapeOptions.map(shape => (
          <Box
            key={shape.id}
            onClick={() => setDotType(shape.type)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 1,
              mr: 2,
              border: dotType === shape.type ? '1px solid #000' : '1px solid #e0e0e0',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#f5f5f5',
                cursor: 'pointer'
              }
            }}
          >
            <DotShape type={shape.type} />
          </Box>
        ))}
      </Stack>

      <Stack direction={'row'} spacing={0.5} mt={1} alignItems={'center'}>
        <Typography>Color Type:</Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby='demo-controlled-radio-buttons-group'
            name='controlled-radio-buttons-group'
            value={colorType}
            onChange={handleChangeColorType}
          >
            <Stack direction={'row'} spacing={2}>
              <FormControlLabel value='single' control={<Radio />} label='Single Color' />
              <FormControlLabel value='gradient' control={<Radio />} label='Color gradient' />
            </Stack>
          </RadioGroup>
        </FormControl>
      </Stack>

      {colorType === 'single' ? (
        <Stack direction={'row'} spacing={0.5} mt={1} alignItems={'center'}>
          <Typography>Dot Color:</Typography>
          <MuiColorInput
            sx={{ width: '200 px' }}
            size='small'
            placeholder='Color'
            value={dotColor}
            onChange={handleChangeDotColor}
          />
        </Stack>
      ) : (
        <Stack direction={'column'} spacing={0.5}>
          <Stack direction={'row'} alignItems={'center'}>
            <Typography>Gradient Type:</Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='controlled-radio-buttons-group'
                value={gradientType}
                onChange={handleChangeGradientType}
              >
                <Stack direction={'row'} spacing={2}>
                  <FormControlLabel value='linear' control={<Radio />} label='Linear' />
                  <FormControlLabel value='radial' control={<Radio />} label='Radial' />
                </Stack>
              </RadioGroup>
            </FormControl>
          </Stack>

          <Stack direction={'row'}>
            <Typography>Dots Gradient:</Typography>
            <MuiColorInput
              sx={{ width: '200 px' }}
              size='small'
              placeholder='Color'
              value={gradientColorOne}
              onChange={handleChangeGradientColorOne}
            />
            <MuiColorInput
              sx={{ width: '200 px' }}
              size='small'
              placeholder='Color'
              value={gradientColorTwo}
              onChange={handleChangeGradientColorTwo}
            />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <Typography>Rotation:</Typography>
            <Slider
              aria-label='Temperature'
              value={gradientRotation}
              onChange={handleChangeGradientRotation}
              valueLabelDisplay='auto'
              shiftStep={30}
              step={30}
              marks
              min={0}
              max={360}
            />
          </Stack>
        </Stack>
      )}
    </Grid>
  )
}
