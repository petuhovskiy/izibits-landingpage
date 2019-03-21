import React, { Component } from "react";
import Tr from "./tr/Tr";

class BotButtons extends Component {
    render() {
        return (
            <div
                id="lb-message-input"
                className="lb-display-block lb-position-relative enabled"
            >
                <div className="lb-input-overflow-content" />
                <div
                    className="lb-input-box lb-height-0 lb-overflow-hidden"
                    style={{ height: "auto" }}
                >
                    <div className="lb-input-container lb-position-relative menu">
                        <div className="lb-input-header" />
                        <div className="lb-input-body">
                            <div className="lb-input-menu lb-position-relative">
                                <span className="lb-input-menu_help lb-input-menu-info lb-display-block lb-not-selectable lb-s-10 lb-color_contrast lb-t-uppercase">
                                    <Tr lkey="choose-an-option" />
                                </span>
                                <div className="lb-input-menu-buttons lb-display-flex lb-flex-wrap ">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BotButtons;
