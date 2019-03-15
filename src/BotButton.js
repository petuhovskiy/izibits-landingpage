import React, { Component } from "react";

class BotButton extends Component {
    render() {
        return (
            <a
                target="_blank"
                className="lb-input-menu_button  lb-display-flex lb-color_button-text lb-background-color_button-background lb-background-color_button-background-light_hover lb-border-color_button-background-dark lb-border-2 lb-border-radius-3 lb-a-center lb-d-none lb-justify-center lb-flex-dir-column lb-align-stretch lb-c-pointer"
                onClick={this.props.onClick}
                tabIndex="1"
            >
                <div className="lb-input-menu_button_text lb-display-flex lb-align-center lb-a-center">
                    <span className="button-text lb-flex-1">
                        {this.props.children}
                    </span>
                    <i className="fi chains link-icon lb-s-16" />
                </div>
            </a>
        );
    }
}

export default BotButton;
