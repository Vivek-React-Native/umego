export const inputContainerStyleHelper = (
	type: string,
	corner: string,
	inputError: boolean,
	hasError: boolean,
	required?: boolean,
) => {
	return {
		borderRadius:
			corner === "cornered" ? 0 : corner === "curved" ? 5 : corner === "rounded" ? 10 : corner === "circle" ? 50 : 0,
		borderColor: (required && inputError) || hasError ? "red" : "black",
	};
};

export const inputStyleHelper = (type: string) => {
	let height = type === "textarea" ? 80 : 40;
	return { height };
};
