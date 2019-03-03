import axios from 'axios';
import { convertStoryData } from './storyApi';

const DemoApi = require('./projectApiDemo');

export function convertProjectData(data) {
	let newData =
	{
		id: data.id,
		name: data.name,
		description: data.description
	};

	newData.stories = [];
	data.stories.forEach((story) => newData.stories.push(convertStoryData(story)));

	return newData;
}

export function getProjectStats(successFunction, errorFunction) {
	if (config.demoMode) {
		DemoApi.getProjectStats(successFunction, errorFunction);
		return;
	}

	axios.get('/task_tracker/project_stats.json')
		.then(function(response) {
			let stats = [];
			response.data.forEach(function(data) {
				stats.push(
				{
					id: data.id,
					name: data.name,
					description: data.description,
					numStories: data.num_stories,
					numTasks: data.num_tasks,
					percent: data.percent,
					createdDate: new Date(data.created_date),
					updatedDate: new Date(data.updated_date)
				});
			});

			successFunction(stats);
		})
		.catch(function(error) {
			errorFunction(error);
		});
}

export function getProjectById(projectId, successFunction, errorFunction) {
	if (config.demoMode) {
		DemoApi.getProjectById(projectId, successFunction, errorFunction);
		return;
	}

	axios.get(`/task_tracker/projects/${projectId}.json`)
		.then(function(response) {
			successFunction(convertProjectData(response.data));
		})
		.catch(function(error) {
			errorFunction(error);
		});
}

export function createProject(project, successFunction, errorFunction) {
	if (config.demoMode) {
		DemoApi.createProject(project, successFunction, errorFunction);
		return;
	}

	let localProject = {
    	name: project.name,
    	description: project.description
	};

	axios.post('/task_tracker/projects.json', localProject)
		.then(function(response) {
			successFunction(convertProjectData(response.data));
		})
		.catch(function(error) {
			errorFunction(error);
		});
}

export function updateProject(project, successFunction, errorFunction) {
	if (config.demoMode) {
		DemoApi.updateProject(project, successFunction, errorFunction);
		return;
	}

	var projectId = project.id;
	var localProject = {
    	name: project.name,
    	description: project.description
	};

	axios.put(`/task_tracker/projects/${projectId}.json`, localProject)
		.then(function(response) {
			successFunction(convertProjectData(response.data));
		})
		.catch(function(error) {
			errorFunction(error);
		});
}

export function deleteProject(projectId, successFunction, errorFunction) {
	if (config.demoMode) {
		DemoApi.deleteProject(projectId, successFunction, errorFunction);
		return;
	}

	axios.delete(`/task_tracker/projects/${projectId}.json`)
		.then(function(response) {
			successFunction('success');
		})
		.catch(function(error) {
			errorFunction(error);
		});
}