/* Store初期状態 */
const initialState = {
  task: '',
  tasks: []
};

/* Reducer */
export default function tasksReducer(state = initialState, action) {
  console.log(state);
  switch (action.type) {
    case 'INPUT_TASK':
      return {
        ...state,
        task: action.payload.task
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: state.tasks.concat([action.payload.task])
      };
    default:
      return state;
  }
}