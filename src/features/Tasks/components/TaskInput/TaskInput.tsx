import { FunctionComponent, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { AddTaskFn } from '../../hooks/useTasks';

type Props = {
  onAdd: AddTaskFn;
};

type FormData = {
  title: string;
};

export const TaskInput: FunctionComponent<Props> = ({ onAdd }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const handleAdd = useCallback(
    (data: FormData) => {
      onAdd({
        title: data.title,
      });
      reset();
    },
    [onAdd, reset],
  );

  return (
    <div>
      <form onSubmit={handleSubmit(handleAdd)}>
        <input
          type="text"
          {...register('title', { required: true, minLength: 1 })}
        />
      </form>
    </div>
  );
};
