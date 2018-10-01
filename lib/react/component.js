import { renderComponent } from '../react-dom/render';

class Component {

    constructor(props = {}) {
        this.state = {};
        this.props = props;
    }

    setState(changedState) {
        Object.assign(this.state, changedState);
        renderComponent(this);
    }
}

export default Component;