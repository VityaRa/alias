import { useContext, useEffect, useRef, useState } from 'react'
import { DefaultText } from '../typography'
import styled from 'styled-components'
import { RoomContext } from '../../contexts/RoomContext'

const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
}

const INITIAL_COUNT = 120

const AbsoluteContainer = styled.div`
  margin-top: 2rem;
`

const TimerText = styled(DefaultText)`
  font-size: 2.5rem;
  font-weight: 600;
`

export const Timer = () => {
  const { remainTime } = useContext(RoomContext);
  const [millisRemaining, setMillisRemaining] = useState(remainTime || 0)

  const secondsRemaining = millisRemaining / 1000;
  const secondsToDisplay = secondsRemaining % 60
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
  const minutesToDisplay = minutesRemaining % 60

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setMillisRemaining(millisRemaining - 1000)
      }
    },
    1000,
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

const twoDigits = (num: number) => String(Math.trunc(num)).padStart(2, '0')
