import { FCWithChildren } from '../../Calendars/types'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import { css } from 'styled-components'
import { HoverElementMixin } from '../../../common/cssMixins'
import { currentColor, defaultColor, hoverColor } from '../../../common/constants'

export const SelectItemContainer: FCWithChildren<{ onClick?: () => void, isSelected?: boolean }> = ( {
                                                                                                       onClick,
                                                                                                       children,
                                                                                                       isSelected
                                                                                                     } ) => {
  if( children ) {
    return (
      <FlexBlock
        p={'4px 8px'}
        borderRadius={4}
        additionalCss={css`
          ${isSelected && css`
            color: #000;
            background-color: ${hoverColor};
          `}
          &:not(:last-child) {
            margin-bottom: 4px;
          }

          ${HoverElementMixin}
        `}
        width={'100%'}
        onClick={onClick}
      >
        <FlexBlock
          direction={'row'}
          gap={6}
          width={'100%'}
          wrap={'nowrap'}
          align={'center'}
        >
          {children}
        </FlexBlock>
      </FlexBlock>
    )
  }

  return <></>
}
