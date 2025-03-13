export function parseFormData<T extends Record<string, string | number>>(
	formData: FormData,
	schema: Record<keyof T, 'string' | 'number'>
): T {
	const result: Partial<T> = {};

	for (const key in schema) {
		const value = formData.get(key);
		if (value === null) {
			throw new Error(`Field "${key}" wajib diisi!`);
		}

		(result[key] as any) =
			schema[key] === 'number'
				? parseFloat(value.toString())
				: value.toString();
	}

	return result as T;
}
