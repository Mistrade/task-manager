import {CalendarPriorityKeys, EventLinkItem, TaskStatusesType} from "../../../../pages/Planner/planner.types";
import {UserModel} from "../../session-api/session-api.types";
import {GroupModelResponse} from "./groups.types";
import {ObjectId, UtcDate} from "../../rtk-api.types";

export interface QuerySnapshotRequiredFields {
	//id записи
	_id: ObjectId,
	//Когда событие было создано
	createdAt: UtcDate,
	//Кто создал событие
	user: UserModel | null,
	//id актуального события
	originalEventId: ObjectId | null,
	//Заголовок или название
	title: string,
	//Приоритет события
	priority: CalendarPriorityKeys,
	//Статус события
	status: TaskStatusesType
}

export interface QuerySnapshotOptionalFields {
	//Календарь, за которым закреплено событие
	group?: GroupModelResponse | null,
	//Описание
	description?: string,
	//Список событий, которые были добавлены как дочерние
	insertChildOfEvents?: Array<QuerySnapshotRequiredFields | null>,
	//Список событий, которые были удалены из дочерних
	removeChildOfEvents?: Array<QuerySnapshotRequiredFields | null>,
	//Список пользователей, добавленных к событию
	sendInvites?: Array<UserModel | null>,
	//Список пользователей, которые были удалены из события
	closeInvites?: Array<UserModel | null>,
	//Ссылка события
	link?: EventLinkItem | null,
	//Родительское событие
	parentEvent?: QuerySnapshotRequiredFields | null,
	//Событие, от которого производилось клонирование
	linkedFrom?: QuerySnapshotRequiredFields | null,
	//Время начала события
	time?: UtcDate | null,
	//Время завершения события
	timeEnd?: UtcDate | null,
	//Тип события (пока не актуально)
	type?: string | null,
	//Избранное событие или нет
	isLiked?: boolean
}

//Возвращаемый тип данных объекта snapshot из запроса в БД истории
export type EventHistoryQuerySnapshot = QuerySnapshotRequiredFields & QuerySnapshotOptionalFields
export type EventHistoryEditableFieldNames = keyof Omit<QuerySnapshotOptionalFields & QuerySnapshotRequiredFields, "_id">

//Интерфейс объекта истории, который возвращается из базы с заполнением полей
export interface EventHistoryQueryResult {
	_id: ObjectId,
	//Дата когда была произведена запись в историю
	date: UtcDate,
	//Имя ключа из snapshot, которое было изменено
	fieldName: EventHistoryEditableFieldNames,
	//Юзер, который производил изменения
	changeUserId: UserModel | null,
	//Id, за которым закреплена запись истории
	eventId: ObjectId | null,
	//Описание записи истории
	snapshotDescription: string,
	//Скриншот события для истории
	eventSnapshot: EventHistoryQuerySnapshot,
	//Если isPrivate = true, то эта запись истории будет отображаться только у создателя historyItem
	isPrivate: boolean
}