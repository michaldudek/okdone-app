import dayjs from 'dayjs';
import { ComponentProps, FunctionComponent } from 'react';

type Props = Omit<ComponentProps<'time'>, 'dateTime'> & {
  date: Date;
};

export const TimeRelative: FunctionComponent<Props> = ({ date, ...props }) => {
  const now = new Date();
  const relative = date < now ? dayjs(date).fromNow() : dayjs(date).toNow();

  return (
    <time dateTime={date.toISOString()} {...props}>
      {relative}
    </time>
  );
};
