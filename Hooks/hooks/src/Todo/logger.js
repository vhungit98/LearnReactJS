function logger(reducer) {
  return (prevState, action) => {
    console.group(action.type);
    console.log("Prev state: ", prevState);
    console.log("Action: ", action);

    const newState = reducer(prevState, action);

    console.log("Next state: ", newState);
    console.groupEnd(action.type);

    return newState;
  };
}
export default logger;
