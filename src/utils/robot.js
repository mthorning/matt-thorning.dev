import { useMachine as useRobot } from 'react-robot'
import * as robot from 'robot3'
const { createMachine: create, ...methods } = robot

const extraMethods = {
  delay: (timeout) => () => new Promise((res) => setTimeout(res, timeout)),
}

export function createMachine(factory, initialState) {
  const states = factory({ ...methods, ...extraMethods })
  return initialState ? create(initialState, states) : create(states)
}

export function useMachine(...args) {
  const [current] = useRobot(...args)
  const {
    context,
    service: {
      machine: { current: state },
      send,
    },
  } = current
  return [state, send, context, current.service]
}
