import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.hourly(
	"remove orphaned uploads",
	{ minuteUTC: 0 },
	internal.cleanup.orphanFiles,
	{},
);
crons.hourly(
	"expire demo data",
	{ minuteUTC: 15 },
	internal.cleanup.demoData,
	{},
);
crons.daily(
	"expire demo accounts",
	{ hourUTC: 4, minuteUTC: 30 },
	internal.cleanup.demoAccounts,
	{},
);

export default crons;
