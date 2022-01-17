import type { FC } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  background-color: #ecf0f1;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const Background: FC = ({ children }) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const effect = (globalThis as any).VANTA.NET({
      backgroundColor: '#ecf0f1',
      color: '#3498db',
      el: '#background',
      gyroControls: false,
      maxDistance: 10.0,
      minHeight: 200.0,
      minWidth: 200.0,
      mouseControls: false,
      scale: 1.0,
      scaleMobile: 1.0,
      touchControls: true,
    });

    return () => {
      effect.destroy();
    };
  }, []);

  return <Container id="background">{children}</Container>;
};

export default Background;
