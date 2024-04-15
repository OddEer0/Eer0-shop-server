import { Prisma } from '@prisma/client'

export const DEVICE_INCLUDE_KEYS: Array<keyof Prisma.DeviceInclude> = [
	'_count',
	'bookings',
	'brand',
	'carts',
	'category',
	'comment',
	'infos',
	'purchases',
	'rate',
	'refounds'
]

export const USER_INCLUDE_KEYS: Array<keyof Prisma.UserInclude> = [
	'_count',
	'addRates',
	'bookings',
	'cart',
	'comments',
	'purchases',
	'refounds',
	'roles',
	'token'
]

export const FILTER_INCLUDE_KEYS: Array<keyof Prisma.FilterInclude> = ['_count', 'category', 'infos']

export const INFO_INCLUDE_KEYS: Array<keyof Prisma.InfoInclude> = ['_count', 'devices', 'filter']

export const CATEGORY_INCLUDE_KEYS: Array<keyof Prisma.CategoryInclude> = ['_count', 'brands', 'devices', 'filters']

export const BRAND_INCLUDE_KEYS: Array<keyof Prisma.BrandInclude> = ['_count', 'categories', 'device']

export const ROLE_INCLUDE_KEYS: Array<keyof Prisma.RoleInclude> = ['_count', 'users']

export const CART_DEVICE_INCLUDE_KEYS: Array<keyof Prisma.CartDeviceInclude> = ['device', 'user']

export const COMMENT_INCLUDE_KEYS: Array<keyof Prisma.CommentInclude> = ['device', 'user']

export const PURCHASE_DEVICE_INCLUDE_KEYS: Array<keyof Prisma.PurchaseDeviceInclude> = ['device', 'user']

export const BOOKINGS_DEVICE_INCLUDE_KEYS: Array<keyof Prisma.BookingsDeviceInclude> = ['device', 'user']

export const REFOUND_INCLUDE_KEYS: Array<keyof Prisma.RefoundInclude> = ['device', 'user']
