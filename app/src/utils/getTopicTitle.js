
function getTopicTitle(topic) {
    if (topic?.translation[0]?.title) {
        return topic.translation[0].title;
    }
    return topic.title;
}

export default getTopicTitle;