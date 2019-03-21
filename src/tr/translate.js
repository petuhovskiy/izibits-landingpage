const translate = (key, lang) => {
    const tmap = window.translationmap;
    for (let i = 0; i < tmap.length; i++) {
        if (tmap[i].key == key && tmap[i][lang]) {
            return tmap[i][lang];
        }
    }
    return lang + "#" + key;
};

export default translate;
