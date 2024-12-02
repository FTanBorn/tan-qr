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
  width: 40,
  height: 40,
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
  width: 24,
  height: 24,
  backgroundColor: '#000',
  transition: 'all 0.2s ease-in-out'
})

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
