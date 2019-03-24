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
                    url: "tg://resolve?domain=izibits3_snapshot_bot",
                    nextState: "start-over",
                },
                {
                    text: "viber-option",
                    img: "/img/viber-button.png",
                    act: "next-state",
                    nextState: "viber-dev",
                },
                {
                    text: "facebook-option",
                    img: "/img/facebook-button.png",
                    act: "next-state",
                    nextState: "facebook-dev",
                },
            ],
        },
        {
            key: "facebook-dev",
            messages: [
                {
                    text: "facebook-dev",
                },
            ],
            buttons: [
                {
                    text: "try-telegram",
                    img: "/img/telegram-button.png",
                    act: "url",
                    url: "tg://resolve?domain=izibits3_snapshot_bot",
                    nextState: "start-over",
                },
            ],
        },
        {
            key: "viber-dev",
            messages: [
                {
                    text: "viber-dev",
                },
            ],
            buttons: [
                {
                    text: "try-telegram",
                    img: "/img/telegram-button.png",
                    act: "url",
                    url: "tg://resolve?domain=izibits3_snapshot_bot",
                    nextState: "start-over",
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
                    act: "start-over",
                    nextState: "init",
                },
            ],
        },
    ],

    initState: "init",
};
