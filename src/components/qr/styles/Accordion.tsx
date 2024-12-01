import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'

export const StyledAccordion = styled(MuiAccordion)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: '12px !important',
  margin: '3px 0',
  border: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none'
  },
  '&.Mui-expanded': {
    margin: '1px 0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  transition: 'all 0.3s ease-in-out'
}))

export const StyledAccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  padding: '0 20px',
  minHeight: 64,
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  '& .MuiTypography-root': {
    fontSize: '0.95rem',
    fontWeight: 500,
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    color: theme.palette.text.secondary
  },
  '&.Mui-expanded': {
    backgroundColor: theme.palette.secondary.main,
    '& .MuiTypography-root': {
      color: '#fff',
      fontWeight: 600
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
      color: '#fff'
    },
    '& .MuiSvgIcon-root': {
      color: '#fff'
    }
  },
  '& .MuiAccordionSummary-content': {
    margin: '16px 0',
    '& .MuiSvgIcon-root': {
      marginRight: 16,
      fontSize: 22
    }
  }
}))

export const StyledAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  borderRadius: '0 0 12px 12px'
}))

export const StyledTypography = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    color: theme.palette.primary.main
  }
}))
