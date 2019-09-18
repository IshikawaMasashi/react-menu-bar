import React from "react";

import {
  cloneElement,
  useRef,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  ReactElement
} from "react";

type Props = {
  isMenuBarActive?: boolean;
  isMenuBarDescendant?: any;
  menuBarEvents?: any;
  onSelect?: any;
  label?: string;
  command?: any;
  isTopLevel?: boolean;
  children: ReactNode;
  shortcut?: string;
};

function TreeCollapsedDark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0719 7.99999L5.71461 12.3573L6.33333 12.976L11 8.30935V7.69064L6.33333 3.02397L5.71461 3.64269L10.0719 7.99999Z"
        fill="#C5C5C5"
      />
    </svg>
  );
}

export default function MenuItem(props: Props) {
  //   propTypes: {
  //     isMenuBarActive: React.PropTypes.bool,
  //     isMenuBarDescendant: React.PropTypes.func.isRequired,
  //     menuBarEvents: React.PropTypes.object.isRequired,
  //     onSelect: React.PropTypes.func
  //   },
  const elementRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  // const prevOpen = usePrevious(open);
  // constructor(props: any) {
  //   super(props);

  //   this.state = {
  //     open: false
  //   };
  // }

  // getInitialState = () => {
  //   return {
  //     open: false
  //   };
  // };
  useEffect(() => {
    return () => {
      unbindCloseHandlers();
    };
  }, []);

  useEffect(() => {
    if (open) {
      bindCloseHandlers();
      return;
    }
    unbindCloseHandlers();
  }, [open]);
  // componentDidUpdate(prevProps: any, prevState: any) {
  //   if (this.state.open && !prevState.open) {
  //     this.bindCloseHandlers();
  //   } else if (prevState.open && !this.state.open) {
  //     this.unbindCloseHandlers();
  //   }
  // }

  // componentWillUnmount() {
  //   this.unbindCloseHandlers();
  // }

  const getLabel = () => {
    return hasSubmenu() ? props.label : props.children;
    // if (hasSubmenu()) {
    //   return (
    //     <div className={"container"}>
    //       <div></div>
    //       <div>{props.label}</div>
    //     </div>
    //   );
    // }

    // return props.children;
  };

  const getShortcut = () => {
    // return props.shortcut;

    return hasSubmenu() ? (
      !props.isTopLevel && (
        <div style={{ display: "flex" }}>
          <TreeCollapsedDark></TreeCollapsedDark>
        </div>
      )
    ) : (
      <div>{props.shortcut}</div>
    );
  };

  const hasSubmenu = () => {
    return React.isValidElement(props.children);
  };

  const renderSubmenu = () => {
    if (!hasSubmenu()) return;

    var menu = props.children as ReactElement;

    return cloneElement(menu, {
      isMenuBarDescendant: props.isMenuBarDescendant,
      menuBarEvents: props.menuBarEvents,
      onSelect: onSelect
    });
  };

  const onSelect = (key: any) => {
    props.onSelect(key);
    // setState({ open: false });
    setOpen(false);
  };

  const onClick = (e: any) => {
    e.preventDefault();

    if (hasSubmenu()) {
      toggleOpen();
    } else {
      props.onSelect(props.command);
    }
  };

  const onMouseOver = (e: any) => {
    if (props.isTopLevel && props.isMenuBarActive) {
      // setState({ open: true });
      setOpen(true);
    }

    if (!props.isTopLevel && hasSubmenu()) {
      // setState({ open: true });
      setOpen(true);
    }
  };

  const onMouseOut = (e: React.MouseEvent) => {
    if (
      hasSubmenu() &&
      props.isMenuBarDescendant(e.relatedTarget) &&
      !isChildElement(e.relatedTarget)
    ) {
      // setState({ open: false });
      setOpen(false);
    }
  };

  const toggleOpen = () => {
    // setState({ open: !state.open });
    setOpen(!open);
  };

  const bindCloseHandlers = () => {
    document.addEventListener("click", onDocumentClick, false);
    props.menuBarEvents.addMouseOverListener(onMenuBarMouseOver);
  };

  const unbindCloseHandlers = () => {
    document.removeEventListener("click", onDocumentClick, false);
    props.menuBarEvents.removeMouseOverListener(onMenuBarMouseOver);
  };

  // const onDocumentClick = (e: MouseEvent) => {
  //   if (!isChildElement(e.target)) {
  //     // setState({ open: false });
  //     setOpen(false);
  //   }
  // };

  const onDocumentClick = useCallback(
    (e: MouseEvent) => {
      if (!isChildElement(e.target)) {
        // setState({ open: false });
        setOpen(false);
      }
    },
    [setOpen]
  );

  // const onMenuBarMouseOver = (e: React.MouseEvent) => {
  //   e.persist();
  //   if (!isChildElement(e.target)) {
  //     // setState({ open: false });
  //     setOpen(false);
  //   }
  // };

  const onMenuBarMouseOver = useCallback(
    (e: React.MouseEvent) => {
      e.persist();
      if (!isChildElement(e.target)) {
        // setState({ open: false });
        setOpen(false);
      }
    },
    [setOpen]
  );

  const isChildElement = (element: any) => {
    // return this.getDOMNode().contains(element);
    return elementRef.current!.contains(element);
  };

  // render() {
  // var classes = {
  //   open: this.state.open,
  //   "dropdown-submenu": !this.props.isTopLevel && this.hasSubmenu()
  // };
  let classes = "";
  if (open) {
    classes += " open";
  }

  if (!props.isTopLevel && hasSubmenu()) {
    classes += " dropdown-submenu";
  }

  return (
    <div
      className={classes}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      ref={elementRef}
    >
      <div
        className={hasSubmenu() ? "submenu-label" : "menu-item-label"}
        onClick={onClick}
      >
        {getLabel()}
        {getShortcut()}
      </div>
      {renderSubmenu()}
    </div>
  );
  // }
}
