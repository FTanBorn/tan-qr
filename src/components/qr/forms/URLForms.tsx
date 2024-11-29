// src/components/qr/forms/URLForm.tsx

import { useState } from "react";
import { Box, TextField, Button, Stack, Typography, Grid } from "@mui/material";
import { QrCode2 } from "@mui/icons-material";
import { QRCodeSVG } from "qrcode.react";
import QrCodeGenerator from "../QrCodeGenerator";
import { MuiColorInput } from "mui-color-input";
import QrCodeCustomize from "../QrCodeCustomize";
import QrCodeAccordion from "../customized/QrCodeAccordion";

export default function URLForm({ onGenerate }: FormProps) {
  const [urlData, setUrlData] = useState<string>("");
  const [dotColor, setDotColor] = useState("");
  const [cornerSquareColor, setCornerSquareColor] = useState("");
  const [cornersDotColor, setCornersDotColor] = useState("");
  const [showQR, setShowQR] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlData) {
      setShowQR(true);
      onGenerate?.(urlData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Website URL"
              placeholder="https://ornek.com"
              variant="outlined"
              value={urlData}
              onChange={(e) => setUrlData(e.target.value)}
              required
              error={showQR && !urlData}
              helperText={showQR && !urlData ? "URL gereklidir" : ""}
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              startIcon={<QrCode2 />}
            >
              QR Kod Oluştur
            </Button>
            {showQR && urlData ? (
              <QrCodeAccordion
                dotColor={dotColor}
                cornerSquareColor={cornerSquareColor}
                cornersDotColor={cornersDotColor}
                setDotColor={setDotColor}
                setCornerSquareColor={setCornerSquareColor}
                setCornersDotColor={setCornersDotColor}
              />
            ) : null}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {showQR && urlData ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 3,
                border: "4px dashed grey",
                borderRadius: 3,
              }}
            >
              <QrCodeGenerator
                data={urlData}
                dotColor={dotColor}
                backgroundColor={"#fff"}
                cornerSquareColor={cornerSquareColor}
                cornersDotColor={cornersDotColor}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 3,
                height: "300px",
                width: "300px",
                border: "4px dashed grey",
                borderRadius: 3,
              }}
            >
              QR Code
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
