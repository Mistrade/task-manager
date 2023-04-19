import { FC, useMemo } from 'react';
import styled from 'styled-components';

import { currentColor, darkColor } from '@src/common/constants/constants';

import { UserModel } from '@api/session-api/session-api.types';


export interface UserAvatarProps {
  user: Partial<UserModel>;
  size?: number;
}

const UserAvatarContainer = styled('div')<Pick<UserAvatarProps, 'size'>>`
  & {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    width: ${(_) => _.size || 45}px;
    height: ${(_) => _.size || 45}px;
    border-radius: 50%;
    border: 2px solid ${currentColor};
    background-color: transparent;
    text-decoration: none;
    text-underline: none;
    outline: none;
    color: ${darkColor};
    transition: all 0.6s ease-in-out;
  }

  &:hover {
    background-color: ${currentColor};
    color: #fff;
  }
`;

export const UserAvatar: FC<UserAvatarProps> = ({ user, size }) => {
  const text = useMemo(() => {
    const { name, surname } = user;
    const firstLetterName = name?.substring(0, 1).toUpperCase() || 'П';
    const firstLetterSurname = surname?.substring(0, 1).toUpperCase() || 'П';
    return `${firstLetterName}${firstLetterSurname}`;
  }, [user]);

  return <UserAvatarContainer size={size}>{text}</UserAvatarContainer>;
};