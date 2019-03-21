import React, { Component } from "react";
import LangContext, { getLang, subscribe, unsubscribe } from "./LangContext";

class TrProvider extends Component {
    constructor(props) {
        super(props);

        this.state = getLang();
        // binders
        this._handleUpdate = this._handleUpdate.bind(this);
    }

    _handleUpdate(state) {
        this.setState(state);
    }

    componentDidMount() {
        // subscribe for state updates
        subscribe(this._handleUpdate);

        // set current state
        this.setState(getLang());
    }

    componentWillUnmount() {
        // need to unsubscribe to prevent leaks
        unsubscribe(this._handleUpdate);
    }

    render() {
        return (
            <LangContext.Provider value={this.state.lang}>
                {this.props.children}
            </LangContext.Provider>
        );
    }
}

export default TrProvider;
