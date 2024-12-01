import * as React from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import QrCodeDotOptions from './components/QrCodeDotOptions'
import { DotType, CornerSquareType } from 'qr-code-styling'
import QrCodeCornersSquareOptions from './components/QrCodeCornersSquareOptions '

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

interface GradientConfig {
  type: 'linear' | 'radial'
  rotation: number
  colorStops: Array<{
    offset: number
    color: string
  }>
}

interface CustomizeProps {
  dotColor: string
  cornerSquareColor: string
  cornersDotColor: string
  dotShape: string
  dotType: DotType
  cornersSquareType: CornerSquareType
  dotGradient: GradientConfig | null
  cornersSquareGradient: GradientConfig | null

  setDotColor: (val: string) => void
  setCornerSquareColor: (val: string) => void
  setCornersDotColor: (val: string) => void
  setDotShape: (val: string) => void
  setDotType: (val: DotType) => void
  setCornersSquareType: (val: CornerSquareType) => void
  setDotGradient: (gradient: GradientConfig | null) => void
  setCornersSquareGradient: (gradient: GradientConfig | null) => void
}

export default function CustomizedAccordions(props: CustomizeProps) {
  const { dotColor, dotType, dotGradient, cornerSquareColor, cornersSquareType, cornersSquareGradient } = props
  const {
    setDotColor,
    setDotType,
    setDotGradient,
    setCornerSquareColor,
    setCornersSquareType,
    setCornersSquareGradient
  } = props

  const [expanded, setExpanded] = React.useState<string | false>('')

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div>
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
            cornerSquareColor={cornerSquareColor}
            cornersSquareGradient={cornersSquareGradient}
            setCornersSquareType={setCornersSquareType}
            setCornerSquareColor={setCornerSquareColor}
            setCornersSquareGradient={setCornersSquareGradient}
          />
        </AccordionDetails>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </div>
  )
}
