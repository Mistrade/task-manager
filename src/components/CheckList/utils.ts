import {ICheckListItem} from "@planner/types";
import dayjs from "dayjs";
import {DATE_RENDER_FORMAT} from "../../common/constants/defaultConstants";

export function generateCheckListCopyContent (title: string, arr: Array<ICheckListItem>): string {
	const resultTitle = `Чек-лист: ${title}`;
	const items = arr.map((item, index) => `${index + 1}. ${item.title}`).join('\n');
	const copyright = `Сгенерировано сервисом WhitePlanner ${dayjs().format(DATE_RENDER_FORMAT)}`
	return `${resultTitle}\n\n${items}\n\n${copyright}`
}