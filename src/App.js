import React from 'react';
import Reddit from './services/reddit';

import './App.css';

import request from 'request';

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            autocompletions: [],
            slides: [],
            url: '',
            loaded: false,
        };
        this.reddit = new Reddit();
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
        this.setState({ loaded: false });
        request('http://localhost:3000/reddit/r/' + subreddit, (error, response, url) => {
            this.setState({ url: url, loaded: true })
        });
    }

    render () {
        return (
            <div className="app container d-flex flex-column">
                <div id="title-container">
                    <h1 className="title">
                        Whakaokee!
                    </h1>
                </div>

                <div className="d-flex flex-row align-self-center searchbar">
                    <input id="whack-input" className="form-control flex-grow-1 m-2" onChange={this.handleInput.bind(this)}/>
                    <button className="btn btn-primary m-2" onClick={this.selectRandom.bind(this)}>
                        Random
                    </button>
                </div>
                <div id="autocomplete-results">
                    {this.state.autocompletions.map((completion, i) => {
                        return (<div key={i} onClick={() => this.selectSubreddit(completion.display_name_prefixed.split('/')[1])}>
                            {completion.title}
                        </div>);
                    })}
                </div>

                
                <a id="slide-link" className="btn btn-primary" href="{this.state.url}">Slides</a>
            </div>
        );
    }
}

export default App;
