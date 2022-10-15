import React, {FC, useEffect, useMemo} from "react";
import {FlexBlock} from "../LayoutComponents/FlexBlock";
import {MainHeaderUserInfo, MainHeaderUserInfoProps} from "./MainHeaderUserInfo";
import {HeaderLinkStyled} from "./HeaderLink.styled.";
import {useLocation} from "react-router";
import {NavigationContainer} from "./MainHeader.styled";
import {useAppSelector} from "../../store/hooks/hooks";
import {CalendarCurrentSelector} from "../../store/selectors/calendarItems";
import {EmptyButtonStyled} from "../Buttons/EmptyButton.styled";
import {AppLogoIcon} from "../Icons/AppIcon/AppLogoIcon";
import {toast} from "react-toastify";
import {Heading} from "../Text/Heading";
import {currentColor} from "../../common/constants";

export interface MainHeaderBodyProps extends MainHeaderUserInfoProps {

}

interface NavigationArrayItem {
	title: string,
	path: string,
}

const PageHeaderArray = [
	{urlStartWith: '/calendar', title: 'Мой календарь | Планирование'},
	{urlStartWith: '/contacts', title: 'Мои Контакты'},
]

export const MainHeaderBody: FC<MainHeaderBodyProps> = ({userInfo}) => {
	const {pathname} = useLocation()
	
	const {layout} = useAppSelector(CalendarCurrentSelector)
	const {statuses} = useAppSelector(state => state.calendar)
	
	const NavigationArray: Array<NavigationArrayItem> = useMemo(() => ([
		{
			title: 'Календарь',
			path: userInfo ? `/calendar/${layout}/${statuses}` : '/calendar',
		},
		{
			title: 'Мои контакты',
			path: '/contacts'
		}
	]), [layout, statuses])
	
	useEffect(() => {
		const urlEl = PageHeaderArray.find((urlItem) => {
			return pathname.toLowerCase().startsWith(urlItem.urlStartWith.toLowerCase())
		})
		
		document.title = urlEl ? urlEl.title : 'Онлайн планировщик дел'
	}, [pathname])
	
	return (
		<>
			<FlexBlock
				width={'100%'}
				align={"center"}
				flex={'1 0  auto'}
				direction={'row'}
				justify={'flex-start'}
			>
				<FlexBlock flex={'1 0 20%'} justify={'flex-start'} align={'center'} gap={8}>
					<EmptyButtonStyled onClick={() => toast('Добро пожаловать в Онлайн Планировщик дел!')}>
						<AppLogoIcon size={30}/>
						<Heading.H2 style={{color: currentColor, fontSize: 16}}>
							Онлайн Планировщик
						</Heading.H2>
					</EmptyButtonStyled>
				</FlexBlock>
				<FlexBlock flex={'1 0 60%'}>
					<NavigationContainer>
						{NavigationArray.map((nav) => (
							<HeaderLinkStyled
								key={nav.path}
								to={nav.path}
								title={nav.title}
								isSelected={pathname.toLowerCase().startsWith(nav.path.toLowerCase())}
							>
								{nav.title}
							</HeaderLinkStyled>
						))}
					</NavigationContainer>
				</FlexBlock>
				<FlexBlock flex={'1 0 20%'}>
					<MainHeaderUserInfo userInfo={userInfo}/>
				</FlexBlock>
			</FlexBlock>
		</>
	)
}