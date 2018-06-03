import React from 'react';
import Reddit from './services/reddit';

import './App.css';

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
            <div className="app container d-flex flex-column">
                <div>
                    <h1 className="title">
                        Whakaoke
                    </h1>
                </div>
                <div className="d-flex flex-row align-self-center searchbar">
                    <input id="whack-input" className="form-control flex-grow-1 m-2" onChange={this.handleInput.bind(this)}/>
                    <button className="btn btn-primary m-2" onClick={this.selectRandom.bind(this)}>
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
                <div><a href="https://docs.google.com/presentation/d/1eTOVC1HKuFOymot4dsFrQQUhgGbB_HGnvV_7fBiV984">Slides</a></div>
            </div>
        );
    }
}

export default App;
