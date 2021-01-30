export function a11yButton(handlerFn, role) {
  const props = {
    onClick: handlerFn,
    onKeyDown: (event) => {
      if (event.keycode === 13) handlerFn(event)
    },
  }
  if (role) props.role = 'button'
  return props
}
