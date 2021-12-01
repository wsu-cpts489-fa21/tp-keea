/* CoursesMode: The enumerated type for Courses modes. */

const CoursesMode = {
    COURSESTABLE: "CoursesTable",
    LOGCOURSE: "LogCourse",
    EDITCOURSE: "EditCourse"
};

Object.freeze(CoursesMode); //This ensures that the object is immutable.

export default CoursesMode;
