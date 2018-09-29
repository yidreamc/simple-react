function render(vdom, container) {

    if (typeof vdom === 'string') {
        const textNode = document.createTextNode(vdom);
        return container.appendChild(textNode);
    }

    const dom = document.createElement(vdom.tag);
    if (vdom.attrs) {
        Object.keys(vdom.attrs).forEach(key => {
            const value = vdom[key];
            setAttribute(dom, key, value);
        })
    }

    vdom.children.forEach(child => render(child, dom));
    return container.appendChild(dom);

}

export default render;