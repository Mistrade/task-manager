import {UserModel} from "../../../store/api/session-api/session-api.types";
import {FC, useMemo} from "react";
import styled from "styled-components";
import {currentColor} from "../../../common/constants";

export interface UserAvatarProps {
	user: Partial<UserModel>
}

//borderRadius={'50%'}
// 					border={`2px solid ${currentColor}`}
// 					align={'center'}
// 					justify={'center'}
// 					fSize={18}
// 					width={45}
// 					height={45}
// 					bgColor={'transparent'}

const UserAvatarContainer = styled('div')`
  & {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid ${currentColor};
    background-color: transparent;
  }
`

export const UserAvatar: FC<UserAvatarProps> = ({user}) => {
	const text = useMemo(() => {
		const {name, surname} = user
		const firstLetterName = name?.substring(0, 1).toUpperCase() || 'П'
		const firstLetterSurname = surname?.substring(0, 1).toUpperCase() || 'П'
		return `${firstLetterName}${firstLetterSurname}`
	}, [user])
	
	return (
		<UserAvatarContainer>
			{text}
		</UserAvatarContainer>
	)
}