export function img<T extends TemplateStringsArray>(str: T): `{BASE_URL}/${T[0]}` {
	return `${import.meta.env.BASE_URL}/${str[0]}` as `{BASE_URL}/${T[0]}`
}