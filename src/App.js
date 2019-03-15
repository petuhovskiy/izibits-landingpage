import React, { Component } from "react";
import BotMessage from "./BotMessage";
import BotButtons from "./BotButtons";
import BotButton from "./BotButton";
import BotBody from "./BotBody";
import UserMessage from "./UserMessage";

class App extends Component {
    render() {
        const msg = `Привет! 👋 Добро пожаловать в  - бот-сервис по покупке и продаже биткоина, криптовалют и токенов. Автоматический бот выступает третьей стороной, гарантирующей сделки между людьми. Что дальше?`;
        return (
            <BotBody>
                <BotMessage time="01:11">{msg}</BotMessage>
                <UserMessage time="01:44">Привет!</UserMessage>
                <BotMessage time="02:28">
                    Здравствуйте, присаживайтесь поудобнее.
                </BotMessage>
                <BotButtons>
                    <BotButton onClick={console.log}>
                        Попробовать прямо сейчас!
                    </BotButton>
                    <BotButton>Узнать больше</BotButton>
                </BotButtons>
            </BotBody>
        );
    }
}
export default App;
