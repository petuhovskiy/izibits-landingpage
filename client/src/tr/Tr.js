import React, { Component } from "react";
import LangContext from "./LangContext";
import translate from "./translate";
import { Parser } from "html-to-react";

class Tr extends Component {
    render() {
        const html = translate(this.props.lkey, this.context);
        return new Parser().parse(html);
    }
}

Tr.contextType = LangContext;

export default Tr;
