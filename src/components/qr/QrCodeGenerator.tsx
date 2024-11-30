import React, { useEffect, useRef } from 'react'
import QRCodeStyling, { DotType } from 'qr-code-styling'
import { CornerDotType } from 'qr-code-styling'

interface Gradient {
  type: 'linear' | 'radial'
  rotation: number
  colorStops: Array<{
    offset: number
    color: string
  }>
}

type QrCodeGeneratorProps = {
  backgroundColor?: string
  data: string
  width?: number
  height?: number
  dotColor?: string
  cornerSquareColor?: string
  cornersDotColor?: string
  dotType?: DotType
  cornersDotType?: CornerDotType
  dotGradient?: Gradient | null
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({
  backgroundColor = '#ffffff',
  data,
  width = 300,
  height = 300,
  dotColor = '#000000',
  cornerSquareColor = '#000000',
  cornersDotColor = '#000000',
  dotType = 'rounded',
  cornersDotType = 'dot',
  dotGradient = undefined
}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null)
  const qrCodeInstance = useRef<QRCodeStyling>()

  useEffect(() => {
    qrCodeInstance.current = new QRCodeStyling({
      width,
      height,
      data,
      dotsOptions: {
        type: dotType,
        color: dotColor
      },
      cornersDotOptions: { color: cornersDotColor, type: cornersDotType },
      cornersSquareOptions: { color: cornerSquareColor },
      backgroundOptions: {
        color: backgroundColor
      }
    })
    if (qrCodeRef.current) {
      qrCodeInstance.current.append(qrCodeRef.current)
    }
  }, [data, width, height, dotColor, backgroundColor, cornerSquareColor, cornersDotColor, dotType, cornersDotType])

  // QR kodu yenilemek için
  useEffect(() => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.update({
        data,
        dotsOptions: {
          type: dotType,
          color: dotColor,
          gradient: dotGradient || undefined // null ise undefined'a dönüştür
        },
        cornersDotOptions: { color: cornersDotColor, type: cornersDotType },
        cornersSquareOptions: { color: cornerSquareColor },
        backgroundOptions: { color: backgroundColor }
      })
    }
  }, [data, dotColor, backgroundColor, cornerSquareColor, cornersDotColor, cornersDotType, dotType, dotGradient])

  return <div ref={qrCodeRef} />
}

export default QrCodeGenerator
