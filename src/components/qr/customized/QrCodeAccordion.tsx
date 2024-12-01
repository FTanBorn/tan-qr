import * as React from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import QrCodeDotOptions from './components/QrCodeDotOptions'
import { DotType, CornerSquareType, CornerDotType } from 'qr-code-styling'
import QrCodeCornersSquareOptions from './components/QrCodeCornersSquareOptions '
import { GradientConfig } from '../types'
import QrCodeCornersDotOptions from './components/QrCodeCornersDotOptions'
import QrCodeBackgroundOptions from './components/QrCodeBackgroundOptions'
import QrCodeImageOptions from './components/QrCodeImageOptions'

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&::before': {
      display: 'none'
    }
  })
)

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)'
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1)
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)'
  })
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}))

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

export default function CustomizedAccordions(props: CustomizeProps) {
  // Dot Options Props
  const { dotColor, dotType, dotGradient, setDotColor, setDotType, setDotGradient } = props

  // Corner Square Options Props
  const {
    cornersSquareColor,
    cornersSquareType,
    cornersSquareGradient,
    setCornerSquareColor,
    setCornersSquareType,
    setCornersSquareGradient
  } = props

  // Corner Dot Options Props
  const {
    cornersDotColor,
    cornersDotType,
    cornersDotGradient,
    setCornersDotColor,
    setCornersDotType,
    setCornersDotGradient
  } = props

  // Background Options Props
  const { backgroundColor, backgroundGradient, setBackgroundColor, setBackgroundGradient } = props

  // Image Options Props
  const {
    imageSource,
    imageMargin,
    imageSize,
    hideBackgroundDots,
    setImageSource,
    setImageMargin,
    setImageSize,
    setHideBackgroundDots
  } = props

  const [expanded, setExpanded] = React.useState<string | false>('')

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div style={{ marginTop: '25px' }}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography>Dot Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <QrCodeDotOptions
            dotType={dotType}
            dotColor={dotColor}
            dotGradient={dotGradient}
            setDotColor={setDotColor}
            setDotType={setDotType}
            setDotGradient={setDotGradient}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
          <Typography>Corners Square Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <QrCodeCornersSquareOptions
            cornersSquareType={cornersSquareType}
            cornersSquareColor={cornersSquareColor}
            cornersSquareGradient={cornersSquareGradient}
            setCornersSquareType={setCornersSquareType}
            setCornerSquareColor={setCornerSquareColor}
            setCornersSquareGradient={setCornersSquareGradient}
          />
        </AccordionDetails>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
          <Typography>Corners Square Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <QrCodeCornersDotOptions
            cornersDotType={cornersDotType}
            cornersDotColor={cornersDotColor}
            cornersDotGradient={cornersDotGradient}
            setCornersDotType={setCornersDotType}
            setCornersDotColor={setCornersDotColor}
            setCornersDotGradient={setCornersDotGradient}
          />
        </AccordionDetails>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls='panel4d-content' id='panel4d-header'>
          <Typography>Backgorund Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <QrCodeBackgroundOptions
            backgroundColor={backgroundColor}
            backgroundGradient={backgroundGradient}
            setBackgroundColor={setBackgroundColor}
            setBackgroundGradient={setBackgroundGradient}
          />
        </AccordionDetails>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls='panel5d-content' id='panel5d-header'>
          <Typography>Image Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <QrCodeImageOptions
            imageSource={imageSource}
            imageMargin={imageMargin}
            imageSize={imageSize}
            hideBackgroundDots={hideBackgroundDots}
            setImageSource={setImageSource}
            setImageMargin={setImageMargin}
            setImageSize={setImageSize}
            setHideBackgroundDots={setHideBackgroundDots}
          />
        </AccordionDetails>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </div>
  )
}
