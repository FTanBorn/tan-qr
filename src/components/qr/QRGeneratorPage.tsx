'use client'
// src/components/qr/QRGenerator.tsx

import { useState } from 'react'
import { Container, Paper, Box, Tabs, Tab, Grid } from '@mui/material'
import { Language, TextFields, Email, Phone, Wifi, LocationOn } from '@mui/icons-material'
import TabPanel from './TabPanel'
import URLForm from './forms/URLForms'
import WifiForm from './forms/WifiForm'

export default function QRGeneratorPage() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Container maxWidth='lg'>
      <Paper elevation={3} sx={{ mt: 4, mb: 4 }}>
        <Grid container>
          <Grid item xs={12} md={1}>
            <Box sx={{ borderRight: 1, borderColor: 'divider', height: '100%' }}>
              <Tabs
                orientation='vertical'
                value={tabValue}
                onChange={handleTabChange}
                sx={{ borderRight: 1, borderColor: 'divider' }}
              >
                <Tab icon={<Language />} label='URL' />
                <Tab icon={<TextFields />} label='Metin' />
                <Tab icon={<Email />} label='E-posta' />
                <Tab icon={<Phone />} label='Telefon' />
                <Tab icon={<Wifi />} label='Wi-Fi' />
                <Tab icon={<LocationOn />} label='Konum' />
              </Tabs>
            </Box>
          </Grid>

          <Grid item xs={12} md={11}>
            <TabPanel value={tabValue} index={0}>
              <URLForm maxUrlLength={1000} />
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
              <WifiForm />
            </TabPanel>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
