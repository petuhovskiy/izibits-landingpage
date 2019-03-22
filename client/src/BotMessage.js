import React, { Component } from "react";
import BotTimeInfo from "./BotTimeInfo";
import Tr from "./tr/Tr";

class BotMessage extends Component {
    render() {
        let content = null;
        if (this.props.content.isSpinner) {
            content = (
                <div className="typing-spinner" style={{ opacity: 1 }}>
                    <div className="ball lb-background-color_accent" />
                    <div className="ball lb-background-color_accent" />
                    <div className="ball lb-background-color_accent" />
                </div>
            );
        } else {
            content = (
                <p
                    className="lb-message-text lb-color_bot-message-text"
                    style={{
                        display: "inline-block",
                    }}
                >
                    <Tr lkey={this.props.content.text} />
                </p>
            );
        }
        return (
            <div className="lb-message brand animate left-in">
                <div className="lb-message-container">
                    <div className="lb-message-margin">
                        <BotTimeInfo time={this.props.time} />
                        <div className="lb-message-content">
                            <div
                                className="lb-message-bubble lb-position-relative lb-background-color_bot-message-background"
                                style={{
                                    width: "auto",
                                    height: "auto",
                                }}
                            >
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BotMessage;
