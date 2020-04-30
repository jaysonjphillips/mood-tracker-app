export const inputChangeHandler = (event, stateMethods = []) => {
  event.persist()
  const [someState, setState] = stateMethods

  setState(someState => ({
    ...state,
    [event.target.name]: event.target.value
  }))
}
