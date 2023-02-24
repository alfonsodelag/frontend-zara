import dayjs from "dayjs";

export const formatDate = (date:Date, format:string="DD/MM/YYYY"):string => dayjs(date).format(format)