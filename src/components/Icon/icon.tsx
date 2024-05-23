import { ComponentProps } from 'react';

import IconSprite from '../../assets/icon-sprite.svg';
import { IconName } from './type';

interface IconProps extends Omit<ComponentProps<'svg'>, 'width' | 'height'> {
  id: IconName;
  size?: number;
}

const Icon = ({ id, size = 20, ...props }: IconProps) => {
  return (
    <svg width={size} height={size} {...props}>
      <use href={`${IconSprite}#${id}`} />
    </svg>
  );
};

export default Icon;
