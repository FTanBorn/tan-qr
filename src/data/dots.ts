import { DotType } from 'qr-code-styling'

interface ShapeOption {
  id: number
  type: DotType
  label: string
  icon?: string
}

export const qrShapeOptions: ShapeOption[] = [
  {
    id: 1,
    type: 'dots',
    label: 'Dots Style'
  },
  {
    id: 2,
    type: 'rounded',
    label: 'Rounded'
  },
  {
    id: 3,
    type: 'classy',
    label: 'Classy'
  },
  {
    id: 4,
    type: 'classy-rounded',
    label: 'Classy Rounded'
  },
  {
    id: 5,
    type: 'square',
    label: 'Square'
  },
  {
    id: 6,
    type: 'extra-rounded',
    label: 'Extra Rounded'
  }
]
