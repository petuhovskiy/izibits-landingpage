class ScriptedLogic {
    constructor() {
        this.messages = [
            {
                from: "site",
                content: "Привет! Про что рассказать?",
            },
        ];
        this.state = "tellme";

        this.subscribers = [];
    }

    // publish/subscribe things

    subscribe(f) {
        // append subscriber to the back
        this.subscribers.push(f);
    }

    unsubscribe(f) {
        // remove all subscribers equal to f
        this.subscribers = this.subscribers.filter(it => it != f);
    }

    fireUpdate() {
        const state = this.getState();

        // iterate and send update to all subscribers
        this.subscribers.forEach(f => f(state));
    }

    preact(act) {
        return msg => {
            this.messages.push(
                {
                    from: "user",
                    content: msg,
                },
                {
                    from: "site",
                    content: act + " это очень круто!",
                },
                {
                    from: "site",
                    content: "Привет! Про что рассказать?",
                }
            );
            this.fireUpdate();
        };
    }

    getState() {
        return {
            messages: this.messages,
            buttons: [
                {
                    text: "Расскажи про кек",
                    action: this.preact("kek"),
                },
                {
                    text: "Расскажи про мда",
                    action: this.preact("mda"),
                },
            ],
        };
    }
}

export default ScriptedLogic;
