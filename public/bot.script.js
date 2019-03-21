window.botscriptmap = {
    states: [
        {
            key: "init",
            messages: [
                {
                    text: "welcome",
                },
            ],
            buttons: [
                {
                    text: "try-now",
                    act: "next-state",
                    nextState: "lets-start",
                },
                {
                    text: "learn-more",
                    act: "next-state",
                    nextState: "more-info",
                },
            ],
        },
        {
            key: "more-info",
            messages: [
                {
                    text: "more-info-1",
                },
                {
                    text: "more-info-2",
                },
            ],
            buttons: [
                {
                    text: "try-it",
                    act: "next-state",
                    nextState: "try-it",
                },
            ],
        },
        {
            key: "try-it",
            messages: [
                {
                    text: "lets-start",
                }
            ],
            buttons: [
                {
                    text: "telegram-option",
                    // TODO: icon and act
                },
                {
                    text: "viber-option",
                    // TODO: icon and act
                },
                {
                    text: "facebook-option",
                    // TODO: icon and act
                },
            ],
        },
    ],

    initState: "init",
};
