// src/components/qr/styles/StyledTabs.tsx
import { styled } from '@mui/material'
import { Tab, Tabs } from '@mui/material'

export const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: 'auto',
  padding: '12px',
  flex: 1,
  maxWidth: 'none',
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'none',
  transition: 'all 0.2s',
  borderBottom: '2px solid transparent',

  [theme.breakpoints.down('sm')]: {
    minWidth: '60px',
    padding: '8px 12px',
    '& .MuiTab-iconWrapper': {
      margin: 0
    },
    '& .MuiTab-labelIcon': {
      minHeight: 'auto'
    }
  },

  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 600,
    backgroundColor: 'rgba(25, 118, 210, 0.08)',
    borderBottom: `2px solid ${theme.palette.primary.main}`
  },

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    opacity: 1
  }
}))

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    display: 'none'
  },

  [theme.breakpoints.down('sm')]: {
    '& .MuiTab-root': {
      padding: '8px 12px'
    }
  }
}))
