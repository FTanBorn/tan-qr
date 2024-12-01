// src/components/qr/accordion/components/QrCodeDotOptions.tsx
import { styled } from '@mui/material/styles'
import { Box, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Slider, Stack, Typography } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { qrShapeOptions } from '@/data/dots'
import { useCallback, useEffect, useState } from 'react'
import { DotType, GradientType } from 'qr-code-styling'
import { ColorType, GradientConfig } from '../../types'
import { ShapeButton, ShapePreview } from '../../styles/QrCodeOptions'

const ColorSection = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}))

// Props Interface
interface CustomizeProps {
  dotColor: string
  dotType: DotType
  dotGradient: GradientConfig | null
  setDotColor: (color: string) => void
  setDotType: (type: DotType) => void
  setDotGradient: (gradient: GradientConfig | null) => void
}

export default function QrCodeDotOptions(props: CustomizeProps) {
  const { dotColor, dotType, setDotColor, setDotType, setDotGradient } = props

  // Local States
  const [colorType, setColorType] = useState<ColorType>('single')
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  const [gradientColorOne, setGradientColorOne] = useState('#000000')
  const [gradientColorTwo, setGradientColorTwo] = useState('#4B0082')
  const [gradientRotation, setGradientRotation] = useState(0)

  // Event Handlers
  const handleChangeDotColor = useCallback(
    (color: string) => {
      setDotColor(color)
    },
    [setDotColor]
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

  // Gradient Effect
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
    <Stack spacing={3}>
      {/* Dot Shape Selection */}
      <Box>
        <Typography variant='subtitle2' gutterBottom>
          Shape Style
        </Typography>
        <Grid container spacing={0.5}>
          {qrShapeOptions.map(shape => (
            <Grid item xs={4} sm={2} key={shape.id}>
              <ShapeButton onClick={() => setDotType(shape.type)} className={dotType === shape.type ? 'selected' : ''}>
                <ShapePreview
                  sx={{
                    borderRadius:
                      shape.type === 'dots'
                        ? '50%'
                        : shape.type === 'rounded'
                        ? '8px'
                        : shape.type === 'extra-rounded'
                        ? '12px'
                        : shape.type === 'classy'
                        ? 0
                        : shape.type === 'classy-rounded'
                        ? '8px'
                        : 0,
                    transform: shape.type.includes('classy') ? 'rotate(45deg)' : 'none'
                  }}
                />
              </ShapeButton>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Color Selection */}
      <ColorSection>
        <Stack spacing={2}>
          <Typography variant='subtitle2'>Color Style</Typography>
          <FormControl component='fieldset'>
            <RadioGroup
              value={colorType}
              onChange={handleChangeColorType}
              sx={{
                flexDirection: 'row',
                gap: 2
              }}
            >
              <FormControlLabel value='single' control={<Radio />} label='Single Color' />
              <FormControlLabel value='gradient' control={<Radio />} label='Gradient' />
            </RadioGroup>
          </FormControl>
        </Stack>

        {colorType === 'single' ? (
          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography variant='subtitle2'>Color:</Typography>
            <MuiColorInput sx={{ minWidth: 150 }} size='small' value={dotColor} onChange={handleChangeDotColor} />
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Typography variant='subtitle2'>Gradient Type</Typography>
            <FormControl>
              <RadioGroup
                value={gradientType}
                onChange={handleChangeGradientType}
                sx={{ flexDirection: 'row', gap: 2 }}
              >
                <FormControlLabel value='linear' control={<Radio />} label='Linear' />
                <FormControlLabel value='radial' control={<Radio />} label='Radial' />
              </RadioGroup>
            </FormControl>

            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <MuiColorInput
                  label='Color 1'
                  size='small'
                  value={gradientColorOne}
                  onChange={handleChangeGradientColorOne}
                />
                <MuiColorInput
                  label='Color 2'
                  size='small'
                  value={gradientColorTwo}
                  onChange={handleChangeGradientColorTwo}
                />
              </Stack>

              {gradientType === 'linear' && (
                <Stack spacing={1}>
                  <Typography variant='subtitle2'>Rotation</Typography>
                  <Slider
                    value={gradientRotation}
                    onChange={handleChangeGradientRotation}
                    valueLabelDisplay='auto'
                    step={30}
                    marks
                    min={0}
                    max={360}
                  />
                </Stack>
              )}
            </Stack>
          </Stack>
        )}
      </ColorSection>
    </Stack>
  )
}
