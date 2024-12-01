// QrCodeAccordion.tsx
import * as React from 'react'
import { ExpandMore, Palette, CropSquare, RadioButtonChecked, ImageSearch } from '@mui/icons-material'
import { DotType, CornerSquareType, CornerDotType } from 'qr-code-styling'
import { GradientConfig } from '../types'
import QrCodeDotOptions from './components/QrCodeDotOptions'
import QrCodeCornersSquareOptions from './components/QrCodeCornersSquareOptions'
import QrCodeCornersDotOptions from './components/QrCodeCornersDotOptions'
import QrCodeBackgroundOptions from './components/QrCodeBackgroundOptions'
import QrCodeImageOptions from './components/QrCodeImageOptions'
import { StyledAccordion, StyledAccordionDetails, StyledAccordionSummary, StyledTypography } from '../styles/Accordion'

interface CustomizeProps {
  // Dot Options
  dotColor: string
  dotType: DotType
  dotGradient: GradientConfig | null
  setDotColor: (val: string) => void
  setDotType: (val: DotType) => void
  setDotGradient: (gradient: GradientConfig | null) => void

  // Corner Square Options
  cornersSquareColor: string
  cornersSquareType: CornerSquareType
  cornersSquareGradient: GradientConfig | null
  setCornerSquareColor: (val: string) => void
  setCornersSquareType: (val: CornerSquareType) => void
  setCornersSquareGradient: (gradient: GradientConfig | null) => void

  // Corner Dot Options
  cornersDotColor: string
  cornersDotType: CornerDotType
  cornersDotGradient: GradientConfig | null
  setCornersDotColor: (val: string) => void
  setCornersDotType: (val: CornerDotType) => void
  setCornersDotGradient: (gradient: GradientConfig | null) => void

  // Background Options
  backgroundColor: string
  backgroundGradient: GradientConfig | null
  setBackgroundColor: (val: string) => void
  setBackgroundGradient: (gradient: GradientConfig | null) => void

  // Image Options
  imageSource: string
  imageMargin: number
  imageSize: number
  hideBackgroundDots: boolean
  setImageSource: (source: string) => void
  setImageMargin: (margin: number) => void
  setImageSize: (size: number) => void
  setHideBackgroundDots: (hide: boolean) => void
}

interface AccordionOption {
  id: string
  title: string
  icon: JSX.Element
  component: JSX.Element
}

export default function QrCodeAccordion(props: CustomizeProps) {
  const [expanded, setExpanded] = React.useState<string | false>('')

  const accordionOptions: AccordionOption[] = [
    {
      id: 'panel1',
      title: 'Dot Options',
      icon: <RadioButtonChecked />,
      component: (
        <QrCodeDotOptions
          dotType={props.dotType}
          dotColor={props.dotColor}
          dotGradient={props.dotGradient}
          setDotColor={props.setDotColor}
          setDotType={props.setDotType}
          setDotGradient={props.setDotGradient}
        />
      )
    },
    {
      id: 'panel2',
      title: 'Corners Square Options',
      icon: <CropSquare />,
      component: (
        <QrCodeCornersSquareOptions
          cornersSquareType={props.cornersSquareType}
          cornersSquareColor={props.cornersSquareColor}
          cornersSquareGradient={props.cornersSquareGradient}
          setCornersSquareType={props.setCornersSquareType}
          setCornerSquareColor={props.setCornerSquareColor}
          setCornersSquareGradient={props.setCornersSquareGradient}
        />
      )
    },
    {
      id: 'panel3',
      title: 'Corners Dot Options',
      icon: <RadioButtonChecked />,
      component: (
        <QrCodeCornersDotOptions
          cornersDotType={props.cornersDotType}
          cornersDotColor={props.cornersDotColor}
          cornersDotGradient={props.cornersDotGradient}
          setCornersDotType={props.setCornersDotType}
          setCornersDotColor={props.setCornersDotColor}
          setCornersDotGradient={props.setCornersDotGradient}
        />
      )
    },
    {
      id: 'panel4',
      title: 'Background Options',
      icon: <Palette />,
      component: (
        <QrCodeBackgroundOptions
          backgroundColor={props.backgroundColor}
          backgroundGradient={props.backgroundGradient}
          setBackgroundColor={props.setBackgroundColor}
          setBackgroundGradient={props.setBackgroundGradient}
        />
      )
    },
    {
      id: 'panel5',
      title: 'Image Options',
      icon: <ImageSearch />,
      component: (
        <QrCodeImageOptions
          imageSource={props.imageSource}
          imageMargin={props.imageMargin}
          imageSize={props.imageSize}
          hideBackgroundDots={props.hideBackgroundDots}
          setImageSource={props.setImageSource}
          setImageMargin={props.setImageMargin}
          setImageSize={props.setImageSize}
          setHideBackgroundDots={props.setHideBackgroundDots}
        />
      )
    }
  ]

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div>
      {accordionOptions.map(option => (
        <StyledAccordion key={option.id} expanded={expanded === option.id} onChange={handleChange(option.id)}>
          <StyledAccordionSummary
            expandIcon={<ExpandMore sx={{ fontSize: 24 }} />}
            aria-controls={`${option.id}-content`}
            id={`${option.id}-header`}
          >
            {option.icon}
            <StyledTypography>{option.title}</StyledTypography>
          </StyledAccordionSummary>
          <StyledAccordionDetails>{option.component}</StyledAccordionDetails>
        </StyledAccordion>
      ))}
    </div>
  )
}
