import { getStoriesByProjectId } from './storyApi';

var projectData = [
	{
		id: 1,
		name: 'Project Name',
		description: 'Project Description',
	},
	{
		id: 2,
		name: 'Another Project',
		description: 'Another Description',
	}
];

function nextId() {
	return projectData ? (projectData.sort((a, b) => a.id - b.id))[projectData.length - 1].id + 1 : 0;
}

function findProject(projectId) {
	return projectData.findIndex(item => item.id === projectId);
}

export function getProjectStats() {
	let projectStats = [];

	projectData.forEach((project) => {
		let stats = {};
		stats.id = project.id;
		stats.name = project.name;
		stats.description = project.description;

		let stories = getStoriesByProjectId(project.id);
		stats.numStories = stories.length;

		stats.numTasks = 0;
		stats.percent = 0;

		stories.forEach((story) => {
			stats.numTasks += story.tasks.length;
			stats.percent += story.tasks.filter((task) => task.completed === true).length;
		});

		if (stats.percent > 0) {
			stats.percent = Math.round(stats.percent / stats.numTasks * 100);
		}

		projectStats.push(stats);
	});

	return projectStats;
}

export function getProjectById(id) {
	let index = findProject(id);
	if (index !== -1) {
		let project = projectData[index];
		project.stories = getStoriesByProjectId(project.id);

		return project;
	}

	return null;
}

export function createProject(project) {
	let localProject = {};
	localProject.id = nextId();
	localProject.name = project.name;
	localProject.description = project.description;

	projectData.push(localProject);

	return localProject;
}

export function updateProject(project) {
	let index = findProject(project.id);
	if (index !== -1) {
		let localProject = {};
		localProject.id = project.id;
		localProject.name = project.name;
		localProject.description = project.description;

		projectData[index] = localProject;

		return localProject;
	}

	return null;
}

export function deleteProject(projectId) {
	let index = findProject(projectId);
	if (index !== -1) {
		projectData.splice(index, 1);
	}
}