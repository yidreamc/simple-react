import render from './render'

const ReactDOM = {
    render: (vdom, container) => {
        container.innerHTML = '';
        return render(vdom, container);
    }
}
export default ReactDOM;