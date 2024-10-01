export type Task = {
	id: string;
	title: string;
	complexity: string;
    technology: string;
	videoId?: string;
};

export const tasks: Task[] = [
	{
		id: "0",
		title: "Initialisation d'un projet Next.js",
		complexity: "low",
        technology: "nextjs",
		videoId: "WYZhYRKa5pA",
	},
    {
        id: "1",
        title: "Configuration des routes App Router",
        complexity: "low",
        technology: "nextjs",
        videoId: "",
    },
]
