import moment, { Moment } from "moment";

function minsOfTheDay(d: Moment) {
    return d.minutes() + (d.hours() * 60);
} 

function currentTimeInBetween(start: Moment, end: Moment) {
    const currentTime = minsOfTheDay(moment());
    const startTime = minsOfTheDay(start);
    const endTime = minsOfTheDay(end);
    return (currentTime >= startTime && currentTime <= endTime);   
}

export {
    minsOfTheDay, 
    currentTimeInBetween
};