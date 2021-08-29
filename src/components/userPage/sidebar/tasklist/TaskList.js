import React, { useContext } from "react";
import {
    DataContext,
    FilterContext,
} from "../../../../contexts/SidebarContext";
import TaskItem from "./TaskItem";
import { compareTask } from "../../../helpers/Helper";

const TaskList = () => {
    const { tasks } = useContext(DataContext);
    // const [tasks, setTasks] = useState([]);
    const {
        filteredPriorities,
        filteredStatuses,
        filteredKeywords,
        filteredPersons,
    } = useContext(FilterContext);
    const { taskSortOrder } = useContext(DataContext);

    // useEffect(() => {
    //     const fetchTasks = async () => {
    //         fetch(getTaskURL())
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 setTasks(data);
    //             })
    //             .catch((err) => fetchingErrorHandler(err));
    //     };
    //     fetchTasks();
    // }, []);

    return (
        <div className="task_list">
            {tasks
                .filter((task) =>
                    filteredPriorities.has(task.priority.toLowerCase())
                )
                .filter((task) =>
                    filteredStatuses.has(task.status.toLowerCase())
                )
                .filter((task) => {
                    const issue = task.issue.toLowerCase();
                    const description = task.description.toLowerCase();
                    return (issue + " " + description).includes(
                        filteredKeywords.toLowerCase()
                    );
                })
                .filter((task) => {
                    if ([...filteredPersons].length === 0) {
                        return true;
                    }
                    const filteredIds = [...filteredPersons].map(
                        (filteredPerson) => filteredPerson.id
                    );
                    const assigneeIds = [...task.assignees]
                        .map((taskPerson) => taskPerson.person.id)
                        .filter((id) => filteredIds.includes(id));
                    return assigneeIds.length > 0;
                })
                .sort((task1, task2) =>
                    compareTask(task1, task2, taskSortOrder)
                )
                .map((task, index) => (
                    <TaskItem key={index} task={task} />
                ))}
        </div>
    );
};

export default TaskList;
