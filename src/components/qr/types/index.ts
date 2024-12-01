import { CornerDotType, CornerSquareType, DotType, GradientType } from 'qr-code-styling/lib/types'

export type EncryptionType = 'WPA' | 'WEP' | 'nopass'

export type ColorType = 'single' | 'gradient'

export interface GradientConfig {
  type: GradientType
  rotation: number
  colorStops: Array<{
    offset: number
    color: string
  }>
}

export interface DotShapeOption {
  id: number
  type: 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded'
  label: string
}

export interface CornersSquareShapeOption {
  id: number
  type: 'dot' | 'square' | 'extra-rounded'
  label: string
}

export interface CornersDotShapeOption {
  id: number
  type: 'dot' | 'square'
  label: string
}

interface QRStyleOptions {
  dotColor: string
  dotType: DotType
  dotGradient: GradientConfig | null
  cornersSquareColor: string
  cornersSquareType: CornerSquareType
  cornersSquareGradient: GradientConfig | null
  cornersDotColor: string
  cornersDotType: CornerDotType
  cornersDotGradient: GradientConfig | null
}

export interface QRFormSubmitData {
  data: string
  qrStyles: QRStyleOptions
}
