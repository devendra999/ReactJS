// IconButton.tsx
import React, { FC, ReactNode } from 'react';
import IconButton from '@mui/material/IconButton';

interface IconButtonProps {
  onClick: () => void;
  icon?: ReactNode;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  iconTitle?: string;
  iconImage?: ReactNode;
}

const IconButtonSingle: FC<IconButtonProps> = ({ onClick, icon, color, size, className, iconTitle, iconImage }) => {
  return (
    <IconButton onClick={onClick}  size={size} className={className}>
      {iconTitle}{icon}  {iconImage}
    </IconButton>
  );
};

export default IconButtonSingle;
