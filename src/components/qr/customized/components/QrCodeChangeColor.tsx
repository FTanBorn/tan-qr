// src/components/qr/QRGenerator.tsx
'use client'

import { useState } from 'react'
import { Container, Paper, Box, Tabs, Tab, Grid } from '@mui/material'
import { Language, TextFields, Email, Phone, Wifi, LocationOn } from '@mui/icons-material'
import { MuiColorInput } from 'mui-color-input'

interface CustomizeProps {
  dotColor: string
  cornerSquareColor: string
  cornersDotColor: string

  setDotColor: (val: string) => void
  setCornerSquareColor: (val: string) => void
  setCornersDotColor: (val: string) => void
}

export default function QrCodeChangeColor(props: CustomizeProps) {
  const { dotColor, cornerSquareColor, cornersDotColor } = props
  const { setDotColor, setCornerSquareColor, setCornersDotColor } = props

  const handleChangeDotColor = (color: any) => {
    setDotColor(color)
  }

  const handleChangeCornerSquareColor = (color: any) => {
    setCornerSquareColor(color)
  }

  const handleChangeCornerDotColor = (color: any) => {
    setCornersDotColor(color)
  }

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <MuiColorInput size='small' placeholder='Color' value={dotColor} onChange={handleChangeDotColor} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MuiColorInput
            size='small'
            placeholder='Color'
            value={cornerSquareColor}
            onChange={handleChangeCornerSquareColor}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MuiColorInput
            size='small'
            placeholder='Color'
            value={cornersDotColor}
            onChange={handleChangeCornerDotColor}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
