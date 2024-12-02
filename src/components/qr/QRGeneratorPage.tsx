// src/components/qr/QRGenerator.tsx
'use client'

import { useState } from 'react'
import { Container, Paper, Box, useMediaQuery, useTheme } from '@mui/material'
import { Language, TextFields, Email, Phone, Wifi, LocationOn } from '@mui/icons-material'
import { StyledTab, StyledTabs } from './styles/StyledTabs'
import TabPanel from './TabPanel'
import URLForm from './forms/URLForms'
import WifiForm from './forms/WifiForm'
import EmailForm from './forms/EmailForm'
import TextForm from './forms/TextForm'
import PhoneForm from './forms/PhoneForm'
import LocationForm from './forms/LocationForm'

interface TabItem {
  icon: JSX.Element
  label: string
  component: JSX.Element
}

export default function QRGeneratorPage() {
  const [tabValue, setTabValue] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const tabs: TabItem[] = [
    { icon: <Language />, label: 'URL', component: <URLForm maxUrlLength={1000} /> },
    { icon: <TextFields />, label: 'Text', component: <TextForm /> },
    { icon: <Email />, label: 'Email', component: <EmailForm defaultEmail='example@gmail.com' /> },
    { icon: <Phone />, label: 'Phone', component: <PhoneForm /> },
    { icon: <Wifi />, label: 'Wi-Fi', component: <WifiForm /> },
    { icon: <LocationOn />, label: 'Location', component: <LocationForm /> }
  ]

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Container maxWidth='lg' sx={{ py: { xs: 2, sm: 4 } }}>
      <Paper
        elevation={3}
        sx={{
          overflow: 'hidden',
          borderRadius: { xs: 0, sm: 1 }
        }}
      >
        <Box sx={{ width: '100%' }}>
          <StyledTabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isMobile ? 'scrollable' : 'fullWidth'}
            scrollButtons='auto'
            allowScrollButtonsMobile
            aria-label='QR code generation options'
          >
            {tabs.map((tab, index) => (
              <StyledTab
                key={index}
                icon={tab.icon}
                label={!isMobile && tab.label}
                id={`qr-tab-${index}`}
                aria-controls={`qr-tabpanel-${index}`}
                iconPosition='top'
              />
            ))}
          </StyledTabs>

          <Box>
            {tabs.map((tab, index) => (
              <TabPanel key={index} value={tabValue} index={index}>
                {tab.component}
              </TabPanel>
            ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
