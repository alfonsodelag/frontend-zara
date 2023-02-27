export function filterKeyEnter(handler: (e: KeyboardEvent) => void) {
  return (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handler(e);
    }
  };
}

export function accessibleOnClick(
  handler: (e: KeyboardEvent) => void,
  tabIndex?: number
) {
  const keyDownHandler = (e: KeyboardEvent) => {
    const keyboardEvent = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      shiftKey: e.shiftKey,
      ctrlKey: e.ctrlKey,
      altKey: e.altKey,
      metaKey: e.metaKey,
      keyCode: 13,
    });
    filterKeyEnter((event: KeyboardEvent) => {
      handler(event);
    })(keyboardEvent);
  };

  return {
    role: "button",
    tabIndex: tabIndex || 0,
    onKeyDown: keyDownHandler,
    onClick: handler,
  };
}
