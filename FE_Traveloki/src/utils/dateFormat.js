import { format } from 'date-fns';
import { de, vi } from 'date-fns/locale';

// const dateStr = '2024-07-03';

export const FormatToVI = async (dateStr) => {
  const date = new Date(dateStr);
  const formattedDate =  format(date, "EEEE, dd 'tháng' MM yyyy", {
    locale: vi,
  });
  console.log(formattedDate);

  return formattedDate
};

//  default FormatToVI
