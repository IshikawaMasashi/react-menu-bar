!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("react-dom"),require("prop-types")):"function"==typeof define&&define.amd?define(["react","react-dom","prop-types"],t):"object"==typeof exports?exports.ReactContexify=t(require("react"),require("react-dom"),require("prop-types")):e.ReactContexify=t(e.react,e["react-dom"],e["prop-types"])}(window,function(e,t,n){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(t,n){t.exports=e},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.styles={menu:"react-contexify",submenu:"react-contexify react-contexify__submenu",submenuArrow:"react-contexify__submenu-arrow",separator:"react-contexify__separator",item:"react-contexify__item",itemDisabled:"react-contexify__item--disabled",itemContent:"react-contexify__item__content",itemIcon:"react-contexify__item__icon",theme:"react-contexify__theme--",animationWillEnter:"react-contexify__will-enter--",animationWillLeave:"react-contexify__will-leave--"},t.theme={light:"light",dark:"dark"},t.animation={fade:"fade",flip:"flip",pop:"pop",zoom:"zoom"}},function(e,t,n){var r;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var i=typeof r;if("string"===i||"number"===i)e.push(r);else if(Array.isArray(r)&&r.length){var a=o.apply(null,r);a&&e.push(a)}else if("object"===i)for(var u in r)n.call(r,u)&&r[u]&&e.push(u)}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r)}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.HIDE_ALL=0,t.DISPLAY_MENU=function(e){return"DISPLAY_"+e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={eventList:new Map,on:function(e,t){var n=this;return this.eventList.has(e)||this.eventList.set(e,new Set),this.eventList.get(e).add(t),function(){return n.eventList.get(e).delete(t)}},emit:function(e){for(var t=this,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];return this.eventList.has(e)?(this.eventList.get(e).forEach(function(e){return e.call.apply(e,[t].concat(n))}),!0):(console.warn("<"+e+"> Event is not registered. Did you forgot to bind the event ?"),!1)}};t.eventManager=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.cloneItem=function(e,t){return r.Children.map(r.Children.toArray(e).filter(function(e){return Boolean(e)}),function(e){return r.cloneElement(e,t)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(7);t.Menu=r.Menu;var o=n(10);t.Item=o.Item;var i=n(11);t.Separator=i.Separator;var a=n(12);t.IconFont=a.IconFont;var u=n(14);t.Submenu=u.Submenu;var s=n(15);t.MenuProvider=s.MenuProvider;var c=n(16);t.contextMenu=c.contextMenu;var l=n(1);t.theme=l.theme,t.animation=l.animation},function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=o(n(0)),a=o(n(2)),u=n(5),s=n(8),c=n(3),l=n(1),f=n(4),d={ENTER:13,ESC:27,ARROW_UP:38,ARROW_DOWN:40,ARROW_LEFT:37,ARROW_RIGHT:39},p=i.default.useState,v=i.default.useRef,m=i.default.useEffect;t.Menu=function(e){var t,n=e.animation,o=e.children,y=e.className,_=e.id,h=e.onHidden,b=e.onShown,g=e.style,E=e.theme,w=p(!1),x=w[0],O=w[1],M=p({x:0,y:0}),P=M[0],j=M[1],L=p({}),N=L[0],S=L[1],I=p({}),D=I[0],R=I[1],A=v(null),C=v([]);m(function(){return C.current.push(f.eventManager.on(c.DISPLAY_MENU(_),H)),C.current.push(f.eventManager.on(c.HIDE_ALL,W)),function(){C.current.forEach(function(e){return e()}),k()}},[]),m(function(){if(x)return T(),void(b&&b());k(),h&&h()},[x]);var T=function(){window.addEventListener("resize",W),window.addEventListener("contextmenu",W),window.addEventListener("mousedown",W),window.addEventListener("click",W),window.addEventListener("scroll",W),window.addEventListener("keydown",F)},k=function(){window.removeEventListener("resize",W),window.removeEventListener("contextmenu",W),window.removeEventListener("mousedown",W),window.removeEventListener("click",W),window.removeEventListener("scroll",W),window.removeEventListener("keydown",F)},W=function(e){var t=e;if(void 0!==t&&(2===t.button||!0===t.ctrlKey)&&"contextmenu"!==t.type)return k(),void O(!1);k(),O(!1)},F=function(e){e.keyCode!==d.ENTER&&e.keyCode!==d.ESC||(k(),O(!1))},H=function(e,t){if(e.stopPropagation(),f.eventManager.emit(c.HIDE_ALL),t.position){var n=t.position,r=n.x,o=n.y;return O(!0),j({x:r,y:o}),S(e),void R(t)}var i=function(e){var t={x:e.clientX,y:e.clientY};return"touchend"===e.type&&(!t.x||!t.y)&&e.changedTouches&&e.changedTouches.length>0&&(t.x=e.changedTouches[0].clientX,t.y=e.changedTouches[0].clientY),(!t.x||t.x<0)&&(t.x=0),(!t.y||t.y<0)&&(t.y=0),t}(e),a=i.x,u=i.y;O(!0),j({x:a,y:u}),S(e),R(t)},Y=P.x,q=P.y,U=a.default(l.styles.menu,y,((t={})[l.styles.theme+E]=E,t[l.styles.animationWillEnter+n]=n,t)),z=r({},g,{left:Y,top:q+1,opacity:1});return i.default.createElement(s.Portal,null,x&&i.default.createElement("div",{className:U,style:z,ref:A,onMouseEnter:function(){return window.removeEventListener("mousedown",W)},onMouseLeave:function(){return window.addEventListener("mousedown",W)}},i.default.createElement("div",null,u.cloneItem(o,{nativeEvent:N,propsFromTrigger:D}))))}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(0)),i=n(9),a=o.default.useEffect,u=o.default.useLayoutEffect,s=o.default.useRef;t.Portal=function(e){var t=e.children,n=s(document.createElement("div"));return u(function(){n.current&&document.body.appendChild(n.current)}),a(function(){return function(){n.current&&document.body.removeChild(n.current)}},[]),i.createPortal(t,n.current)}},function(e,n){e.exports=t},function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=o(n(0)),a=o(n(2)),u=n(1),s=function(){};t.Item=function(e){var t,n=e.disabled,o=void 0!==n&&n,c=e.nativeEvent,l=e.propsFromTrigger,f=e.data,d=e.children,p=e.onClick,v=void 0===p?s:p,m=e.className,y=e.style,_="function"==typeof o?o({event:c,props:r({},l,f)}):o,h=a.default(u.styles.item,m,((t={})[""+u.styles.itemDisabled]=_,t));return i.default.createElement("div",{className:h,style:y,onClick:function(e){_?e.stopPropagation():v({event:c,props:r({},l,f)})},role:"presentation"},i.default.createElement("div",{className:u.styles.itemContent},d))}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(0)),i=n(1);t.Separator=function(){return o.default.createElement("div",{className:i.styles.separator})}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(0)),i=r(n(13)),a=r(n(2)),u=n(1),s=function(e){var t=e.className,n=e.style,r=e.children;return o.default.createElement("i",{className:a.default(u.styles.itemIcon,t),style:n},r||"")};t.IconFont=s,s.propTypes={children:i.default.node,className:i.default.string,style:i.default.object}},function(e,t){e.exports=n},function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=o(n(0)),a=o(n(2)),u=n(5),s=n(1),c=i.default.useState,l=i.default.useRef,f=i.default.useEffect;t.Submenu=function(e){var t,n=e.arrow,o=void 0===n?"▶":n,d=e.disabled,p=void 0!==d&&d,v=e.nativeEvent,m=void 0===v?{}:v,y=e.className,_=e.style,h=e.label,b=e.children,g=e.propsFromTrigger,E=c({left:"100%",top:0,bottom:"initial"}),w=E[0],x=E[1],O=l(null);f(function(){if(O.current){var e=window.innerWidth,t=window.innerHeight,n=O.current.getBoundingClientRect(),r={};n.right<e?(r.left="100%",r.right=void 0):(r.right="100%",r.left=void 0),n.bottom>t?(r.bottom=0,r.top="initial"):(r.bottom="initial",r.top=0),x(r)}},[O.current]);var M=a.default(s.styles.item,y,((t={})[""+s.styles.itemDisabled]="function"==typeof p?p({event:m,props:r({},g)}):p,t)),P=r({},_,w);return i.default.createElement("div",{className:M,role:"presentation"},i.default.createElement("div",{className:s.styles.itemContent,onClick:function(e){e.stopPropagation()}},h,i.default.createElement("span",{className:s.styles.submenuArrow},o)),i.default.createElement("div",{className:s.styles.submenu,ref:O,style:P},u.cloneItem(b,{propsFromTrigger:g,nativeEvent:m})))}},function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var a=i(n(0)),u=n(3),s=n(4),c=a.default.useRef;function l(e){var t,n=c([]),i=function(e){return null===e||n.current.push(e)},l=function(){e.id,e.component,e.event;var t=e.children,u=(e.className,e.style,e.storeRef),s=(e.data,o(e,["id","component","event","children","className","style","storeRef","data"]));return n.current=[],a.Children.map(t,function(e){return a.isValidElement(e)?a.cloneElement(e,r({},s,u?{ref:i}:{})):e})},f=e.component,d=e.render,p=e.event,v=e.className,m=e.style,y=((t={})[p]=function(t){t.preventDefault(),t.stopPropagation(),s.eventManager.emit(u.DISPLAY_MENU(e.id),t.nativeEvent,r({ref:1===n.current.length?n.current[0]:n.current},e.data))},t.className=v,t.style=m,t);return"function"==typeof d?d(r({},y,{children:l()})):a.createElement(f,y,l())}t.MenuProvider=l,l.defaultProps={component:"div",event:"onContextMenu",storeRef:!0}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4),o=n(3),i={show:function(e){var t=e.id,n=e.event,i=e.props;r.eventManager.emit(o.DISPLAY_MENU(t),n.nativeEvent||n,i)},hideAll:function(){r.eventManager.emit(o.HIDE_ALL)}};t.contextMenu=i}])});
//# sourceMappingURL=ReactContexify.js.map