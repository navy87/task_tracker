import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = () => {
    const [tasks, setTasks] = useState(
        [
        {
            name: "Derash Testing Follow Up",
            description:
                "Derash Testing Follow Ups Description is going to go here. This is the issue description. It is the issue description. Yes, it is. ",
            dueDate: "08/07/2021",
            priority: "high",
            status: "Active",
            persons: [
                {
                    name: "Kaleb Misgana",
                    leader: true,
                },
                {
                    name: "Munir Haji",
                    leader: false,
                },
                {
                    name: "Yahya Haji",
                    leader: false,
                },
                {
                    name: "Hanan Fati",
                    leader: false,
                },
            ],
        },
        {
            name: "Derash Testing Follow Up",
            description:
                "Derash Testing Follow Ups Description is going to go here. This is the issue description. It is the issue description. Yes, it is. ",
            dueDate: "08/07/2021",
            priority: "mid",
            status: "Active",
            persons: [
                {
                    name: "Kaleb Misgana",
                    leader: true,
                },
                {
                    name: "Munir Haji",
                    leader: false,
                },
                {
                    name: "Yahya Haji",
                    leader: false,
                },
                {
                    name: "Hanan Fati",
                    leader: false,
                },
            ],
        },
        {
            name: "Derash Testing Follow Up",
            description:
                "Derash Testing Follow Ups Description is going to go here. This is the issue description. It is the issue description. Yes, it is. ",
            dueDate: "08/07/2021",
            priority: "low",
            status: "Active",
            persons: [
                {
                    name: "Kaleb Misgana",
                    leader: true,
                },
                {
                    name: "Munir Haji",
                    leader: false,
                },
                {
                    name: "Yahya Haji",
                    leader: false,
                },
                {
                    name: "Hanan Fati",
                    leader: false,
                },
            ],
        },
        {
            name: "Derash Testing Follow Up",
            description:
                "Derash Testing Follow Ups Description is going to go here. This is the issue description. It is the issue description. Yes, it is. ",
            dueDate: "08/07/2021",
            priority: "mid",
            status: "Active",
            persons: [
                {
                    name: "Kaleb Misgana",
                    leader: true,
                },
                {
                    name: "Munir Haji",
                    leader: false,
                },
                {
                    name: "Yahya Haji",
                    leader: false,
                },
                {
                    name: "Hanan Fati",
                    leader: false,
                },
            ],
        },
        {
            name: "Derash Testing Follow Up",
            description:
                "Derash Testing Follow Ups Description is going to go here. This is the issue description. It is the issue description. Yes, it is. ",
            dueDate: "08/07/2021",
            priority: "high",
            status: "Active",
            persons: [
                {
                    name: "Kaleb Misgana",
                    leader: true,
                },
                {
                    name: "Munir Haji",
                    leader: false,
                },
                {
                    name: "Yahya Haji",
                    leader: false,
                },
                {
                    name: "Hanan Fati",
                    leader: false,
                },
            ],
        },
    ]);

    return (
        <div className="task_list">
            {tasks.map((task) => (
                <TaskItem
                    name={task.name}
                    description={task.description}
                    dueDate={task.dueDate}
                    persons={task.persons}
                    priority={task.priority}
                    status={task.status}
                />
            ))}
        </div>
    );
};

export default TaskList;
