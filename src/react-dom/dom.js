function setAttribute(dom, key, value) {

    // className 转换为 class
    if (key === 'className') {
        key = 'class';
    }

    // 监听事件
    if (/on\w+/.test(key)) {
        dom[key.toLowerCase()] = value || '';
    } else if (key === 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || '';
        } else if (value && typeof value === object) {
            for (k in value) {
                dom.style[k] = typeof value[k] === 'number' ? value[k] + 'px' : value[k];
            }
        }
    } else {
        if (value) {
            dom.setAttribute(key, value);
        } else {
            dom.removeAttribute(key, value);
        }
    }
}

export default setAttribute;