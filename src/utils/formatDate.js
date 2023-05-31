import moment from "moment";

export const formatDate = (
  date,
  format = "DD MMMM yyyy ",
  castFormat = "YYYY-MM-DD Z"
) => moment(date, castFormat).format(format);
