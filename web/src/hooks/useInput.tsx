import React, { useState } from 'react'

type InputRegistration = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function useInput(
  initialValue: string = ''
): [string, InputRegistration, React.Dispatch<React.SetStateAction<string>>] {
  const [state, setState] = useState(initialValue)

  const fields = {
    value: state,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setState(e.target.value),
  }

  return [state, fields, setState]
}
