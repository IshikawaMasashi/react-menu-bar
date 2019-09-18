// var React = require("react/addons");
import React, { ReactElement } from "react";
import { cloneElement } from "react";
// var cloneWithProps = React.addons.cloneWithProps;

type Props = {
  isMenuBarDescendant?: any;
  menuBarEvents?: any;
  onSelect?: any;
};
export default class Menu extends React.Component<Props, any> {
  // propTypes: {
  //   isMenuBarDescendant: React.PropTypes.func.isRequired,
  //   menuBarEvents: React.PropTypes.object.isRequired,
  //   onSelect: React.PropTypes.func.isRequired
  // },
  constructor(props: any) {
    super(props);
  }

  renderChild = (child: React.ReactNode) => {
    return cloneElement(child as ReactElement, {
      isMenuBarDescendant: this.props.isMenuBarDescendant,
      menuBarEvents: this.props.menuBarEvents,
      onSelect: this.props.onSelect
    });
  };

  render() {
    return (
      <div className="dropdown-menu" role="menu">
        {React.Children.map(this.props.children, this.renderChild)}
      </div>
    );
  }
}
