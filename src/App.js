import React from 'react';
import Reddit from './services/reddit';

import request from 'request';

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            autocompletions: [],
            slides: []
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

    selectRandom () {
        this.selectSubreddit('random');
    }

    selectSubreddit (subreddit) {
        request('http://localhost:3000/reddit/r/' + subreddit, (error, response, slides) => {
            this.setState({ slides: JSON.parse(slides) })
        });
    }

    render () {
        return (
            <div className="container">
                Whackatoke
                <div className="row">
                    <input id="whack-input" className="form-control col-md-9" onChange={this.handleInput.bind(this)}/>
                    <button className="btn btn-primary col-md-2 offset-md-1" onClick={this.selectRandom.bind(this)}>
                        Random
                    </button>
                </div>
                {this.state.autocompletions.map((completion, i) => {
                    return (<div key={i} onClick={() => this.selectSubreddit(completion.display_name_prefixed.split('/')[1])}>
                        {completion.title}
                    </div>);
                })}
                {this.state.slides.map((slides, i) => {
                    return (<div key={i}>
                        <pre>
                            { JSON.stringify(slides, null, 2) }
                        </pre>
                    </div>);
                })
                }
            </div>
        );
    }
}

export default App;
