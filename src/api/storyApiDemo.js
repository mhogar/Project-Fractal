import { getTasksByStoryId } from './taskApiDemo';

var storyData = [
	{
		id: 1,
		name: 'Story Name',
		projectId: 1
	}
];

function nextId() {
	return storyData.length > 0 ? (storyData.sort((a, b) => a.id - b.id))[storyData.length - 1].id + 1 : 0;
}

function findStory(storyId) {
	return storyData.findIndex(item => item.id === storyId);
}

function createLocalStory(story) {
	return {
		id: story.id,
		projectId: story.projectId,
		name: story.name
	};
}

export function getStoriesByProjectId(projectId) {
	let stories = storyData.filter(story => story.projectId === projectId);
	stories.forEach((story) => story.tasks = getTasksByStoryId(story.id));

	return stories;
}

export function createOrUpdateStory(story, successFunction, errorFunction) {
	let localStory = createLocalStory(story);
	
	//create
	if (localStory.id === -1) {
		localStory.id = nextId();

		storyData.push(localStory);

		successFunction(createLocalStory(localStory));
		return;
	}

	let index = findStory(localStory.id);
	if (index !== -1) {
		storyData[index] = localStory;

		successFunction(createLocalStory(localStory));
		return;
	}

	errorFunction('Story with id ' + localStory.id + ' not found.');
}

export function deleteStory(storyId, successFunction, errorFunction) {
	if (storyId === -1) {
		return;
	}

	let index = findStory(storyId);
	if (index !== -1) {
		delete storyData[index];
		successFunction('success');
		return;
	}

	errorFunction('Story with id ' + storyId + ' not found.');
}