import React, {FC} from "react";
import {FlexBlock} from "../LayoutComponents/FlexBlock";
import {disabledColor, hoverColor} from "../../common/constants";
import {css} from "styled-components";
import {MainHeaderBody, MainHeaderBodyProps} from "./MainHeaderBody";
import {CalendarHeaderProps} from "../Calendars/types";

const CalendarHeader = React.lazy(() => import('../Calendars/Header/CalendarHeader').then(({CalendarHeader}) => ({default: CalendarHeader})))

export interface MainHeaderProps extends MainHeaderBodyProps {
	msOptions: {
		calendar: CalendarHeaderProps
	}
}

export const MainHeader: FC<MainHeaderProps> = ({userInfo, msOptions}) => {
	return (
		<FlexBlock
			direction={'column'}
			bgColor={hoverColor}
			borderBottom={`1px solid ${disabledColor}`}
			additionalCss={css`
        box-shadow: 0px 5px 5px ${disabledColor};
        z-index: 5;
			`}
			height={70}
			pl={24}
			pr={24}
			pt={12}
			pb={12}
			gap={12}
		>
			<MainHeaderBody userInfo={userInfo}/>
		</FlexBlock>
	)
}