import dayjs from 'dayjs';
import { FunctionComponent } from 'react';

type Props = {
  date: Date;
};

export const TimeRelative: FunctionComponent<Props> = ({ date }) => {
  const now = new Date();
  const relative = date < now ? dayjs(date).fromNow() : dayjs(date).toNow();

  return <time dateTime={date.toISOString()}>{relative}</time>;
};
