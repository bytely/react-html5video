import React, { Component } from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import styles from './App.css';
import 'reset-css/reset.css';
import vttEn from './../../assets/sintel-en.vtt';
import vttEs from './../../assets/sintel-es.vtt';
import bigBuckBunnyPoster from './../../assets/poster-big-buck-bunny.png';
import sintelTrailerPoster from './../../assets/poster-sintel-trailer.png';

const sintelTrailer = 'https://download.blender.org/durian/trailer/sintel_trailer-720p.mp4';
const bigBuckBunny = 'http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov';

class App extends Component {
    constructor(props) {
        super(props);

        this.addWord = this.addWord.bind(this);
        this.state = {
            addedWords: [],
            meanings: {
                searching: "معنی"
            },
        }
    }

    addWord(word) {
        this.setState(({ addedWords }) => ({
            addedWords: !addedWords.includes(word) ? [...addedWords, word] : addedWords
        }))
    }

    render () {
        return (
            <div className={styles.component}>
                <header className={styles.header}>
                    <h1 className={styles.title}>React HTML5 Video</h1>
                    <a className={styles.link}
                        href="https://github.com/mderrick/react-html5video">
                        View on GitHub &raquo;
                    </a>
                </header>
                <ul className={styles.videoList}>
                    <li className={styles.videoListItem}>
                        <Video
                            autoPlay
                            ref="video1"
                            onPlay={() => {
                                // this.refs.video2.videoEl.pause();
                            }}
                            // controls={['Subtitle']}
                            onSubtitleHover={word => {
                                this.refs.video1.videoEl.pause();
                            }}
                            addedWords={this.state.addedWords}
                            meanings={this.state.meanings}
                            onSubtitleWordClick={null}
                            onSubtitleWordAdd={this.addWord}
                            poster={sintelTrailerPoster}>
                            <source src={sintelTrailer} type="video/mp4" />
                            <track
                                label="English"
                                kind="subtitles"
                                srcLang="en"
                                src={vttEn}
                                default
                                />
                            <track
                                label="Español"
                                kind="subtitles"
                                srcLang="es"
                                src={vttEs} />
                        </Video>
                    </li>
                    <li className={styles.videoListItem}>
                        <Video
                            ref="video2"
                            onPlay={() => {
                                this.refs.video1.videoEl.pause();
                            }}
                            src={bigBuckBunny}
                            poster={bigBuckBunnyPoster}>
                        </Video>
                    </li>
                </ul>
            </div>
        );
    }
}

export default App;
