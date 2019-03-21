class ScriptedLogic {
    constructor(script) {
        this.script = script;
        this.messages = [];
        this.subscribers = [];

        this.goState(this.script.initState);
    }

    // state manipulations

    fetchState(key) {
        for (let i = 0; i < this.script.states.length; i++) {
            if (this.script.states[i].key != key) continue;

            return this.script.states[i];
        }

        return undefined;
    }

    goState(newState) {
        const state = this.fetchState(newState);
        if (!state) {
            alert(newState + " not found");
            return;
        }
        this.state = state;

        for (let i = 0; i < this.state.messages.length; i++) {
            const msg = this.state.messages[i];
            this.messages.push({
                from: "site",
                content: msg,
            });
        }

        this.stateKey = newState;

        this.fireUpdate();
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
            this.messages.push({
                from: "user",
                content: {
                    text: msg,
                },
            });
            if (
                act.act == "next-state" ||
                act.act == "url" ||
                act.act == "startOver"
            ) {
                if (act.act == "startOver") {
                    this.messages = [];
                }
                console.log("going to next state", act.nextState);
                this.goState(act.nextState);
            } else {
                console.log("unknown", act);
            }
        };
    }

    getButtons() {
        const buttons = [];
        for (let i = 0; i < this.state.buttons.length; i++) {
            const btn = this.state.buttons[i];
            buttons.push(
                Object.assign(
                    {
                        action: this.preact(btn),
                    },
                    btn
                )
            );
        }

        return buttons;
    }

    getState() {
        return {
            messages: this.messages,
            buttons: this.getButtons(),
        };
    }
}

export default ScriptedLogic;
