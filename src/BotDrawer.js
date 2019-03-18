import React, { Component } from "react";
import BotMessage from "./BotMessage";
import BotButtons from "./BotButtons";
import BotButton from "./BotButton";
import BotBody from "./BotBody";
import UserMessage from "./UserMessage";

class BotDrawer extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.logic.getState();

        // binders
        this._handleUpdate = this._handleUpdate.bind(this);
    }

    _handleUpdate(state) {
        this.setState(state);
    }

    componentDidMount() {
        // subscribe for state updates
        this.props.logic.subscribe(this._handleUpdate);

        // set current state
        this.setState(this.props.logic.getState());
    }

    componentWillUnmount() {
        // need to unsubscribe to prevent leaks
        this.props.logic.unsubscribe(this._handleUpdate);
    }

    render() {
        const { state } = this;

        // construct messages
        // TODO: time
        let messages = state.messages.map(it => {
            if (it.from == "site") {
                return <BotMessage>{it.content}</BotMessage>;
            }
            if (it.from == "user") {
                return <UserMessage>{it.content}</UserMessage>;
            }
            return null;
        });
        messages = Array.from(messages);

        // construct buttons
        let buttons = null;
        if (state.buttons) {
            buttons = (
                <BotButtons>
                    {state.buttons.map(it => (
                        <BotButton onClick={() => it.action(it.text)}>
                            {it.text}
                        </BotButton>
                    ))}
                </BotButtons>
            );
        }

        // actual render
        return (
            <BotBody>
                {messages}
                {buttons}
            </BotBody>
        );
    }
}
export default BotDrawer;
