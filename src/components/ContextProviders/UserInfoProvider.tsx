import { UserInfoContext } from '../../Context/userInfo.context';
import { useConfirmSessionQuery } from '../../store/api/session-api';
import { FCWithChildren } from '../../pages/Planner/planner.types';
import { Loader } from '../Loaders/Loader';

export const UserInfoProvider: FCWithChildren = ({ children }) => {
  const { data: userInfo, isFetching, isError } = useConfirmSessionQuery();

  return (
    <UserInfoContext.Provider value={userInfo?.data || null}>
      <Loader title={'Проверка сессии пользователя...'} isActive={isFetching}>
        {children}
      </Loader>
    </UserInfoContext.Provider>
  );
};
