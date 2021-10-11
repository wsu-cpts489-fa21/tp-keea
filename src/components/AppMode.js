/* AppMode: The enumerated type for AppMode. */

const AppMode = {
    LOGIN: "LoginMode",
    FEED: "FeedMode",
    ROUNDS: "RoundsMode",
    COURSES: "CoursesMode",
    BUDDIES: "BuddiesMode"
};

Object.freeze(AppMode); //This ensures that the object is immutable.

export default AppMode;
