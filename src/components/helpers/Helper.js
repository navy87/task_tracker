export const Capitalize = (word) => {
    word = word.toLowerCase();
    word = word[0].toUpperCase() + word.substr(1);
    return word;
};

export const DeepCopy = (object) => {
    if (object) {
        return JSON.parse(JSON.stringify(object));
    }
    return object;
};

export const GetToday = () => {
    const date = new Date();
    const dateString = date.toISOString().substr(0, 10);
    return dateString;
};

export const mapTaskPersonToPerson = (taskPeople) => {
    return taskPeople.map(taskPerson => taskPerson.person);
}

export const compareTask = (task1, task2, taskSortOrder) => {
    let titleAscendingOrder = task1.issue.localeCompare(task2.issue);
    let deadlineAscendingOrder =
        new Date(task1.dueDate) - new Date(task2.dueDate);
    let addedDateAscendingOrder =
        new Date(task1.addedDate) - new Date(task2.addedDate);
    // let descendingValue =
    //                         new Date(track2.date) - new Date(track1.date);

    if (taskSortOrder.by.toLowerCase() === "title") {
        return (
            (titleAscendingOrder ||
                deadlineAscendingOrder ||
                addedDateAscendingOrder) *
            (taskSortOrder.order.toLowerCase() === "desc" ? -1 : 1)
        );
    } else if (taskSortOrder.by.toLowerCase() === "dueDate".toLowerCase()) {
        return (
            (deadlineAscendingOrder ||
                titleAscendingOrder ||
                addedDateAscendingOrder) *
            (taskSortOrder.order.toLowerCase() === "desc" ? -1 : 1)
        );
    } else {
        return (
            (addedDateAscendingOrder ||
                titleAscendingOrder ||
                deadlineAscendingOrder) *
            (taskSortOrder.order.toLowerCase() === "desc" ? -1 : 1)
        );
    }
};
