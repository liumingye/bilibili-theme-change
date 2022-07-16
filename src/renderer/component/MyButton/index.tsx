import * as React from 'react';
import styled from 'styled-components';
import { Button as AntdButton, ButtonProps } from 'antd';

const Button = styled(AntdButton)`
  border-radius: 5px !important;
`;

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (
  props,
  ref
) => {
  const buttonRef = ref as never;
  return (
    <Button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      ref={buttonRef}
      onFocus={(e) => {
        e.target.blur();
      }}
    />
  );
};

const MyButton = React.forwardRef<unknown, ButtonProps>(InternalButton);

export default MyButton;
