import {ResultLatest} from "../utils/interfaces";
export function latest(data:any): ResultLatest[] {
	let result: ResultLatest[] = [];
	if (data && data.carousel) {
		for (const i of data.carousel) {
			delete i["slug"];
			result.push({
				...i,
			});
		}
	} 
	return result;
};