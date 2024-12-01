import { GradientType } from 'qr-code-styling/lib/types'

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
