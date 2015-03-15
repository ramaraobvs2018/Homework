/**
 * a content management library, like Sitecore. 
 */
var Sitenub = (function () {
    var cache = {};

    return {
        add: addContent,
        get: getContent
    };

    // generate key for content, rudimentary for brevity
    function getKey(s) {
        return s ? s.charCodeAt(0) + s.charCodeAt(s.length - 1) : 0;
    }

    // add content to cache, if not already added; return cache key
    function addContent(content) {
        var key = getKey(content);

        if(!cache[key]) {
            cache[key] = content;
        }

        return key;
    }

    // get content for given cache key
    function getContent(key) {
        return cache[key];
    }
})();