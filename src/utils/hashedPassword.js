import moment from "moment";
import md5 from "md5";

const timestamp = new Date().getTime();
const date = moment.utc(timestamp);
const formattedDate = date.format("YYYYMMDD");

export const hashedPassword = md5(`Valantis_${formattedDate}`);
