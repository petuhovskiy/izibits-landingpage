import React from "react";

let lang = "en";

// setting default lang
if (window.location.href.endsWith("/ru")) {
    lang = "ru";
}

// create context
const LangContext = React.createContext(lang);

// publish/subscribe things
const subscribers = [];

const subscribe = f => {
    // append subscriber to the back
    subscribers.push(f);
};

const unsubscribe = f => {
    // remove all subscribers equal to f
    subscribers = subscribers.filter(it => it != f);
};

const fireUpdate = () => {
    const state = getLang();

    // iterate and send update to all subscribers
    subscribers.forEach(f => f({ lang }));
};

const switchLang = newLang => {
    lang = newLang;
    fireUpdate();
};

const getLang = () => {
    return { lang };
};

export default LangContext;
export { switchLang, subscribe, unsubscribe, getLang };

window.switchLang = switchLang;
window.getLang = getLang;
