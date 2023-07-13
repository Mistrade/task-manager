import { ObjectId } from '../rtk-api.types';
import {
  FINANCE_OPERATION_TYPES,
  IFinanceModel,
  TOperationSwitchItem,
} from './types';

export function updateGetFinanceModelsData(initial: Array<IFinanceModel>) {
  const switcherData: Array<TOperationSwitchItem> = [];
  const models: { [key in ObjectId]: IFinanceModel } = {};

  initial?.forEach((item) => {
    switcherData.push({
      title: item.title,
      type: item._id,
      badgeValue: item.analytic.profit,
      badgeType:
        item.analytic.profit >= 0
          ? FINANCE_OPERATION_TYPES.INCOME
          : FINANCE_OPERATION_TYPES.CONSUMPTION,
    });
    models[item._id] = item;
  });

  return {
    switcherData,
    models,
  };
}
