import { useEffect, useRef, useState } from 'react'
import { DefaultText } from '../typography'
import styled from 'styled-components'

const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
}

const INITIAL_COUNT = 120

const AbsoluteContainer = styled.div`
  position: absolute;
  bottom: 2rem;
`

const TimerText = styled(DefaultText)`
  font-size: 2.5rem;
  font-weight: 600;
`

export const Timer = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
  const [status, setStatus] = useState(STATUS.STOPPED)

  const secondsToDisplay = secondsRemaining % 60
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
  const minutesToDisplay = minutesRemaining % 60

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1)
      } else {
        setStatus(STATUS.STOPPED)
      }
    },
    status === STATUS.STARTED ? 1000 : null,
  )


  return (
    <AbsoluteContainer>
      <TimerText>
          {twoDigits(minutesToDisplay)}:
          {twoDigits(secondsToDisplay)}
      </TimerText>
    </AbsoluteContainer>
  )
}

function useInterval(callback: any, delay: number | null) {
  const savedCallback = useRef<any>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback?.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const twoDigits = (num: number) => String(num).padStart(2, '0')
