// Formats the date in a readable format
export  const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();

    const suffix = (d: number) => {
        if (d > 3 && d < 21) return "th";
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();

    return `${day}${suffix(day)} ${month} ${year}`;
};