export function checkParams(obj: Object, list: string[]): boolean {
	/** 
	 * Returns true if the obj JSON object ass all the strings in list
	 * as parameters name, returns false instead
	 * 
	 * @param obj - A JSON object to check
	 * @param list - The list of strings to find in the obj parameters
	 *  
	*/
	var out = true
	list.forEach(param => {
		if (!(param in obj)) { out = false }
	});
	return out
}

export function isNumber(string: string): boolean {
	return !isNaN(+string)
}