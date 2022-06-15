import { FC } from 'react'
import { FCWithChildren } from '../../Calendars/types'
import { css } from 'styled-components'
import { defaultColor } from '../../../common/constants'
import { FlexBlock, FlexBlockProps } from '../../LayoutComponents/FlexBlock'

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
        bgColor={'#fff'}
        borderRadius={4}
        p={4}
        overflow={'scroll'}
        additionalCss={css` box-shadow: 0 0 4px ${defaultColor}`}
        direction={'column'}
      >
        {children}
      </FlexBlock>
    )
  }

  return <></>
}
