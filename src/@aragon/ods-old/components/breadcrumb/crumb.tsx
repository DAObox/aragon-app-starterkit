import React, {type ReactComponentElement} from 'react';
import {styled} from 'styled-components';
import {type IconType} from '../icons';
import {type TagProps} from '../tag';

type CrumbProps = {
  first?: boolean;
  label: string;
  last?: boolean;
  icon?: ReactComponentElement<IconType>;
  tag?: React.FunctionComponentElement<TagProps>;
  onClick?: React.MouseEventHandler;
};

const Crumb: React.FC<CrumbProps> = props => {
  return (
    <CrumbContainer
      onClick={props.onClick}
      className={props.last ? 'cursor-default text-ui-600' : 'text-primary-500'}
    >
      {props.first &&
        props.icon &&
        React.cloneElement(props.icon, {
          className: 'desktop:w-2.5 desktop:h-2.5',
        })}
      <p className="font-bold">{props.label}</p>
      {props.last && props.tag}
    </CrumbContainer>
  );
};

export default Crumb;

const CrumbContainer = styled.button.attrs({
  className: 'flex items-center space-x-1 desktop:space-x-1.5' as string,
})``;
