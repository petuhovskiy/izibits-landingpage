import React, { Component } from "react";
import BotTimeInfo from "./BotTimeInfo";

class UserMessage extends Component {
    render() {
        return (
            <div className="lb-message user animate" style={{ height: "auto" }}>
                <div className="lb-message-container">
                    <div className="lb-message-margin">
                        <BotTimeInfo time={this.props.time} />
                        <div className="lb-message-content">
                            <div className="lb-message-bubble lb-position-relative lb-background-color_user-message-background">
                                <p className="lb-message-text lb-color_user-message-text">
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

export default UserMessage;
