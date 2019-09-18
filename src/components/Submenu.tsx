import React, { ReactNode, SyntheticEvent } from 'react';
import cx from 'classnames';

import { cloneItem } from './cloneItem';
import { styles } from '../utils/styles';
import {
  MenuItemEventHandler,
  TriggerEvent,
  StyleProps,
  InternalProps
} from '../types';

export interface SubMenuProps extends StyleProps, InternalProps {
  /**
   * Any valid node that can be rendered
   */
  label: ReactNode;

  /**
   * Any valid node that can be rendered
   */
  children: ReactNode;

  /**
   * Render a custom arrow
   */
  arrow?: ReactNode;

  /**
   * Disable or not the `Submenu`. If a function is used, a boolean must be returned
   */
  disabled?: boolean | ((args: MenuItemEventHandler) => boolean);
}

interface SubMenuState {
  left?: string | number;
  right?: string | number;
  top?: string | number;
  bottom?: string | number;
}

const { useState, useRef, useEffect } = React;
function Submenu({
  arrow = '▶',
  disabled = false,
  nativeEvent = {} as TriggerEvent,
  className,
  style,
  label,
  children,
  propsFromTrigger
}: SubMenuProps) {
  const [state, setState] = useState<SubMenuState>({
    left: '100%',
    top: 0,
    bottom: 'initial'
  });

  const menuRef = useRef<HTMLDivElement>(null);

  // setRef = (ref: HTMLDivElement) => {
  //   this.menu = ref;
  // };

  // const componentDidMount = () => {
  //   const { innerWidth, innerHeight } = window;
  //   const rect = menuRef.current.getBoundingClientRect();
  //   const style: SubMenuState = {};

  //   if (rect.right < innerWidth) {
  //     style.left = "100%";
  //     style.right = undefined;
  //   } else {
  //     style.right = "100%";
  //     style.left = undefined;
  //   }

  //   if (rect.bottom > innerHeight) {
  //     style.bottom = 0;
  //     style.top = "initial";
  //   } else {
  //     style.bottom = "initial";
  //     style.top = 0;
  //   }

  //   setState(style);
  // };

  useEffect(() => {
    if (menuRef.current) {
      const { innerWidth, innerHeight } = window;
      const rect = menuRef.current.getBoundingClientRect();
      const style: SubMenuState = {};

      if (rect.right < innerWidth) {
        style.left = '100%';
        style.right = undefined;
      } else {
        style.right = '100%';
        style.left = undefined;
      }

      if (rect.bottom > innerHeight) {
        style.bottom = 0;
        style.top = 'initial';
      } else {
        style.bottom = 'initial';
        style.top = 0;
      }

      setState(style);
    }
  }, [menuRef.current]);

  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const cssClasses = cx(styles.item, className, {
    [`${styles.itemDisabled}`]:
      typeof disabled === 'function'
        ? disabled({
            event: nativeEvent as TriggerEvent,
            props: { ...propsFromTrigger }
          })
        : disabled
  });

  const submenuStyle = {
    ...style,
    ...state
  };

  return (
    <div className={cssClasses} role="presentation">
      <div className={styles.itemContent} onClick={handleClick}>
        {label}
        <span className={styles.submenuArrow}>{arrow}</span>
      </div>
      <div className={styles.submenu} ref={menuRef} style={submenuStyle}>
        {cloneItem(children, {
          propsFromTrigger,
          nativeEvent: nativeEvent as TriggerEvent
        })}
      </div>
    </div>
  );
  // }
}

export { Submenu };
