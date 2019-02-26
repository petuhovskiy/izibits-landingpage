import React, { Component } from "react";
import BotMessage from "./BotMessage";

class App extends Component {
    render() {
        const msg = `Привет! 👋

        Добро пожаловать в  - бот-сервис по покупке и продаже биткоина, криптовалют и токенов. Автоматический бот выступает третьей стороной, гарантирующей сделки между людьми.
        
        Что дальше?`;
        return (
            <div className="App">
                <BotMessage>{msg}</BotMessage>
            </div>
        );
    }
}
export default App;
