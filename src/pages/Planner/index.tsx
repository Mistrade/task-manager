import { FC } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { CalendarStatusProxy } from './UrlProxy/CalendarStatusProxy';
import { ErrorScreen } from '../../components/Errors/ErrorScreen';
import { CenteredContainer } from '../../components/AppRoutes/Interceptors/SessionInterceptor';
import {
  DEFAULT_PLANNER_LAYOUT,
  DEFAULT_PLANNER_STATUS,
  PLANNER_LAYOUTS,
} from '../../common/constants';
import { useSearchNavigate } from '../../hooks/useSearchNavigate';
import { ServicesNames } from '../../store/reducers/global';
import { Navigate } from 'react-router';

const layouts: Array<PLANNER_LAYOUTS> = [
  PLANNER_LAYOUTS.DAY,
  PLANNER_LAYOUTS.WEEK,
  PLANNER_LAYOUTS.MONTH,
  PLANNER_LAYOUTS.YEAR,
  PLANNER_LAYOUTS.LIST,
  PLANNER_LAYOUTS.FAVORITES,
];

export const PlannerController: FC = () => {
  const { layout } = useParams<{ layout: PLANNER_LAYOUTS }>();
  const navigate = useSearchNavigate();
  const isCorrectLayout = (l: PLANNER_LAYOUTS | undefined) => {
    return l && layouts.includes(l);
  };

  if (isCorrectLayout(layout) && layout) {
    return (
      <Routes>
        <Route
          index
          element={
            <Navigate
              to={`/${ServicesNames.PLANNER}/${layout}/${DEFAULT_PLANNER_STATUS}`}
            />
          }
        />
        <Route
          path={':taskStatus/*'}
          element={<CalendarStatusProxy layout={layout} />}
        />
      </Routes>
    );
  }

  return (
    <CenteredContainer>
      <ErrorScreen
        title={'Такого URL не существует'}
        description={
          'В адресной строке допущена ошибка относительно режима отображения событий. Нажмите на кнопку ниже, если вы хотели попасть в "Планировщик"'
        }
        errorType={'SYSTEM_ERROR'}
        action={{
          title: 'Перейти к планировщику',
          onClick: () => {
            navigate(
              `/${ServicesNames.PLANNER}/${DEFAULT_PLANNER_LAYOUT}/${DEFAULT_PLANNER_STATUS}`
            );
          },
        }}
      />
    </CenteredContainer>
  );
};
