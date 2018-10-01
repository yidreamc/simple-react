import setAttribute from './dom'
import Component from '../react/component'

function createComponent(component, props) {

    let inst;
    if (component.prototype && component.prototype.render) {
        inst = new component(props);
    } else {
        inst = new Component(props);
        inst.constructor = component;
        inst.render = function () {
            return this.constructor(props);
        }
    }

    return inst;
}

function setComponentProps(component, props) {
    if (!component.base) {
        if (component.componentWillMount) {
            component.componentWillMount();
        }
    }

    component.props = props;
    renderComponent(component);

}

export function renderComponent(component) {
    const render = component.render();
    if (component.base && component.componentWillUpdate) {
        component.componentWillUpdate();
    }
    let base = _render(render);
    if (component.base && component.componentDidUpdate) {
        component.componentDidUpdate();
    } else if (component.componentDidMount) {
        component.componentDidMount();
    }

    if (component.base && component.base.parentNode) {
        component.base.parentNode.replaceChild(base, component.base);
    }

    component.base = base;
    base._component = component;
}

function _render(vdom) {

    if (vdom === undefined || vdom === null || typeof vdom === 'boolean') {
        vdom = '';
    }
    if (typeof vdom === 'number') {
        vdom = String(vdom);
    }
    if (typeof vdom === 'string') {
        const textNode = document.createTextNode(vdom);
        return textNode
    }

    if (typeof vdom.tag === 'function') {
        const component = createComponent(vdom.tag, vdom.attrs);
        setComponentProps(component, vdom.attrs);
        return component.base;
    }

    const dom = document.createElement(vdom.tag);
    if (vdom.attrs) {
        Object.keys(vdom.attrs).forEach(key => {
            const value = vdom.attrs[key];
            setAttribute(dom, key, value);
        })
    }

    vdom.children.forEach(child => render(child, dom));
    return dom;

}
export function render(vdom, container) {
    return container.appendChild(_render(vdom))
}