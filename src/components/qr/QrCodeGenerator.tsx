import React, { useEffect, useRef } from 'react'
import QRCodeStyling, { CornerSquareType, DotType } from 'qr-code-styling'
import { CornerDotType } from 'qr-code-styling'
import { GradientConfig } from './types'

type QrCodeGeneratorProps = {
  data: string
  width?: number
  height?: number
  // Dot Options
  dotType?: DotType
  dotColor?: string
  dotGradient?: GradientConfig | null
  // Corners Square Options
  cornersSquareType?: CornerSquareType
  cornersSquareColor?: string
  cornersSquareGradient?: GradientConfig | null
  // Corners Dot Options
  cornersDotColor?: string
  cornersDotType?: CornerDotType
  cornersDotGradient?: GradientConfig | null
  // Background Options
  backgroundColor?: string
  backgroundGradient?: GradientConfig | null
  // Image Options
  imageSource: string
  imageMargin: number
  imageSize: number
  hideBackgroundDots: boolean
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({
  data,
  width = 300,
  height = 300,
  // Dot Options
  dotType = 'rounded',
  dotColor = '#000000',
  dotGradient = undefined,
  // Corners Square Options
  cornersSquareType = 'dot',
  cornersSquareColor = '#000000',
  cornersSquareGradient = undefined,
  // Corners Dot Options
  cornersDotType = 'dot',
  cornersDotColor = '#000000',
  cornersDotGradient = undefined,
  // Backgorund Options
  backgroundColor = '#ffffff',
  backgroundGradient = undefined,
  // Image Options
  imageSource = '',
  imageMargin = 5,
  imageSize = 0.4,
  hideBackgroundDots = false
}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null)
  const qrCodeInstance = useRef<QRCodeStyling>()

  useEffect(() => {
    qrCodeInstance.current = new QRCodeStyling({
      width,
      height,
      data,
      image: imageSource,
      dotsOptions: {
        type: dotType,
        color: dotColor,
        gradient: dotGradient || undefined
      },
      cornersDotOptions: { color: cornersDotColor, type: cornersDotType, gradient: cornersDotGradient || undefined },
      cornersSquareOptions: {
        color: cornersSquareColor,
        type: cornersSquareType,
        gradient: cornersSquareGradient || undefined
      },
      backgroundOptions: {
        color: backgroundColor,
        gradient: backgroundGradient || undefined
      },
      imageOptions: {
        margin: imageMargin,
        imageSize: imageSize,
        hideBackgroundDots: hideBackgroundDots
      }
    })
    if (qrCodeRef.current) {
      qrCodeInstance.current.append(qrCodeRef.current)
    }
  }, [
    data,
    width,
    height,
    dotColor,
    dotType,
    dotGradient,
    cornersSquareColor,
    cornersSquareType,
    cornersSquareGradient,
    cornersDotColor,
    cornersDotType,
    cornersDotGradient,
    backgroundColor,
    backgroundGradient,
    imageSource,
    imageMargin,
    imageSize,
    hideBackgroundDots
  ])

  // QR kodu yenilemek için
  useEffect(() => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.update({
        data,
        image: imageSource,
        dotsOptions: {
          type: dotType,
          color: dotColor,
          gradient: dotGradient || undefined
        },
        cornersDotOptions: { color: cornersDotColor, type: cornersDotType, gradient: cornersDotGradient || undefined },
        cornersSquareOptions: {
          color: cornersSquareColor,
          type: cornersSquareType,
          gradient: cornersSquareGradient || undefined
        },
        backgroundOptions: { color: backgroundColor, gradient: backgroundGradient || undefined },
        imageOptions: {
          margin: imageMargin,
          imageSize: imageSize,
          hideBackgroundDots: hideBackgroundDots
        }
      })
    }
  }, [
    data,
    dotColor,
    dotType,
    dotGradient,
    cornersSquareColor,
    cornersSquareType,
    cornersSquareGradient,
    cornersDotColor,
    cornersDotType,
    cornersDotGradient,
    backgroundColor,
    backgroundGradient,
    imageSource,
    imageMargin,
    imageSize,
    hideBackgroundDots
  ])

  return <div ref={qrCodeRef} />
}

export default QrCodeGenerator
