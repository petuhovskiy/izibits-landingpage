import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import Tr from "./tr/Tr";
import TrProvider from "./tr/TrProvider.js";
import ScriptedLogic from "./logic/ScriptedLogic";

const logic = new ScriptedLogic(window.botscriptmap);

// render bot interface
ReactDOM.render(
    <TrProvider>
        <App logic={logic} />
    </TrProvider>,
    document.getElementById("app-landbot")
);

// attach translation to html elements
Array.from(document.querySelectorAll("[tr-data]")).forEach(it => {
    const key = it.getAttribute("tr-data");
    ReactDOM.render(
        <TrProvider>
            <Tr lkey={key} />
        </TrProvider>,
        it
    );
});
