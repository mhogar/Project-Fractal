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
	let localTask = {};
	localTask.id = task.id;
	localTask.storyId = task.storyId;
	localTask.name = task.name;
	localTask.completed = task.completed;
	
	//create
	if (localTask.id === -1) {
		localTask.id = nextId();
		taskData.push(localTask);

		return localTask;
	}

	let index = findTask(localTask.id);
	if (index !== -1) {
		

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