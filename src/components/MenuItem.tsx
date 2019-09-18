import React, { ReactElement } from "react";
import { cloneElement } from "react";

export default class MenuItem extends React.Component<any, any> {
  //   propTypes: {
  //     isMenuBarActive: React.PropTypes.bool,
  //     isMenuBarDescendant: React.PropTypes.func.isRequired,
  //     menuBarEvents: React.PropTypes.object.isRequired,
  //     onSelect: React.PropTypes.func
  //   },
  element: HTMLElement | null = null;

  constructor(props: any) {
    super(props);

    this.state = {
      open: false
    };
  }

  // getInitialState = () => {
  //   return {
  //     open: false
  //   };
  // };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.state.open && !prevState.open) {
      this.bindCloseHandlers();
    } else if (prevState.open && !this.state.open) {
      this.unbindCloseHandlers();
    }
  }

  componentWillUnmount() {
    this.unbindCloseHandlers();
  }

  getLabel = () => {
    return this.hasSubmenu() ? this.props.label : this.props.children;
  };

  hasSubmenu = () => {
    return React.isValidElement(this.props.children);
  };

  renderSubmenu = () => {
    if (!this.hasSubmenu()) return;

    var menu = this.props.children as ReactElement;

    return cloneElement(menu, {
      isMenuBarDescendant: this.props.isMenuBarDescendant,
      menuBarEvents: this.props.menuBarEvents,
      onSelect: this.onSelect
    });
  };

  onSelect = (key: any) => {
    this.props.onSelect(key);
    this.setState({ open: false });
  };

  onClick = (e: any) => {
    e.preventDefault();

    if (this.hasSubmenu()) {
      this.toggleOpen();
    } else {
      this.props.onSelect(this.props.command);
    }
  };

  onMouseOver = (e: any) => {
    if (this.props.isTopLevel && this.props.isMenuBarActive) {
      this.setState({ open: true });
    }

    if (!this.props.isTopLevel && this.hasSubmenu()) {
      this.setState({ open: true });
    }
  };

  onMouseOut = (e: any) => {
    if (
      this.hasSubmenu() &&
      this.props.isMenuBarDescendant(e.relatedTarget) &&
      !this.isChildElement(e.relatedTarget)
    ) {
      this.setState({ open: false });
    }
  };

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  bindCloseHandlers = () => {
    document.addEventListener("click", this.onDocumentClick, false);
    this.props.menuBarEvents.addMouseOverListener(this.onMenuBarMouseOver);
  };

  unbindCloseHandlers = () => {
    document.removeEventListener("click", this.onDocumentClick);
    this.props.menuBarEvents.removeMouseOverListener(this.onMenuBarMouseOver);
  };

  onDocumentClick = (e: any) => {
    if (!this.isChildElement(e.target)) {
      this.setState({ open: false });
    }
  };

  onMenuBarMouseOver = (e: React.MouseEvent) => {
    e.persist();
    if (!this.isChildElement(e.target)) {
      this.setState({ open: false });
    }
  };

  isChildElement = (element: any) => {
    // return this.getDOMNode().contains(element);
    return this.element!.contains(element);
  };

  render() {
    // var classes = {
    //   open: this.state.open,
    //   "dropdown-submenu": !this.props.isTopLevel && this.hasSubmenu()
    // };
    let classes = "";
    if (this.state.open) {
      classes += " open";
    }

    if (!this.props.isTopLevel && this.hasSubmenu()) {
      classes += " dropdown-submenu";
    }

    return (
      <div
        className={classes}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        ref={ref => (this.element = ref)}
      >
        <div
          className={this.hasSubmenu() ? "submenu-label" : "menu-item-label"}
          onClick={this.onClick}
        >
          {this.getLabel()}
        </div>
        {this.renderSubmenu()}
      </div>
    );
  }
}
