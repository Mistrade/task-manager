import React, {FC, useEffect} from "react";
import {FlexBlock} from "../LayoutComponents/FlexBlock";
import {disabledColor} from "../../common/constants";
import {Route, useLocation} from "react-router";
import {Routes} from 'react-router-dom'
import {css} from "styled-components";
import {MainHeaderBody, MainHeaderBodyProps} from "./MainHeaderBody";
import {CalendarHeaderProps} from "../Calendars/types";
import {WithSuspense} from "../Loaders/WithSuspense";
import {toast} from "react-toastify";

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
			bgColor={'#fff'}
			borderBottom={`1px solid ${disabledColor}`}
			additionalCss={css`
        box-shadow: 0px 5px 5px ${disabledColor};
        z-index: 5;
			`}
			pl={24}
			pr={24}
			pt={12}
			pb={12}
			gap={12}
		>
			<MainHeaderBody userInfo={userInfo}/>
			<Routes>
				<Route
					path={'calendar/:layout/*'}
					element={
						!!userInfo ? (
							<FlexBlock width={'100%'} fSize={16}>
								<WithSuspense title={'Загрузка управляющих элементов...'}>
									<CalendarHeader
										{...msOptions.calendar}
									/>
								</WithSuspense>
							</FlexBlock>
						) : <></>
					}
				/>
			</Routes>
		</FlexBlock>
	)
}