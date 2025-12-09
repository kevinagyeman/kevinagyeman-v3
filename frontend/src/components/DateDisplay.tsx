import { formatDate } from "@/utils/utils";

type DateDisplayProps = {
	period: {
		start_date: string;
		end_date?: string | null;
		is_present_date: boolean;
	};
};

function DateDisplay({ period }: DateDisplayProps) {
	const { start_date, end_date, is_present_date } = period;
	const endDateDisplay =
		is_present_date || !end_date ? "Present" : formatDate(end_date);

	return (
		<p className="text-sm text-muted-foreground">
			{formatDate(start_date)} - {endDateDisplay}
		</p>
	);
}

export default DateDisplay;
