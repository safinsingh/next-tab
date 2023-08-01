const formatTime = (time: number) => (time < 10 ? `${time}` : `${time}`);

export const getCurrentTime = () => {
	const now = new Date();
	let hours = now.getHours();
	const minutes = now.getMinutes();
	const ampm = hours >= 12 ? "pm" : "am";

	if (hours > 12) {
		hours -= 12;
	} else if (hours === 0) {
		hours = 12;
	}

	const formattedHours = formatTime(hours);

	return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};