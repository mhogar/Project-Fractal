var taskData = [
	{ id: 1, storyId: 1, name: "Task 1", completed: false },
	{ id: 2, storyId: 1, name: "Another Task", completed: true },
	{ id: 3, storyId: 2, name: "One More Task", completed: false }
];

function nextId() {
	return taskData ? (taskData.sort((a, b) => a.id - b.id))[taskData.length - 1].id + 1 : 0;
}

function findTask(taskId) {
	return taskData.findIndex(item => item.id === taskId);
}

export function getTasksByStoryId(storyId) {
	return taskData.filter(task => task.storyId === storyId);
}

export function createOrUpdateTask(task) {
	//create
	if (task.id === -1) {
		task.id = nextId();
		taskData.push(task);

		return task;
	}

	let index = findTask(task.id);
	if (index !== -1) {
		let localTask = {};
		localTask.id = task.id;
		localTask.storyId = task.storyId;
		localTask.name = task.name;
		localTask.completed = task.completed;

		taskData[index] = localTask;

		return localTask;
	}

	return null;
}

export function deleteTask(taskId) {
	if (taskId === -1){
		return;
	}

	let index = findTask(taskId);
	if (index !== -1) {
		delete taskData[index];
	}
}