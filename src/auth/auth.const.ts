import { convertDaysToMs, convertHoursToMs } from '@/common/helpers/time'

export const EMAIL_OR_PASSWORD_INCORRECT = 'Не верный логин или пароль!'
export const USER_EXISTS = 'Пользователь с таким ником уже существует'
export const ACCESS_TOKEN_TIME = convertHoursToMs(1)
export const REFRESH_TOKEN_TIME = convertDaysToMs(30)
