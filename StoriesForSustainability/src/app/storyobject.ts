export class StoryObject {
    _id: string; // Assigned by MongoDB
    story_id: string; //story id that is client side incremented
    title: string; // string representing a story
    creator: string; // string representing the creator
    storyPointer: string;
    coverImagePointer: string;
    tags: string[]; // string representing a user's first name
    editAccess: string[];
    lastUpdated: string; //last updated

    constructor(_id: string, story_id: string, title:string, creator:string, tags:string[], editAccess: string[], lastUpdated: string) {
        this._id = _id;
        this.story_id = story_id;
        this.title = title;
        this.creator = creator;
        this.storyPointer = null;
        this.coverImagePointer = null;
        this.tags = tags;
        this.editAccess = editAccess;
        this.lastUpdated = lastUpdated;
    }
}