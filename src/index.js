import React from '../lib/react'
import ReactDOM from '../lib/react-dom'

class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            number: 10
        }
    }
    handleClick(){
        this.setState({
            number: ++this.state.number
        });
    }
    componentWillUpdate() {
        console.log('update');
    }

    componentWillMount() {
        console.log('mount');
    }

    render(){
        return (
            <div>
                <h1>Number: { this.state.number }</h1>
                <button onClick={() => this.handleClick()} t="1">add 1</button>
            </div>
        )
    }
}

const elment = (
    <App />
)
ReactDOM.render(elment,document.getElementById('root'));