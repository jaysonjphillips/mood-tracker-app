export const inputChangeHandler = (event, stateMethods = []) => {
  event.persist()
  const [someState, setState] = stateMethods

  setState(() => ({
    ...someState,
    [event.target.name]: event.target.value
  }))
}
