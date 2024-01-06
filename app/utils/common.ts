import moment from "moment";

export const getStriped = (idx: number) => idx % 2 === 0;

export const formateDate = (date: string) => moment(date).format("DD/MM/YYYY")