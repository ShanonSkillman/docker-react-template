import { GET_ALL_TASKS, ADD_TASK, DELETE_TASK } from '../actions/actions.js'

const TaskReducer = (state = [], action) => {
    console.log("TASK REDUCER FIRED")
    console.log('REDUCER ACTION: ', action)
    console.log('CURRENT STATE:', state)
    switch (action.type) {
        case GET_ALL_TASKS:
            console.log("CASE HAS BEEN FIRED - GET ALL")
            return action.payload
        case ADD_TASK:
            return [...state, action.payload]
        case DELETE_TASK:
            return [...state, action.payload]
        default:
            return state
    }
}

export default TaskReducer