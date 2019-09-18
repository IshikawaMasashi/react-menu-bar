// var React = require("react/addons");
import React from "react";
import {
  cloneElement,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import MenuBarEvents from "./MenuBarEvents";
import usePrevious from "../hooks/usePrevious";

// var MenuBarEvents = require("./MenuBarEvents");
// var cloneWithProps = React.addons.cloneWithProps;

type Props = { onSelect: (command: string) => void; children: ReactNode };
// type State = { events?: MenuBarEvents; isActive: boolean };

export default function MenuBar(props: Props) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const prevIsActive = usePrevious(isActive);
  const [events] = useState(new MenuBarEvents());
  // propTypes: {
  //   onSelect: React.PropTypes.func.isRequired
  // },

  // constructor(props: Props) {
  //   super(props);

  //   this.state = {
  //     isActive: false
  //   };
  // }

  // getInitialState = () => {
  //   return {
  //     isActive: false
  //   };
  // };

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (isActive && !prevIsActive) {
      bindSetInactiveHandler();
    } else if (prevIsActive && !isActive) {
      unbindSetInactiveHandler();
    }
    return () => {};
  }, [isActive]);

  const renderMenuItem = (child: ReactElement) => {
    return cloneElement(child, {
      isMenuBarActive: isActive,
      isMenuBarDescendant: isMenuBarDescendant,
      isTopLevel: true,
      menuBarEvents: events,
      onSelect: props.onSelect
    });
  };

  const isMenuBarDescendant = (element: HTMLElement) => {
    // return this.getDOMNode().contains(element);
    return elementRef.current!.contains(element);
  };

  // const handleDocumentClick = (e: any) => {
  //   // this.setState({ isActive: false });
  //   setIsActive(false);
  // };

  const handleDocumentClick = useCallback(() => {
    setIsActive(false);
  }, [setIsActive]);

  const bindSetInactiveHandler = () => {
    document.addEventListener("click", handleDocumentClick);
  };

  const unbindSetInactiveHandler = () => {
    document.removeEventListener("click", handleDocumentClick, false);
  };

  const onClick = (e: React.MouseEvent) => {
    // this.setState({ isActive: !this.state.isActive });
    setIsActive(!isActive);
  };

  const onMouseOver = (e: React.MouseEvent) => {
    events.emitMouseOver(e);
  };

  // render() {
  return (
    <div
      className="menu-bar nav navbar-nav"
      onClick={onClick}
      onMouseOver={onMouseOver}
      ref={elementRef}
    >
      {React.Children.map(props.children as ReactElement, renderMenuItem)}
    </div>
  );
  // }
}
