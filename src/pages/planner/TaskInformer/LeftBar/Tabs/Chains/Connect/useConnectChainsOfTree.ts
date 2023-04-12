import { useCallback, useEffect, useState } from 'react';
import {
  EventInfoModel,
  ShortEventInfoModel,
} from '@api/planning-api/types/event-info.types';
import { useConnectChainsMutation } from '@api/planning-api';
import {
  AddChainsRequestData,
  ConnectChildResponse,
} from '@api/planning-api/types/event-chains.types';
import { MyServerResponse } from '@api/rtk-api.types';
import { ConnectChainsProps } from '@planner/TaskInformer/LeftBar/Tabs/Chains/event-chains.types';
import {
  CatchHandleForToast,
  thenHandleForToast,
} from '@api/tools';
import { toast } from 'react-toastify';

export type ConnectChainsSteps =
  | null
  | 'preview-before-submit'
  | 'validation-result'
  | 'success';

export interface UseConnectChainsOfTreeProps {
  initialStep?: ConnectChainsSteps;
  eventInfo: EventInfoModel;
  chainsType: 'childOf' | 'parentOf';
  onSuccess?: ConnectChainsProps['onSuccess'];
}

export const useConnectChainsOfTree = (props: UseConnectChainsOfTreeProps) => {
  const [selectedEventsList, setSelectedEventsList] = useState<
    Array<ShortEventInfoModel>
  >([]);
  const [step, setStep] = useState<ConnectChainsSteps>(
    props.initialStep || null
  );
  const [addChains, { data, isLoading, error }] = useConnectChainsMutation();

  useEffect(() => {
    if (step === 'preview-before-submit' && selectedEventsList.length === 0) {
      setStep(null);
    }
  }, [selectedEventsList, step]);

  const save = useCallback(
    async (data: AddChainsRequestData) => {
      await addChains(data)
        .unwrap()
        .then((r: MyServerResponse<ConnectChildResponse>) =>
          thenHandleForToast(r, () => {
            props.onSuccess && props.onSuccess(props.eventInfo);
          })
        )
        .catch(CatchHandleForToast);
    },
    [props.onSuccess, props.eventInfo]
  );

  const sendDataHandler = useCallback(async () => {
    if (selectedEventsList.length) {
      switch (props.chainsType) {
        case 'childOf':
          await save({
            eventsToAdd: selectedEventsList.map((event) => event._id),
            eventId: props.eventInfo._id,
          });
          break;
        case 'parentOf':
          await save({
            eventsToAdd: [props.eventInfo._id],
            eventId: selectedEventsList[0]._id,
          });
          break;
      }
    } else {
      toast('Выберите события для сохранения связей', { type: 'info' });
    }
  }, [props.chainsType, selectedEventsList, props.eventInfo]);

  const goNextHandler = useCallback(async () => {
    if (!step) {
      return setStep('preview-before-submit');
    }

    switch (step) {
      case null:
        setStep('preview-before-submit');
        break;
      case 'preview-before-submit':
        await sendDataHandler();
        break;
    }
  }, [step, selectedEventsList, props.eventInfo, props.chainsType]);

  const goBackHandler = useCallback(() => {
    if (!step) {
      return setSelectedEventsList([]);
    }

    if (step === 'preview-before-submit') {
      return setStep(null);
    }
  }, [step, selectedEventsList]);

  const addToSelected = useCallback(
    (item: ShortEventInfoModel) => {
      switch (props.chainsType) {
        case 'childOf':
          setSelectedEventsList((prev) => {
            const newArr = [...prev];
            newArr.push(item);
            return newArr;
          });
          break;
        case 'parentOf':
          setSelectedEventsList([item]);
          break;
      }
    },
    [setSelectedEventsList, props.chainsType]
  );

  const removeFromSelected = useCallback(
    (item: ShortEventInfoModel) => {
      switch (props.chainsType) {
        case 'childOf':
          setSelectedEventsList((prev) =>
            prev.filter((prevItem) => prevItem._id !== item._id)
          );
          break;
        case 'parentOf':
          setSelectedEventsList([]);
          break;
      }
    },
    [props.chainsType, setSelectedEventsList]
  );

  const selectHandler = useCallback(
    (item: ShortEventInfoModel) => {
      if (selectedEventsList.find((arrItem) => arrItem._id === item._id)) {
        return removeFromSelected(item);
      }

      return addToSelected(item);
    },
    [props.chainsType, removeFromSelected, selectedEventsList, addToSelected]
  );

  return {
    next: goNextHandler,
    isLoading,
    back: goBackHandler,
    select: selectHandler,
    remove: removeFromSelected,
    step,
    eventsList: selectedEventsList,
  };
};
