import { useRef } from "react";
import { getCoords } from "./helpers";

const MOUSE_BUTTON = {
  LEFT: 0,
  RIGHT: 2
};

export type UseContextMenuTriggerArguments<T> = {
  disable?: boolean;
  holdToDisplay?: number;
  posX?: number;
  posY?: number;
  mouseButton?: number;
  disableIfShiftIsPressed?: boolean;
  collect?: () => T;
};

export type Config<T> = {
  disable: boolean;
  holdToDisplay: number;
  posX: number;
  posY: number;
  mouseButton: number;
  disableIfShiftIsPressed: boolean;
  collect: () => T;
};
const defaultConfig: Config<string> = {
  disable: false,
  holdToDisplay: 1000,
  posX: 0,
  posY: 0,
  mouseButton: MOUSE_BUTTON.RIGHT,
  disableIfShiftIsPressed: false,
  collect: () => ""
};

export type TriggerBind = {
  onClick: (event: React.MouseEvent) => void;
  onContextMenu: (event: React.MouseEvent) => void;
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseOut: (event: React.MouseEvent) => void;
  onMouseUp: (event: React.MouseEvent) => void;
  onTouchEnd: (event: React.TouchEvent) => void;
  onTouchStart: (event: React.TouchEvent) => void;
};

export type UseContextMenuTrigger<T> = {
  (_config: UseContextMenuTriggerArguments<T>): TriggerBind[];
};

export default function buildUseContextMenuTrigger<T>(
  triggerVisible: (data: T) => void,
  setCoords: (coords: [number, number]) => void
): UseContextMenuTrigger<T> {
  return (_config: UseContextMenuTriggerArguments<T>) => {
    const config: Config<T> = Object.assign({}, defaultConfig, _config);
    const touchHandled = useRef(false);
    const mouseDownTimeoutId = useRef<number>();
    const touchstartTimeoutId = useRef<any>();

    const handleContextClick = (event: React.TouchEvent | React.MouseEvent) => {
      if (config.disable) return;
      if (config.disableIfShiftIsPressed && event.shiftKey) return;

      event.preventDefault();
      event.stopPropagation();

      setCoords(getCoords(event, config) as [number, number]);
      triggerVisible(config.collect());
    };

    const handleMouseDown = (event: React.MouseEvent) => {
      if (config.holdToDisplay >= 0 && event.button === MOUSE_BUTTON.LEFT) {
        event.persist();
        event.stopPropagation();

        mouseDownTimeoutId.current = window.setTimeout(
          () => handleContextClick(event),
          config.holdToDisplay
        );
      }
    };

    const handleMouseUp = (event: React.MouseEvent) => {
      if (event.button === MOUSE_BUTTON.LEFT) {
        clearTimeout(mouseDownTimeoutId.current);
      }
    };

    const handleMouseOut = (event: React.MouseEvent) => {
      if (event.button === MOUSE_BUTTON.LEFT) {
        clearTimeout(mouseDownTimeoutId.current);
      }
    };

    const handleTouchstart = (event: React.TouchEvent) => {
      touchHandled.current = false;

      if (config.holdToDisplay >= 0) {
        event.persist();
        event.stopPropagation();

        touchstartTimeoutId.current = setTimeout(() => {
          handleContextClick(event);
          touchHandled.current = true;
        }, config.holdToDisplay);
      }
    };

    const handleTouchEnd = (event: React.TouchEvent) => {
      if (touchHandled.current) {
        event.preventDefault();
      }
      clearTimeout(touchstartTimeoutId.current);
    };

    const handleContextMenu = (event: React.MouseEvent) => {
      if (event.button === config.mouseButton) {
        handleContextClick(event);
      }
    };

    const handleMouseClick = (event: React.MouseEvent) => {
      if (event.button === config.mouseButton) {
        handleContextClick(event);
      }
    };

    const triggerBind: TriggerBind = {
      onContextMenu: handleContextMenu,
      onClick: handleMouseClick,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onTouchStart: handleTouchstart,
      onTouchEnd: handleTouchEnd,
      onMouseOut: handleMouseOut
    };

    return [triggerBind];
  };
}
