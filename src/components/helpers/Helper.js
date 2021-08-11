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
