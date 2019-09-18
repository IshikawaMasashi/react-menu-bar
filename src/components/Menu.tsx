import React, { ReactElement, ReactNode } from "react";
import { cloneElement } from "react";

type Props = {
  isMenuBarDescendant?: any;
  menuBarEvents?: any;
  onSelect?: any;
  children: ReactNode;
};

export default function Menu(props: Props) {
  // propTypes: {
  //   isMenuBarDescendant: React.PropTypes.func.isRequired,
  //   menuBarEvents: React.PropTypes.object.isRequired,
  //   onSelect: React.PropTypes.func.isRequired
  // },
  // constructor(props: any) {
  //   super(props);
  // }

  const renderChild = (child: React.ReactNode) => {
    return cloneElement(child as ReactElement, {
      isMenuBarDescendant: props.isMenuBarDescendant,
      menuBarEvents: props.menuBarEvents,
      onSelect: props.onSelect
    });
  };

  return (
    <div className="dropdown-menu" role="menu">
      {React.Children.map(props.children, renderChild)}
    </div>
  );
}
