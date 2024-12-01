// src/components/qr/QRGenerator.tsx
'use client'

import { Box, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Slider, Stack, Typography } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { qrDotShapeOptions } from '@/data/dots'
import { useCallback, useEffect, useState } from 'react'
import { CornerDotType, GradientType } from 'qr-code-styling'
import { ColorType, CornersDotShapeOption, GradientConfig } from '../../types'

const DotShape = ({ type }: { type: CornersDotShapeOption['type'] }) => {
  const getShapeStyles = () => {
    const baseStyles = {
      width: 24,
      height: 24,
      backgroundColor: '#000'
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
  const { cornersDotColor, cornersDotType } = props
  const { setCornersDotColor, setCornersDotGradient, setCornersDotType } = props

  const [colorType, setColorType] = useState<ColorType>('single')
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  const [gradientColorOne, setGradientColorOne] = useState('#000000')
  const [gradientColorTwo, setGradientColorTwo] = useState('#4B0082')
  const [gradientRotation, setGradientRotation] = useState(0)

  const handleChangeDotColor = (color: string) => {
    setCornersDotColor(color)
  }

  const handleChangeGradientColorOne = useCallback((color: string) => {
    setGradientColorOne(color)
  }, [])

  const handleChangeGradientColorTwo = useCallback((color: string) => {
    setGradientColorTwo(color)
  }, [])

  const handleChangeColorType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as ColorType
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
      setCornersDotGradient(gradientConfig)
    } else {
      setCornersDotGradient(null)
    }
  }, [colorType, gradientType, gradientColorOne, gradientColorTwo, gradientRotation, setCornersDotGradient])

  return (
    <Grid container p={1} spacing={2}>
      <Stack direction={'row'} spacing={0.5} mt={1} alignItems={'center'}>
        <Typography>Dot Options:</Typography>
        {qrDotShapeOptions.map(shape => (
          <Box
            key={shape.id}
            onClick={() => setCornersDotType(shape.type)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 1,
              mr: 2,
              border: cornersDotType === shape.type ? '1px solid #000' : '1px solid #e0e0e0',
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
            value={cornersDotColor}
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
