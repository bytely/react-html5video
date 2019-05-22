import React from "react";
import styles from "./PlayPause.css";
import PlayArrow from "./../Icon/play_arrow.svg";
import Pause from "./../Icon/pause.svg";
import Next from "./../Icon/next.svg";
import Previous from "./../Icon/previous.svg";

export default ({
    onClick,
    onNextClick,
    onPreviousClick,
    paused,
    className,
    ariaLabelPlay,
    ariaLabelPause
}) => {
    return (
        <div className={[styles.component, className].join(" ")}>
            <button
                className={[styles.button, styles.previous].join(" ")}
                type="button"
                onClick={onPreviousClick}
            >
                <Previous className={styles.skip} fill="#fff" />
            </button>
            <button
                className={[styles.button, styles.play].join(" ")}
                onClick={onClick}
                aria-label={paused ? ariaLabelPlay : ariaLabelPause}
                type="button"
            >
                {paused ? (
                    <PlayArrow className={styles.icon} fill="#fff" />
                ) : (
                    <Pause className={styles.icon} fill="#fff" />
                )}
            </button>
            <button
                className={[styles.button, styles.next].join(" ")}
                type="button"
                onClick={onNextClick}
            >
                <Next className={styles.skip} fill="#fff" />
            </button>
        </div>
    );
};
