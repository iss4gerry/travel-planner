import { ZodError, ZodIssue } from 'zod';

const formatZodIssue = (issue: ZodIssue): string => {
	const { path, message } = issue;
	const pathString = path.join('.');

	return `${pathString}: ${message}`;
};

export const formatZodError = (error: ZodError): string | undefined => {
	return error.issues.map(formatZodIssue).join(', ');
};
