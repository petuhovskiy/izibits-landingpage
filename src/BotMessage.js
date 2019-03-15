import React, { Component } from "react";
import BotTimeInfo from "./BotTimeInfo";

class BotMessage extends Component {
    render() {
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
                                <div className="typing-spinner">
                                    <div className="ball lb-background-color_accent" />
                                    <div className="ball lb-background-color_accent" />
                                    <div className="ball lb-background-color_accent" />
                                </div>
                                <p
                                    className="lb-message-text lb-color_bot-message-text"
                                    style={{
                                        display: "inline-block",
                                    }}
                                >
                                    {this.props.children}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BotMessage;
