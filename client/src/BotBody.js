import React, { Component } from "react";

class BotBody extends Component {
    render() {
        return (
            <div id="app-modules" className="rendered">
                <div id="styles" />
                <div
                    id="gui"
                    className="lb-zindex-2 lb-position-fixed lb-width-full lb-height-full lb-position-top-left lb-display-flex lb-flex-dir-column lb-overflow-hidden"
                >
                    <section
                        id="lb-body"
                        className="lb-zindex-0 lb-display-flex lb-flex-1 lb-flex-dir-column lb-overflow-hidden"
                    >
                        <div />
                        <div
                            id="lb-messages-container"
                            className="lb-zindex-0 lb-flex-1 lb-overflow-auto"
                        >
                            <div id="scroll-top-fixer" />
                            <div className="lb-messages-wrapper">
                                <div className="lb-old-chat" />
                                {this.props.children}
                                <div id="scroll-bottom-fixer" />
                            </div>
                        </div>
                    </section>
                    <footer
                        id="lb-footer"
                        className="lb-display-none lb-m-display-flex lb-align-center lb-justify-center"
                    />
                </div>
            </div>
        );
    }
}
export default BotBody;
