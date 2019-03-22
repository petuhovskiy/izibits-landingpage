class ScriptedLogic {
    constructor(script) {
        this.script = script;
        this.messages = [];
        this.subscribers = [];
        this.animationInProgress = false;

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

        if (this.animationInProgress) {
            console.log("something is wrong");
            return;
        }

        this.animationInProgress = true;
        this.state = state;
        this.stateKey = newState;

        (async () => {
            for (let i = 0; i < this.state.messages.length; i++) {
                this.messages.push({
                    from: "site",
                    content: {
                        isSpinner: true,
                    },
                });
                this.fireUpdate();

                await new Promise(resolve => setTimeout(resolve, 600));
                this.messages.pop();

                const msg = this.state.messages[i];
                this.messages.push({
                    from: "site",
                    content: msg,
                });
                this.fireUpdate();
            }

            this.animationInProgress = false;
            this.fireUpdate();
        })();

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
            if (this.animationInProgress) {
                console.log("warn: animation in progress", act, msg);
                return;
            }
            this.messages.push({
                from: "user",
                content: {
                    text: msg,
                },
            });
            if (
                act.act == "next-state" ||
                act.act == "url" ||
                act.act == "start-over"
            ) {
                if (act.act == "start-over") {
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
        if (this.animationInProgress) {
            return null;
        }

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
