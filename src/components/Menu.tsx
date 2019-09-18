// var React = require("react/addons");
import React, { ReactElement } from "react";
import { cloneElement } from "react";
// var cloneWithProps = React.addons.cloneWithProps;

export default class Menu extends React.Component<any, any> {
  // propTypes: {
  //   isMenuBarDescendant: React.PropTypes.func.isRequired,
  //   menuBarEvents: React.PropTypes.object.isRequired,
  //   onSelect: React.PropTypes.func.isRequired
  // },
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <ul className="dropdown-menu" role="menu">
        {React.Children.map(this.props.children, this.renderChild)}
      </ul>
    );
  }

  renderChild = (child: React.ReactNode) => {
    return cloneElement(child as ReactElement, {
      isMenuBarDescendant: this.props.isMenuBarDescendant,
      menuBarEvents: this.props.menuBarEvents,
      onSelect: this.props.onSelect
    });
  };
}
