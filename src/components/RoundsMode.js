/* RoundsMode: The enumerated type for Rounds modes. */

const RoundsMode = {
    ROUNDSTABLE: "RoundsTable",
    LOGROUND: "LogRound",
    EDITROUND: "EditRound"
};

Object.freeze(RoundsMode); //This ensures that the object is immutable.

export default RoundsMode;
