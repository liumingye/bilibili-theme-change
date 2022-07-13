import * as React from 'react';
import styled from 'styled-components';
import { Button as AntdButton, ButtonProps } from 'antd';
import type Group from 'antd/es/button/button-group';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLElement>
  > {
  Group: typeof Group;
  __ANT_BUTTON: boolean;
}

const Button = styled(AntdButton)`
  border-radius: 5px;
`;

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (
  props
) => {
  return (
    <Button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onFocus={(e) => {
        e.target.blur();
      }}
    />
  );
};

const MyButton = React.forwardRef<unknown, ButtonProps>(
  InternalButton
) as CompoundedComponent;

export default MyButton;
