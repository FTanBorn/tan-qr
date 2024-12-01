// src/components/qr/TabPanel.tsx
import { Box } from '@mui/material'
import { ReactNode } from 'react'

export interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
  dir?: string
  className?: string
  'aria-labelledby'?: string
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`qr-tabpanel-${index}`}
      aria-labelledby={`qr-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  )
}
