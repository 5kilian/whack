import React from 'react';
import Reddit from './services/reddit';

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            autocompletions: []
        };
        this.reddit = new Reddit();
    }

    componentDidMount () {

    }

    handleInput () {
        this.reddit.autocomplete(document.getElementById('whack-input').value).then(completions => {
            this.setState({
                autocompletions: completions
            });
        });
    }

    selectSubreddit () {

    }

    render () {
        return (
            <div className="container">
                Whackatoke
                <div className="row">
                    <input id="whack-input" className="form-control col-md-9" onChange={this.handleInput}/>
                    <button className="btn btn-primary col-md-2 offset-md-1">
                        Random
                    </button>
                </div>
                {this.state.autocompletions.map((completion, i) => {
                    return (<div key={i} onClick={this.selectSubreddit()}>
                        {completion.title}
                    </div>);
                })}
            </div>
        );
    }
}

export default App;
