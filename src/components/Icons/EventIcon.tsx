import React, { FC } from 'react'
import { CompleteIcon, CreatedIcon, IconProps, ProcessIcon, WaitIcon } from './Icons'
import { FlexBlock, FlexBlockProps } from '../LayoutComponents/FlexBlock'
import { currentColor } from '../../common/constants'
import { EventItem } from '../Calendars/types'

export const EventIcon: FC<IconProps & FlexBlockProps & { status: EventItem['status'] }> = ( { ...props } ) => {
  switch (props.status) {
    case 'created':
      return <CreatedIcon {...props} />
    case 'in_progress':
      return <ProcessIcon {...props} />
    case 'review':
      return <WaitIcon {...props} />
    case 'completed':
      return <CompleteIcon {...props} />
  }
}
