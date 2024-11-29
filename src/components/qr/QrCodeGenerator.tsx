import React, { useEffect, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'
import { DotType, CornerDotType } from 'qr-code-styling'

type QrCodeGeneratorProps = {
  backgroundColor?: string
  data: string
  width?: number
  height?: number
  dotColor?: string
  dotType?: DotType
  cornerSquareColor?: string
  cornersDotColor?: string
  cornersDotType?: CornerDotType
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({
  backgroundColor = '#ffffff',
  data,
  width = 300,
  height = 300,
  dotColor = '#000000',
  cornerSquareColor = '#000000',
  cornersDotColor = '#000000',
  dotType = 'classy',
  cornersDotType = 'dot'
}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null)
  const qrCodeInstance = useRef<QRCodeStyling>()

  useEffect(() => {
    qrCodeInstance.current = new QRCodeStyling({
      width,
      height,
      data,
      dotsOptions: {
        color: dotColor,
        type: dotType
      },
      cornersDotOptions: { color: cornersDotColor, type: cornersDotType },
      cornersSquareOptions: { color: cornerSquareColor },
      backgroundOptions: {
        color: backgroundColor
      }
    })
    8
    if (qrCodeRef.current) {
      qrCodeInstance.current.append(qrCodeRef.current)
    }
  }, [data, width, height, dotColor, backgroundColor, cornerSquareColor, cornersDotColor])

  // QR kodu yenilemek için
  useEffect(() => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.update({
        data,
        dotsOptions: { color: dotColor },
        cornersDotOptions: { color: cornersDotColor, type: cornersDotType },
        cornersSquareOptions: { color: cornerSquareColor },
        backgroundOptions: { color: backgroundColor }
      })
    }
  }, [data, dotColor, backgroundColor, cornerSquareColor, cornersDotColor, cornersDotType])

  return <div ref={qrCodeRef} />
}

export default QrCodeGenerator
