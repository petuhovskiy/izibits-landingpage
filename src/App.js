import React, { Component } from "react";
import BotMessage from "./BotMessage";
import BotButtons from "./BotButtons";
import BotButton from "./BotButton";
import BotBody from "./BotBody";
import UserMessage from "./UserMessage";
import ScriptedLogic from "./logic/ScriptedLogic";
import BotDrawer from "./BotDrawer";

class App extends Component {
    render() {
        return <BotDrawer logic={this.props.logic} />;
    }
}

export default App;