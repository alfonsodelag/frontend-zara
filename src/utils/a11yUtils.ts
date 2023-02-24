export function filterKeyEnter(handler) {
	return (e) => {
		if (e.keyCode === 13) {
			handler(e);
		}
	};
}

export function accessibleOnClick(handler, tabIndex) {
	return {
		role: "button",
		tabIndex: tabIndex || 0,
		onKeyDown: filterKeyEnter(handler),
		onClick: handler,
	};
}
