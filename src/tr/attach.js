import React from "react";
import ReactDOM from "react-dom";

window.trAttach = (e, key) => {
    ReactDOM.render(<Tr key={key} />, e);
};
