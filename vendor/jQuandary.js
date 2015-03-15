/**
 * an html manipulation libarary, like jQuery. 
 */
var jQuandary = (function (dom) {
    var me = {
        $: getElement,
        appendTo: appendTo,
        append: append,
        replace: replace,
        update: update
    };

    return me;

    // attempt to derive tagName from specified object
    function getTagName(o) {
        if(o && o.hasOwnProperty('tagName')) {
            return o.tagName;
        } else if(typeof o === 'string') {
            return o.replace(/<|>/g, '');
        } else {
            return '';
        }
    }

    // create specified element, as necessary, or find element by tag selector  
    function getElement(o) {
        if(o && o.hasOwnProperty('tagName')) {
            return o;
        } else if(typeof o === 'string') {
            if(o.indexOf('<') === 0) {
                return dom.createElement(getTagName(o));
            } else {
                return dom.querySelector(o);
            }
        } else {
            return dom.body;
        }
    }

    // append specified tag to target, and optionally update innerHtml
    function appendTo(tag, target, html) {
        var el = getElement(tag);

        getElement(target).appendChild(el);

        return update(el, html);
    }

    // append specified tag to dom, and optionally update innerHtml 
    function append(tag, html) {
        return appendTo(tag, dom.body, html);
    }

    // replace, if exists, or append specified tag, and optionally update innerHtml 
    function replace(tag, html) {
        var el = getElement(tag),
            replaceEl = getElement(getTagName(tag));

        if(replaceEl && replaceEl.parentNode) {
            replaceEl.parentNode.replaceChild(el, replaceEl);

            return update(el, html);
        } else {
            return append(el, html);
        }
    }

    // update innerHtml of specified tag
    function update(tag, html) {
        var el = getElement(tag);

        if(el && html !== undefined) {
            el.innerHTML = html;
        }

        return me;
    }
})(document);