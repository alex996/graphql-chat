import { useState, useCallback, ChangeEvent } from 'react'

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
    []
  )

  return {
    value,
    onChange
  }
}

export default useInput
