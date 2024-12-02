import { styled } from '@mui/material/styles'
import { Box, Stack } from '@mui/material'

// Shape Selection Styles
export const ShapeButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  width: 40, // Genişlik 40 piksel
  height: 40, // Yükseklik 40 piksel
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },
  '&.selected': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light + '20'
  }
}))

export const ShapePreview = styled(Box)({
  position: 'relative',
  width: 24, // Genişlik 24 piksel
  height: 24, // Yükseklik 24 piksel
  backgroundColor: '#000',
  transition: 'all 0.2s ease-in-out'
})

// Color Section Styles
export const ColorSection = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}))

export const StyledSection = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  gap: theme.spacing(2)
}))
