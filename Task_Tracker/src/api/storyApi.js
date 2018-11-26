import { getTasksByStoryId } from './taskApi';

var storyData = [
	{ id: 1, projectId: 1, name: "Story"},
	{ id: 2, projectId: 1, name: "Story 2"}
];

function nextId() {
	return storyData ? (storyData.sort((a, b) => a.id - b.id))[storyData.length - 1].id + 1 : 0;
}

function findStory(storyId) {
	return storyData.findIndex(item => item.id === storyId);
}

export function getStoriesByProjectId(projectId) {
	let stories = storyData.filter(story => story.projectId === projectId);
	stories.forEach((story) => story.tasks = getTasksByStoryId(story.id));

	return stories;
}


export function createOrUpdateStory(story) {
	let localStory = {};
	localStory.id = story.id;
	localStory.projectId = story.projectId;
	localStory.name = story.name;
	localStory.description = story.description;

	//create
	if (localStory.id === -1) {
		localStory.id = nextId();

		storyData.push(localStory);

		return localStory;
	}

	let index = findStory(localStory.id);
	if (localStory !== -1) {
		storyData[localStory] = localStory;

		return localStory;
	}

	return null;
}

export function deleteStory(storyId) {
	if (storyId === -1) {
		return;
	}

	let index = findStory(storyId);
	if (index !== -1) {
		delete storyData[index];
	}
}