import React, { PureComponent } from "react";
import memoize from "memoize-one";
import styles from "./Subtitle.css";
import SubtitleButton from "./../Icon/subtitle_button.svg";
import SubtitleButtonAdded from "./../Icon/subtitle_word_added.svg";

const extractWords = memoize(cue =>
    (cue || '')
        .replace(/<\/?[^>]+(>|$)/g, '')
        .split(/\s+/gm)
        .filter(Boolean)
);

class Subtitle extends PureComponent {
    constructor(props) {
        super(props);

        this.handleHover = this.handleHover.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.state = {};
    }

    handleHover(event) {
        const wordEl = event.target;
        this.setState({ wordEl })
        this.props.onHover && this.props.onHover(wordEl.textContent)
    }

    handleMouseOut() {
        this.setState({ wordEl: null });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cue !== this.props.cue) {
            this.setState({ wordEl: null });
        }
    }

    render() {
        const { wordEl } = this.state;
        const { onWordClick, onWordAdd, addedWords, meanings } = this.props;

        const words = extractWords(this.props.cue);
        const word = (wordEl && wordEl.textContent.replace(/^\W|\W$/, '')) || '';
        const added = word && addedWords && addedWords.includes(word);
        const meaning = meanings && meanings[word];

        return (
            <div className={styles.subtitle}>
                {wordEl && (
                    <div
                        className={styles.action}
                        style={{
                            left: wordEl.offsetLeft + wordEl.offsetWidth / 2
                        }}
                    >
                        {!added ? (
                            <SubtitleButton
                                onClick={() => wordEl && onWordAdd(word)}
                            />
                        ) : (
                            <SubtitleButtonAdded />
                        )}
                        {meaning && <span>{meaning}</span>}
                    </div>
                )}
                <div>
                    {words.map((w, i) => (
                        <span key={i}>
                            <span
                                className={styles.word}
                                onMouseEnter={this.handleHover}
                                onClick={onWordClick}
                            >
                                {w}
                            </span>
                            <span> </span>
                        </span>
                    ))}
                </div>
            </div>
        );
    }
}

export default Subtitle;
