import React from 'react';

const formatTime = (time) => {
    if (time < 10) {
        return '00' + time;
    }

    if (time < 100) {
        return '0' + time;
    }

    if (time > 999) {
        return 999;
    }

    return time;
};

const Timer = (props) => {
    const { time } = props;

    var formattedTime = formatTime(time);

    return (
        <div>{formattedTime}</div>
    );
};

export default Timer;