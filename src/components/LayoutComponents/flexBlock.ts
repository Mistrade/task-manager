import styled, { css, CSSProperties, FlattenSimpleInterpolation } from 'styled-components'

export type BlockProps =
  MarginProps
  & PaddingProps
  & FlexProps
  & WidthProps
  & HeightProps
  & FormalizationProps
  & PositionProps

type UnitsType = string | number

interface WidthProps {
  width?: UnitsType,
  maxWidth?: UnitsType,
  minWidth?: UnitsType
}

interface PositionProps {
  position?: CSSProperties['position']
}

interface HeightProps {
  height?: UnitsType,
  maxHeight?: UnitsType,
  minHeight?: UnitsType
}

interface FormalizationProps {
  opacity?: CSSProperties['opacity'],
  bgColor?: CSSProperties['backgroundColor'],
  animation?: CSSProperties['animation'],
  border?: CSSProperties['border'],
  borderTop?: CSSProperties['borderTop'],
  borderRight?: CSSProperties['borderRight'],
  borderBottom?: CSSProperties['borderBottom'],
  borderLeft?: CSSProperties['borderLeft'],
  borderRadius?: CSSProperties['borderRadius'],
}

interface FlexProps {
  align?: CSSProperties['alignItems'],
  justify?: CSSProperties['justifyContent'],
  wrap?: CSSProperties['flexWrap'],
  direction?: CSSProperties['flexDirection'],
  grow?: CSSProperties['flexGrow'],
  shrink?: CSSProperties['flexShrink'],
  basis?: CSSProperties['flexBasis'],
  flex?: CSSProperties['flex'],
}

interface MarginProps {
  mt?: UnitsType,
  mr?: UnitsType,
  mb?: UnitsType,
  ml?: UnitsType,
  m?: UnitsType
}

interface PaddingProps {
  pt?: UnitsType,
  pr?: UnitsType,
  pb?: UnitsType,
  pl?: UnitsType,
  p?: UnitsType
}

type CustomMixin<T> = ( _: T ) => FlattenSimpleInterpolation

const pxToCssValue = ( value: UnitsType ) => {
  return typeof value === 'string' ? value : `${value}px`
}

const flex: CustomMixin<FlexProps> = ( _ ) => css`
  ${css`display: flex;`}
  ${_.align ? css`align-items: ${_.align};` : ''}
  ${_.justify ? css`justify-content: ${_.justify};` : ''}
  ${_.direction ? css`flex-direction: ${_.direction};` : ''}
  ${_.wrap ? css`flex-wrap: ${_.wrap};` : ''}
  ${_.grow ? css`flex-grow: ${_.grow};` : ''}
  ${_.shrink ? css`flex-shrink: ${_.shrink};` : ''}
  ${_.basis ? css`flex-basis: ${_.basis};` : ''}
  ${_.flex ? css`flex: ${_.flex};` : ''}
`

const margins: CustomMixin<MarginProps> = ( _ ) => css`
  ${_.mt ? css`margin-top: ${pxToCssValue( _.mt )};` : ''}
  ${_.mr ? css`margin-right: ${pxToCssValue( _.mr )};` : ''}
  ${_.mb ? css`margin-bottom: ${pxToCssValue( _.mb )};` : ''}
  ${_.ml ? css`margin-left: ${pxToCssValue( _.ml )};` : ''}
  ${_.m ? css`margin: ${pxToCssValue( _.m )};` : ''}
`

const paddings: CustomMixin<PaddingProps> = ( _ ) => css`
  ${_.pt ? css`padding-top: ${pxToCssValue( _.pt )};` : ''}
  ${_.pr ? css`padding-right: ${pxToCssValue( _.pr )};` : ''}
  ${_.pb ? css`padding-bottom: ${pxToCssValue( _.pb )};` : ''}
  ${_.pl ? css`padding-left: ${pxToCssValue( _.pl )};` : ''}
  ${_.p ? css`padding: ${pxToCssValue( _.p )};` : ''}
`

const widths: CustomMixin<WidthProps> = ( _ ) => css`
  ${_.width ? css`width: ${pxToCssValue( _.width )};` : ''}
  ${_.maxWidth ? css`max-width: ${pxToCssValue( _.maxWidth )};` : ''}
  ${_.minWidth ? css`min-width: ${pxToCssValue( _.minWidth )};` : ''}
`

const heights: CustomMixin<HeightProps> = ( _ ) => css`
  ${_.height ? css`height: ${pxToCssValue( _.height )};` : ''}
  ${_.maxHeight ? css`max-height: ${pxToCssValue( _.maxHeight )};` : ''}
  ${_.minHeight ? css`min-height: ${pxToCssValue( _.minHeight )};` : ''}
`

const formalization: CustomMixin<FormalizationProps> = ( _ ) => css`
  ${_.opacity ? css`opacity: ${_.opacity};` : ''}
  ${_.bgColor ? css`background-color: ${_.bgColor};` : ''}
  ${_.animation ? css`animation: ${_.animation};` : ''}
  ${_.border ? css`border: ${_.border};` : ''}
  ${_.borderTop ? css`border-top: ${_.borderTop};` : ''}
  ${_.borderRight ? css`border-right: ${_.borderRight};` : ''}
  ${_.borderBottom ? css`border-bottom: ${_.borderBottom};` : ''}
  ${_.borderLeft ? css`border-left: ${_.borderLeft};` : ''}
  ${_.borderRadius ? css`border-radius: ${pxToCssValue( _.borderRadius )};` : ''}
`

const position: CustomMixin<PositionProps> = ( _ ) => css`
  ${_.position ? css`position: ${_.position};` : ''}
`

export const FlexBlock = styled( 'div' )<BlockProps>`
  & {
    display: flex;
    ${_ => position( _ )}
    ${_ => flex( _ )}
    ${_ => margins( _ )}
    ${_ => paddings( _ )}
    ${_ => widths( _ )}
    ${_ => heights( _ )}
    ${_ => formalization( _ )}
  }
`
