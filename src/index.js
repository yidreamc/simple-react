const React = {
    createElement,
}
const ReactDOM = {
    render: (vdom, container) => {
        container.innerHtml = '';
        return render(vdom.container);
    }
}
function createElement(tag, attrs, ...children) {
    return {
        tag, attrs, children
    }
}

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

const h = (<h1 class="ttt"> hello world <div>this is div</div> </h1>);
console.log(h);