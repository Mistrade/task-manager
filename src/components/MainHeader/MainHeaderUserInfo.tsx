import {FC} from "react";
import {UserModel} from "../Calendars/types";
import {FlexBlock} from "../LayoutComponents/FlexBlock";
import {HeaderDefaultLink, HeaderLinkStyled} from "./HeaderLink.styled.";
import {Link, useNavigate} from "react-router-dom";
import {LinkStyled} from "../Buttons/Link.styled";
import {Button} from "../Buttons/Buttons.styled";
import {useLogoutMutation} from "../../store/api/sessionApi";
import {LogoutIcon} from "../Icons/Session/LogoutIcon";
import {css} from "styled-components";
import {EmptyButtonStyled} from "../Buttons/EmptyButton.styled";

export interface MainHeaderUserInfoProps {
	userInfo?: UserModel | null
}

export const MainHeaderUserInfo: FC<MainHeaderUserInfoProps> = ({userInfo}) => {
	const [logoutUser] = useLogoutMutation()
	const navigate = useNavigate()
	return (
		<FlexBlock width={'100%'} justify={'flex-end'}>
			{!userInfo ? (
				<FlexBlock gap={12}>
					<HeaderDefaultLink to={'/session/login'}>
						Вход в систему
					</HeaderDefaultLink>
					<HeaderDefaultLink to={'/session/registration'}>
						Регистрация
					</HeaderDefaultLink>
				</FlexBlock>
			) : (
				<FlexBlock align={'center'} gap={12}>
					<FlexBlock>
						{userInfo.name + ' ' + (userInfo.surname || '')}
					</FlexBlock>
					<EmptyButtonStyled>
						<LogoutIcon
							size={36}
							additionalCss={css`cursor: pointer`}
							onClick={async () => await logoutUser().then(() => navigate('/session/login', {replace: true}))}
						>
							Выход
						</LogoutIcon>
					</EmptyButtonStyled>
				</FlexBlock>
			)}
		</FlexBlock>
	)
}