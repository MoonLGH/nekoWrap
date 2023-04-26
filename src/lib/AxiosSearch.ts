import {ResultSearch} from "../utils/interfaces";
export function AxiosSearch(data:any) : ResultSearch[] {
	let result = []
	if (data && Array.isArray(data.result)) {
		for (const i of data.result) {
			result.push({ ...i });
		}
	}
	return result;
};