import { getStoriesByProjectId } from './storyApiDemo';

var projectData = [
	{
		id: 1,
		name: 'Project Name',
		description: ''
	}
];

function nextId() {
	return projectData.length > 0 ? (projectData.sort((a, b) => a.id - b.id))[projectData.length - 1].id + 1 : 0;
}

function findProject(projectId) {
	return projectData.findIndex(item => item.id === projectId);
}

function createLocalProject(project) {
	return {
		id: project.id,
		name: project.name,
		description: project.description
	};
}

export function getProjectStats(successFunction, errorFunction) {
	let projectStats = [];

	projectData.forEach((project) => {
		let stats = {};
		stats.id = project.id;
		stats.name = project.name;
		stats.description = project.description;

		let stories = getStoriesByProjectId(project.id);
		stats.numStories = stories.length;

		stats.numTasks = 0;
		stats.completedTimeEstimate = 0;
		stats.totalTimeEstiamte = 0;

		stories.forEach((story) => {
			stats.numTasks += story.tasks.length;
			
			story.tasks.forEach(function(task) {
				stats.totalTimeEstiamte += task.timeEstimate;
				stats.completedTimeEstimate += (task.completed ? task.timeEstimate : 0);
			});
		});

		stats.percent = 0;
		if (stats.totalTimeEstiamte > 0) {
			stats.percent = Math.round(stats.completedTimeEstimate / stats.totalTimeEstiamte * 100);
		}

		projectStats.push(stats);
	});

	successFunction(projectStats);
}

export function getProjectById(projectId, successFunction, errorFunction) {
	let index = findProject(projectId);
	if (index !== -1) {
		let localProject = createLocalProject(projectData[index]);
		localProject.stories = getStoriesByProjectId(localProject.id);

		successFunction(localProject);
		return;
	}

	errorFunction('Project with id ' + projectId + ' not found.');
}

export function createProject(project, successFunction, errorFunction) {
	let localProject = createLocalProject({
		id: nextId(),
		name: project.name,
		description: project.description
	});

	projectData.push(localProject);
	successFunction(createLocalProject(localProject));
}

export function updateProject(project, successFunction, errorFunction) {
	let index = findProject(project.id);
	if (index !== -1) {
		let localProject = createLocalProject(project);
		projectData[index] = localProject;

		successFunction(createLocalProject(localProject));
		return;
	}

	errorFunction('Project with id ' + project.id + ' not found.');
}

export function deleteProject(projectId, successFunction, errorFunction) {
	let index = findProject(projectId);
	if (index !== -1) {
		projectData.splice(index, 1);

		successFunction('success');
		return;
	}

	errorFunction('Project with id ' + projectId + ' not found.');
}