const storyList = [];

export class Story {
    constructor(name, city, country, age, photo, info) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.age = age;
        this.photo = photo;
        this.info = info;
        console.table(this);

    }
    addStoryToList() {
        storyList.push(this);
        console.table(storyList);
    }
}

export function getStories() {
    for (let i = 0; i < storyList.length; i++) {
        new storyDomElement(storyList[i].name, storyList[i].city, storyList[i].country, storyList[i].age, storyList[i].photo, storyList[i].info);
    }
}

