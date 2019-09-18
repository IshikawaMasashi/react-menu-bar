import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
};

const { useEffect, useLayoutEffect, useRef } = React;

function Portal({ children }: Props) {
  // const [canRender, setCanRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(document.createElement('div'));
  // state = {
  //   canRender: false
  // };
  // const container = document.createElement("div");
  useLayoutEffect(() => {
    if (containerRef.current) {
      document.body.appendChild(containerRef.current);
    }
  });
  useEffect(() => {
    // this.container = document.createElement("div");
    // document.body.appendChild(container);
    // this.setState({
    //   canRender: true
    // });
    // setCanRender(true);
    return () => {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, []);
  // componentDidMount() {
  //   this.container = document.createElement('div');
  //   document.body.appendChild(this.container);
  //   this.setState({
  //     canRender: true
  //   });
  // }

  // componentWillUnmount() {
  //   document.body.removeChild(this.container);
  // }
  // render() {
  return createPortal(children, containerRef.current!);
  // }
}

export { Portal };
