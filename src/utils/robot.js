import { useMachine as useRobot } from 'react-robot'
import * as robot from 'robot3'
const { createMachine: create, ...methods } = robot

export function createMachine(factory) {
  return create(factory(methods))
}

export function useMachine(...args) {
  const [current] = useRobot(...args)
  const {
    service: {
      machine: { current: state },
      send,
    },
  } = current
  return [state, send, current.service]
}
