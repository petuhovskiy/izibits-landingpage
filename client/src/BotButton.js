import React, { Component } from "react";
import Tr from "./tr/Tr";

class BotButton extends Component {
    render() {
        const content = this.props.content;
        console.log(content);
        let img = null;
        if (content.img) {
            img = (
                <div className="include-image-container">
                    <div
                        className="include-image"
                        style={{ backgroundImage: `url("${content.img}")` }}
                    />
                </div>
            );
        }
        return (
            <a
                {...(content.url ? { href: content.url } : {})}
                target="_blank"
                className="lb-input-menu_button  lb-display-flex lb-color_button-text lb-background-color_button-background lb-background-color_button-background-light_hover lb-border-color_button-background-dark lb-border-2 lb-border-radius-3 lb-a-center lb-d-none lb-justify-center lb-flex-dir-column lb-align-stretch lb-c-pointer"
                onClick={this.props.onClick}
                tabIndex="1"
            >
                {img}
                <div className="lb-input-menu_button_text lb-display-flex lb-align-center lb-a-center">
                    <span className="button-text lb-flex-1">
                        <Tr lkey={this.props.content.text} />
                    </span>
                    <i className="fi chains link-icon lb-s-16" />
                </div>
            </a>
        );
    }
}

export default BotButton;
