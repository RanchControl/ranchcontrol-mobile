import { useState } from 'react';

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen(!isOpen);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return { isOpen, onToggle, onClose, onOpen };
};

export { useToggle };
