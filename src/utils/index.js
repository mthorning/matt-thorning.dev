export function a11yButton(handlerFn) {
  return {
    role: 'button',
    onClick: handlerFn,
    onKeyDown: event => {
      if (event.keycode === 13) handlerFn(event)
    },
  }
}
