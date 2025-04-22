'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface SaveButtonProps {
	onSave: () => Promise<void>;
	isSaved: boolean;
	isPending?: boolean;
	className?: string;
}

export function SaveButton({
	onSave,
	isSaved,
	isPending = false,
	className,
}: SaveButtonProps) {
	const [isLoading, setIsLoading] = useState(isPending);

	const handleSave = async () => {
		if (isSaved || isLoading) return;

		setIsLoading(true);
		try {
			await onSave();
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<button
			onClick={handleSave}
			disabled={isSaved || isLoading}
			aria-busy={isLoading}
		>
			{isLoading && (
				<Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
			)}
			{isLoading ? 'Saving...' : isSaved ? 'Saved to plan' : 'Save to plan'}
		</button>
	);
}
