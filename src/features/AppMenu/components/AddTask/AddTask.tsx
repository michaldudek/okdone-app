import { Plus } from 'phosphor-react';
import { FunctionComponent } from 'react';
import { platformKeys } from 'services/Platform';
import { AppMenuButton } from '../AppMenuButton';

export const AddTask: FunctionComponent = () => {
  const handleClick = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'n',
      ctrlKey: true,
    });
    window.dispatchEvent(event);
  };

  return (
    <AppMenuButton
      tabIndex={0}
      title={`Add new task (${platformKeys(['ctrl', 'n'])})`}
      onClick={handleClick}
    >
      <Plus size={28} />
    </AppMenuButton>
  );
};
