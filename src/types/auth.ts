export type UserResponse = {
	id: string;
	profilePicture?: string;
	name: string;
	email?: string;
	password: string;
	role: string;
	createdAt: Date;
	updatedAt: Date;
	isEmailVerified: boolean;
};
