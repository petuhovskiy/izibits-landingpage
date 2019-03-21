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
                    nextState: "try-it",
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
                },
            ],
            buttons: [
                {
                    text: "telegram-option",
                    img: "/img/telegram-button.png",
                    act: "url",
                    url: "https://t.me/izibits3_snapshot_bot",
                    nextState: "start-over",
                },
                {
                    text: "viber-option",
                    img: "/img/viber-button.png",
                    // TODO: icon and act
                },
                {
                    text: "facebook-option",
                    img: "/img/facebook-button.png",
                    // TODO: icon and act
                },
            ],
        },
        {
            key: "start-over",
            messages: [
                {
                    text: "want-start-again",
                },
            ],
            buttons: [
                {
                    text: "start-again",
                    act: "startOver",
                    nextState: "init",
                },
            ],
        },
    ],

    initState: "init",
};
