import {FCWithChildren} from '../../Calendars/types'
import {css} from 'styled-components'
import {defaultColor} from '../../../common/constants'
import {FlexBlock, FlexBlockProps} from '../../LayoutComponents/FlexBlock'

export const SelectListContainer: FCWithChildren<FlexBlockProps> = ( {
                                                                       children,
                                                                       ...flexBlockProps
                                                                     } ) => {
  if( children ) {
    return (
      <FlexBlock
        maxHeight={320}
        width={'100%'}
        {...flexBlockProps}
        bgColor={'rgba(255,255,255, 1)'}
        borderRadius={4}
        p={4}
        border={`1px solid ${defaultColor}`}
        overflow={'scroll'}
        additionalCss={css` box-shadow: 4px 2px 4px ${defaultColor}`}
        direction={'column'}
      >
        <FlexBlock
          additionalCss={css`z-index: 2`}
          direction={'column'}
        >
          {children}
        </FlexBlock>
      </FlexBlock>
    )
  }

  return <></>
}
