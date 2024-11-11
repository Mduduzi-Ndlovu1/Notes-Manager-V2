import moment from "moment";

export const formatTime = (createdAt: string) => {
    const now = moment();
    const created = moment(createdAt);

    // if task is created today
    if (created.isSame(now, "day")) {
        return created.fromNow();
    }

    // if task is created yesterday
    if (created.isSame(now.subtract(1, "day"), "day")) {
        return "Yesterday";
    }

    //check if task was created within the last 7 days
    if (created.isAfter(moment().subtract(6, "days"))) {
        return created.fromNow();
    }

    // if created within the last four weeks
    if (created.isAfter(moment().subtract(3, "weeks"), "week")) {
        return created.fromNow();
    }

    return created.format("DD/MM/YYYY");
}