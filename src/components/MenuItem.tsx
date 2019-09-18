import React, { ReactElement, ReactNode } from "react";

import { cloneElement, useRef, useState, useEffect } from "react";

type Props = {
  isMenuBarActive?: boolean;
  isMenuBarDescendant?: any;
  menuBarEvents?: any;
  onSelect?: any;
  label?: string;
  command?: any;
  isTopLevel?: boolean;
  children: ReactNode;
};

export default function MenuItem(props: Props) {
  //   propTypes: {
  //     isMenuBarActive: React.PropTypes.bool,
  //     isMenuBarDescendant: React.PropTypes.func.isRequired,
  //     menuBarEvents: React.PropTypes.object.isRequired,
  //     onSelect: React.PropTypes.func
  //   },
  const elementRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
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
    } else if (!open) {
      unbindCloseHandlers();
    }
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

  const onMouseOut = (e: any) => {
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
    document.removeEventListener("click", onDocumentClick);
    props.menuBarEvents.removeMouseOverListener(onMenuBarMouseOver);
  };

  const onDocumentClick = (e: any) => {
    if (!isChildElement(e.target)) {
      // setState({ open: false });
      setOpen(false);
    }
  };

  const onMenuBarMouseOver = (e: React.MouseEvent) => {
    e.persist();
    if (!isChildElement(e.target)) {
      // setState({ open: false });
      setOpen(false);
    }
  };

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
      </div>
      {renderSubmenu()}
    </div>
  );
  // }
}
