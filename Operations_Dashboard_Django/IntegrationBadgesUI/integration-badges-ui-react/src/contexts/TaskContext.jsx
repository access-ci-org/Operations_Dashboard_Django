import React, {createContext, useContext, useReducer} from 'react';
import axios from 'axios';
import DefaultReducer from "./reducers/DefaultReducer";
import {useResources} from "./ResourcesContext";

const TaskContext = createContext({
    taskMap: {},
    badgeTaskIdMap: {},
    fetchTasks: ({badgeId}) => {
    }
});

export const useTasks = () => useContext(TaskContext);

export const BadgeTaskWorkflowStatus = {
    COMPLETED: "completed",
    NOT_COMPLETED: "not-completed",
}

/**
 * Context provider for tasks
 * @param children
 */
export const TaskProvider = ({children}) => {
    const {fetchResource} = useResources();

    const [taskMap, setTaskMap] = useReducer(DefaultReducer, {});
    const [badgeTaskIdMap, setBadgeTaskIdMap] = useReducer(DefaultReducer, {});

    const fetchTasks = async ({badgeId}) => {
        try {
            const response = await axios.get(`/badge/${badgeId}/tasks`);
            const _tasks = response.data.results;
            const _taskMap = {}
            const _taskIds = [];
            for (let i = 0; i < _tasks.length; i++) {
                const _task = _tasks[i].task;
                _taskMap[_task.task_id] = _task;
                _taskIds.push(_task.task_id)
            }
            setTaskMap({...taskMap, ..._taskMap});
            setBadgeTaskIdMap({...badgeTaskIdMap, [badgeId]: _taskIds});

            return response.data.results;
        } catch (error) {
            return error;
        }
    };

    return (
        <TaskContext.Provider value={{taskMap, badgeTaskIdMap, fetchTasks}}>
            {children}
        </TaskContext.Provider>
    );
};
