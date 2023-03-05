import {ObjectId, UtcDate} from "../rtk-api.types";

export interface UserModel {
	_id: ObjectId,
	email?: string,
	phone: string,
	name: string,
	surname: string,
	patronymic?: string,
	created: UtcDate,
	avatar?: string
}

export interface RegUserRequestProps {
	phone: string,
	password: string,
	confirmPassword: string,
	name: string,
	surname: string
}

export interface AuthUserRequestProps {
	phone: string,
	password: string
}