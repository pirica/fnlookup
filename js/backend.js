localStorage.keyFNAPI = '1eea611e-bed8-4d3b-aa22-aae0b15f1c08'
localStorage.keyFNAPIIo = '46c8d137-adea4f05-5928e673-ffdcf29d'

window.supportedLanguages = [
    'en', 'ar', 'de', 'es', 'es-419', 'fr', 'it', 'ja', 'ko', 'pl', 'pt-BR', 'ru', 'tr', 'zh-CN', 'zh-Hant'
];

if (localStorage.requestLanguage === undefined) {
    if (window.supportedLanguages.includes(window.navigator.language)) {
        localStorage.requestLanguage = window.navigator.language;
    }
}

function switchLanguage(to) {
    localStorage.requestLanguage = to;
    document.location.reload();
}

function geturllang(url, type) {
    let t = '?';
    if (url.split('?').length > 1) {
        t = '&';
    }

    switch (type) {
        case 0: // Fortnite-API
            return url + t + 'language=' + localStorage.requestLanguage
        case 1: // FortniteAPI.io
            return url + t + 'lang=' + localStorage.requestLanguage
    }
}

function otherargument(url, arg) {
    let t = '?';
    if (url.split('?').length > 1) {
        t = '&';
    }

    return url + t + arg + '=' + localStorage.requestLanguage
}