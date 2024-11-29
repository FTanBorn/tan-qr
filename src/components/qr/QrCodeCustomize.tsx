// src/components/qr/QRGenerator.tsx
'use client'

import { useState } from 'react'
import { Container, Paper, Box, Tabs, Tab, Grid } from '@mui/material'
import { Language, TextFields, Email, Phone, Wifi, LocationOn } from '@mui/icons-material'
import { MuiColorInput } from 'mui-color-input'

interface CustomizeProps {
  color: string

  setColor: (val: string) => void
}

export default function QrCodeCustomize(props: CustomizeProps) {
  const { color } = props
  const { setColor } = props

  const handleChange = (color: any) => {
    setColor(color)
  }

  return (
    <Container maxWidth='lg'>
      <MuiColorInput value={color} onChange={handleChange} />
    </Container>
  )
}
