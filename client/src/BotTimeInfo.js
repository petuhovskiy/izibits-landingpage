import React, { Component } from "react";

class BotTimeInfo extends Component {
    render() {
        const time = this.props.time;
        return (
            <div className="lb-message-info visible">
                <div className="lb-message-date lb-a-center lb-s-10 lb-color_contrast">
                    {time ? <span>{time}</span> : null}
                </div>
            </div>
        );
    }
}

export default BotTimeInfo;
