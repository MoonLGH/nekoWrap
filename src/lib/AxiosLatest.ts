import {ResultLatest} from "../utils/interfaces";
export async function latest(data:any): Promise<ResultLatest[]> {
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