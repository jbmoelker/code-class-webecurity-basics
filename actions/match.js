export const EDIT_MATCH = "EDIT_MATCH";
export const RESET_MATCH = "RESET_MATCH";
export const SAVE_MATCH = "SAVE_MATCH";

export function saveMatch(type,index) {
	return {
		type,
		index
	}
}
