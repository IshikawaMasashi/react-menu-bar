// var React = require("react/addons");
import React, { ReactElement } from "react";
import { cloneElement } from "react";
import MenuBarEvents from "./MenuBarEvents";

// var MenuBarEvents = require("./MenuBarEvents");
// var cloneWithProps = React.addons.cloneWithProps;

export default class MenuBar extends React.Component<
  any,
  { events?: any; isActive: boolean }
> {
  element: HTMLElement | null = null;
  // propTypes: {
  //   onSelect: React.PropTypes.func.isRequired
  // },

  constructor(props: any) {
    super(props);

    this.state = {
      isActive: false
    };
  }

  // getInitialState = () => {
  //   return {
  //     isActive: false
  //   };
  // };

  componentWillMount() {
    this.setState({
      events: new MenuBarEvents()
    });
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.state.isActive && !prevState.isActive) {
      this.bindSetInactiveHandler();
    } else if (prevState.isActive && !this.state.isActive) {
      this.unbindSetInactiveHandler();
    }
  }

  render() {
    return (
      <ul
        className="menu-bar nav navbar-nav"
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        ref={ref => (this.element = ref)}
      >
        {React.Children.map(
          this.props.children as ReactElement,
          this.renderMenuItem
        )}
      </ul>
    );
  }

  renderMenuItem = (child: ReactElement) => {
    return cloneElement(child, {
      isMenuBarActive: this.state.isActive,
      isMenuBarDescendant: this.isMenuBarDescendant,
      isTopLevel: true,
      menuBarEvents: this.state.events,
      onSelect: this.props.onSelect
    });
  };

  isMenuBarDescendant = (element: any) => {
    // return this.getDOMNode().contains(element);
    return this.element!.contains(element);
  };

  bindSetInactiveHandler() {
    document.addEventListener("click", this.handleDocumentClick, false);
  }

  unbindSetInactiveHandler() {
    document.removeEventListener("click", this.handleDocumentClick);
  }

  handleDocumentClick(e: any) {
    this.setState({ isActive: false });
  }

  onClick = (e: any) => {
    this.setState({ isActive: !this.state.isActive });
  };

  onMouseOver = (e: any) => {
    this.state.events.emitMouseOver(e);
  };
}