import { Request } from 'express'

export const cookieExtractors = (req?: Request) => {
	let token
	if (req && req.cookies) {
		token = req.cookies.accessToken
	}
	return token
}
