import axios from 'axios';
// export const ADD_TASK = 'ADD_ITEM';
export const GET_ALL_TASKS = 'GET_ALL_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK'

// export function addTask(task) {
//     return dispatch => {

//     }
// }

export function getAllTasks() {
    console.log("GET ALL TASKS HAS BEEN REACHED")
    return dispatch => {
        console.log("DISPATCHED FIRED!!!")
        axios.get("/kanban")
            .then(response => {
                dispatch({ type: GET_ALL_TASKS, payload: response.data })
            })
            .then(cardsData => {
                console.log('HITTTTTT', cardsData)
            })
            .catch(err => {
                dispatch({ type: 'DISPLAY_ERROR_NOTIFICATION' })
            })
    }
}

export const addTasks = (task) => {
    console.log('ACTION: addTask', task)
    return dispatch => {
        axios.post('/kanban', task)
            .then(response => {
                console.log('response in addTask', response.data)
                dispatch({ type: GET_ALL_TASKS, payload: response.data })
            })
            .catch(err => {
                console.log('err in addTASKS action axios call', err)
            })
    }
}

export const deleteTask = (task) => {
    console.log('ACTION: deleteTask', task)
    return dispatch => {
        axios.delete('/kanban', task)
            .then(response => {
                console.log('response in deleteTask', response.data)
                dispatch({ type: GET_ALL_TASKS, payload: response.data })
            })
            .catch(err => {
                console.log('err in deleteTask action axios call', err)
            })
    }
}
