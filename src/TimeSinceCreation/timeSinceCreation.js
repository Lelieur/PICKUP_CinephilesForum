const TimeSinceCreation = creationDate => {

    const now = new Date();
    const createdAt = new Date(creationDate);
    const differenceInMilliseconds = now - createdAt;

    const minutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);

    if (minutes < 60) {
        return `${minutes}m`;
    } else if (hours < 24) {
        return `${hours}h`;
    } else if (days <= 7) {
        return `${days}d`;
    } else {
        const day = createdAt.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[createdAt.getMonth()];
        return `${day} ${month}`;
    }
}

export default TimeSinceCreation
