import { FunctionComponent, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { NewTask } from '../../types';

export type OnAddFn = (task: NewTask) => void;

type Props = {
  onAdd: OnAddFn;
};

type FormData = {
  name: string;
};

export const TaskInput: FunctionComponent<Props> = ({ onAdd }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const handleAdd = useCallback(
    (data: FormData) => {
      onAdd({
        name: data.name,
        createdAt: new Date(),
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
          {...register('name', { required: true, minLength: 1 })}
        />
      </form>
    </div>
  );
};
