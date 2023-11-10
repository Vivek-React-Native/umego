export const lineTypeHelper = (type: string, text?: string) => {
	let height: number;
	if (!text) {
		height = type === "thin" ? 2 : type === "medium" ? 4 : 6;
	} else {
		height = type === "thin" ? 18 : type === "medium" ? 22 : 25;
	}
	return height;
};
