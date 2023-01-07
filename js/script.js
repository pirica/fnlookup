function gne(e) {
    return document.createElement(e);
}

function clearChildren(e) {
    while (e.firstChild) e.removeChild(e.firstChild);
}

function calcDays(v) {
    return v / (1000 * 3600 * 24)
}

enableAutoplayPromotionals = true;
function i() {
    vid = document.getElementById("fn-video");
    
    if (enableAutoplayPromotionals) {
        fetch(geturllang('https://fortniteapi.io/v2/battlepass?season=current', 1), {
            headers: { 'Authorization': localStorage.keyFNAPIIo }
        }).then(r => r.json()).then(r => {
            let sources = [];
            let curSource = 0;
    
            for (let src of r.videos) {
                sources.push(src.url);
            }
    
            let testVideoEnabled = false;
            if (testVideoEnabled) sources = [];
    
            vid.muted = true;
            if (sources.length > 0) {
                vid.src = sources[curSource];
                vid.loop = false;
    
                vid.addEventListener('ended', function () {
                    curSource += 1;
                    if (curSource >= sources.length) curSource = 0;
    
                    vid.src = sources[curSource];
                }, false);
            } else {
                vid.src = 'assets/old-school-anthem.mp4';
                vid.muted = false;
                vid.volume = 0.15;
            }
        }).catch(err => { console.error(err); });
    }

    vid.style.width = document.body.clientWidth + 'px';
    window.addEventListener("resize", function() {
        vid.style.width = document.body.clientWidth + 'px';
    });

    let list = document.getElementById("nav-items");

    let nav_items = [
        {
            name: 'Fortnite',
            hasArrow: true,
            alone: false,
            dropdownContent: [
                {
                    href: 'battle-pass.html',
                    name: 'Battle Pass'
                },
                {
                    href: 'challenges.html',
                    name: 'Challenges',
                },
                {
                    href: 'augments.html',
                    name: 'Augments'
                },
                {
                    href: 'map.html',
                    name: 'Map'
                },
                {
                    href: 'weapons.html',
                    name: 'Loot/Weapons'
                },
                {
                    href: 'vehicles.html',
                    name: 'Vehicles'
                },
                {
                    href: null,
                    name: 'Seasons',
                    dropdownContent: [
                        {
                            href: 'progress.html',
                            name: 'Season Progress',
                        },
                        {
                            href: 'seasons.html',
                            name: 'All Seasons'
                        },
                        {
                            href: 'promotionalvideos.html',
                            name: 'Season Promotional Videos'
                        }
                    ]
                }
            ]
        },
        {
            name: 'Extras',
            hasArrow: true,
            alone: false,
            dropdownContent: [
                {
                    href: 'stats.html',
                    name: 'Player Stats',
                },
                {
                    href: 'achievements.html',
                    name: 'Legacy Achievements'
                },
                {
                    href: 'twitch-drops.html',
                    name: 'Twitch Drops'
                },
                {
                    href: 'news.html',
                    name: 'In-game News'
                },
                {
                    href: 'fish.html',
                    name: 'Fish'
                },
                {
                    href: null,
                    name: 'Fortnite Crew',
                    dropdownContent: [
                        {
                            name: 'Fortnite Crew',
                            href: 'crew-pack.html'
                        },
                        {
                            name: 'Crew History',
                            href: 'crew-history.html'
                        }
                    ]
                },
                {
                    href: null,
                    name: 'Competitive',
                    dropdownContent: [
                        {
                            name: 'Tournaments',
                            href: 'tournaments.html'
                        },
                        {
                            name: 'Hype Leaderboard',
                            href: 'hype-leaderboard.html'
                        }
                    ]
                }
            ]
        },
        {
            name: 'Community',
            hasArrow: true,
            alone: false,
            dropdownContent: [
                {
                    href: null,
                    name: 'Cosmetics',
                    dropdownContent: [
                        {
                            href: 'new-cosmetics.html',
                            name: 'Newest added',
                        },
                        {
                            href: 'search.html',
                            name: 'Search'
                        },
                        {
                            href: 'random-cosmetics.html',
                            name: 'Locker Generator'
                        }
                    ]
                },
                {
                    href: null,
                    name: 'Creative',
                    dropdownContent: [
                        {
                            href: 'island.html',
                            name: 'Discovery'
                        }
                    ]
                },
                {
                    href: 'sac-codes.html',
                    name: 'SAC Codes'
                }
            ]
        },
        {
            name: 'Item Shop',
            hasArrow: true,
            alone: false,
            dropdownContent: [
                {
                    href: 'item-shop.html',
                    name: 'Current Item Shop',
                },
                {
                    href: 'predictions.html',
                    name: 'Predictions'
                }
            ]
        },
        {
            name: 'About',
            alone: true,
            href: 'about.html'
        }
    ]

    for (let nav_option of nav_items) {
        if (nav_option.href !== null && nav_option.alone) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.classList.add('nav-item');
            a.innerHTML = nav_option.name + ' ';
            a.href = nav_option.href;
            li.append(a);

            list.append(li);
        } else {
            let container = document.createElement('div');
            container.classList.add('nav-item');
            
            let a = document.createElement('a');
            a.innerHTML = nav_option.name + ' ';
            container.append(a);

            a.addEventListener('click', function() {
                container.classList.toggle('toggled');
            });

            if (nav_option.hasArrow) {
                let arrow = document.createElement('i');
                arrow.classList.add('arrow');
                container.appendChild(arrow);
            }

            let create_list = document.createElement('ul');
            create_list.classList.add('nav-dropdown-menu');

            container.appendChild(create_list);
            let li = document.createElement('li');
            li.append(container);

            list.append(li);

            for (let item of nav_option.dropdownContent) {
                let item_context = document.createElement('li');
                item_context.classList.add('dropdown-item');

                create_list.appendChild(item_context);

                let context = document.createElement('a');
                if (item.href !== null) {
                    context.href = item.href;
                }

                context.innerHTML = item.name;

                if (item.dropdownContent !== undefined) {
                    context.classList.add('nav-item');
                    context.innerHTML += '<i class="arrow"></i>';

                    let item_list = document.createElement('ul');
                    item_list.classList.add("nav-dropdown-menu", "side-drop-menu");
                    
                    for (let object of item.dropdownContent) {
                        let option = document.createElement('li');
                        option.classList.add('dropdown-item');
                        item_list.append(option);

                        let text = gne('a');
                        text.innerHTML = object.name;

                        if (object.href !== null) {
                            text.href = object.href;
                        }
                        option.append(text);
                    }
                    context.append(item_list);
                }
                
                item_context.appendChild(context);
            }
        }
    }

    document.getElementById('menu-btn').addEventListener('click', function() {
        document.getElementById('nav-elements').classList.toggle('hidden-media');
    });

    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            doSearch();
        }
    });

    document.getElementById('search-button').addEventListener('click', function() {
        doSearch();
    });

    let translatorIcon = document.createElement('a', 'flex', 'flex-center');
    translatorIcon.href = 'language-picker.html';
    translatorIcon.title = 'Language Picker';
    translatorIcon.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22"><g><path d="M11.99,1.98C6.46,1.98,1.98,6.47,1.98,12s4.48,10.02,10.01,10.02c5.54,0,10.03-4.49,10.03-10.02S17.53,1.98,11.99,1.98z M8.86,14.5c-0.16-0.82-0.25-1.65-0.25-2.5c0-0.87,0.09-1.72,0.26-2.55h6.27c0.17,0.83,0.26,1.68,0.26,2.55 c0,0.85-0.09,1.68-0.25,2.5H8.86z M14.89,15.5c-0.54,1.89-1.52,3.64-2.89,5.15c-1.37-1.5-2.35-3.25-2.89-5.15H14.89z M9.12,8.45 c0.54-1.87,1.52-3.61,2.88-5.1c1.36,1.49,2.34,3.22,2.88,5.1H9.12z M16.15,9.45h4.5c0.24,0.81,0.37,1.66,0.37,2.55 c0,0.87-0.13,1.71-0.36,2.5h-4.51c0.15-0.82,0.24-1.65,0.24-2.5C16.39,11.13,16.3,10.28,16.15,9.45z M20.29,8.45h-4.38 c-0.53-1.97-1.47-3.81-2.83-5.4C16.33,3.45,19.04,5.56,20.29,8.45z M10.92,3.05c-1.35,1.59-2.3,3.43-2.83,5.4H3.71 C4.95,5.55,7.67,3.44,10.92,3.05z M3.35,9.45h4.5C7.7,10.28,7.61,11.13,7.61,12c0,0.85,0.09,1.68,0.24,2.5H3.34 c-0.23-0.79-0.36-1.63-0.36-2.5C2.98,11.11,3.11,10.26,3.35,9.45z M3.69,15.5h4.39c0.52,1.99,1.48,3.85,2.84,5.45 C7.65,20.56,4.92,18.42,3.69,15.5z M13.09,20.95c1.36-1.6,2.32-3.46,2.84-5.45h4.39C19.08,18.42,16.35,20.55,13.09,20.95z" stroke="white"></path></g></svg>';
    // https://www.youtube.com
    translatorIcon.classList.add('multilingual-btn');

    let languages = [
        {
            name: 'English',
            title: 'English',
            backend: 'en'
        },
        {
            name: 'العربية',
            title: 'Arabic',
            backend: 'ar'
        },
        {
            name: 'Deutsch',
            title: 'German',
            backend: 'de'
        },
        {
            name: 'Español',
            title: 'Spanish',
            backend: 'es'
        },
        {
            name: 'Español (Latinoamérica)',
            title: 'Spanish (Latin American)',
            backend: 'es-419'
        },
        {
            name: 'Français',
            title: 'French',
            backend: 'fr'
        },
        {
            name: 'Italiano',
            title: 'Italian',
            backend: 'it'
        },
        {
            name: '日本',
            title: 'Japanese',
            backend: 'ja'
        },
        {
            name: '한국인',
            title: 'Korean',
            backend: 'ko'
        },
        {
            name: 'Polski',
            title: 'Polish',
            backend: 'pl'
        },
        {
            name: 'Português (Brasil)',
            title: 'Portuguese (Brazilian)',
            backend: 'pt-BR'
        },
        {
            name: 'Русский',
            title: 'Russian',
            backend: 'ru'
        },
        {
            name: 'Türkçe',
            title: 'Turkish',
            backend: 'tr'
        },
        {
            name: '中國人 (简化的) (弃用)',
            title: 'Chinese (Simplified) (Deprecated)',
            backend: 'zh-CN'
        },
        {
            name: '中国人 (傳統的) (棄用)',
            title: 'Chinese (Traditional) (Deprecated)',
            backend: 'zh-Hant'
        }
    ];
    window.uiLangList = languages;

    let langs = gne('div');
    langs.classList.add('nav-item');

    translatorIcon.addEventListener('click', function() {
        langs.classList.toggle('toggled');
    });

    langs.append(translatorIcon);

    let langList = document.createElement('ul');
    langList.classList.add('nav-dropdown-menu', 'right-dmenu', 'language-dropdown');

    langs.append(langList);

    for (let language of languages) {
        let item_context = document.createElement('li');
        item_context.classList.add('dropdown-item');

        langList.appendChild(item_context);

        let context = document.createElement('a');
        context.innerHTML = language.name;
        context.title = language.title;
        context.setAttribute('backend-value', language.backend);
        context.classList.add('link-underline', 'pointer');

        if (localStorage.requestLanguage == language.backend) {
            context.style.textDecoration = 'underline';
            context.style.color = 'var(--season-accent-1)'
        }

        context.addEventListener('click', function() {
            switchLanguage(context.getAttribute('backend-value'));
        });
        
        item_context.appendChild(context);
    }

    document.getElementsByClassName('item-search-container')[0].append(langs);
}

function doSearch() {
    var searchQuery = document.getElementById('search-input').value;

    if (searchQuery === '' || searchQuery === null) {
        return;
    }

    openItem(searchQuery);
}

function openItem(q) {
    console.log('Browsing item: ' + q);
    window.location.href = 'item.html?q=' + q;
}

function openItemByID(id) {
    console.log('Browsing item (by ID): ' + id);
    window.location.href = 'item.html?id=' + id;
}

function getItemLink(q) {
    return 'item.html?q=' + q;
}

function getItemLinkByID(id) {
    return 'item.html?id=' + id;
}

function secsToDays(secs) {
    return Math.ceil(secs / (1000 * 3600 * 24));
}

function sameDay(a, b) {
    return a.getDay() === b.getDay() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

function sameDayUTC(day, now) {
    var theday = [ day.getUTCDate(),
        day.getUTCMonth(),
        day.getUTCFullYear() ];
    var today = [ now.getUTCDate(),
        now.getUTCMonth(),
        now.getUTCFullYear() ];

    return theday[0] == today[0] &&
    theday[1] == today[1] &&
    theday[2] == today[2];
}


function getFormatDate(date) {
    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    return weekDays[date.getUTCDay()] + ', ' + months[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear();
}

function dateNow() {
    document.getElementById('date').innerHTML = getFormatDate(new Date());
}

function marqueeCheck(obj) {
    let text = obj.textContent;

    let fullUppercase = text.toUpperCase() == text;

    if (obj.textContent.length >= 20 && !fullUppercase) {
        obj.classList.add('marquee');
    } else if (obj.textContent.length >= 15 && fullUppercase) {
        obj.classList.add('marquee');
    }
}

function iS() {
    var section = document.getElementById("shop-section-dropdown").value;

    var shop_row = document.getElementById("item-shop-section");
    clearChildren(shop_row);

    var sectionItems = [];
    for (let item of shopItems) {
        if (item.section.name == section) sectionItems.push(item);
    }

    for (let i=0; i<sectionItems.length;i++) {
        let item = sectionItems[i];

        makeCard(item);
    }
}

function payloadTriggered() {
    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = 'css/payload.css';
    document.head.append(styleSheet);
}

function christmasPayload(christmas) {
    let delay = christmas ? 300 : 600;
    setInterval(function() {
        // Imported from local education website. Undisclosed.
        const snow = document.createElement("div");
        snow.innerHTML = "<img src='assets/images/snowflake.svg'>";
        snow.classList.add("snow");
        snow.style.left = Math.random() * 100 + "vw";
        snow.style.animationDuration = Math.random() * 5 + 8 + "s";
        document.body.appendChild(snow);
        setTimeout(() => { snow.remove(); }, 7000);
    }, delay);
}

function newYearPayloads() {
    setInterval(function() {
        for(let o in [0,1,2]) {
            const firework = document.createElement("div");
            firework.innerHTML = "<img src='assets/images/firework.png'>";
            firework.classList.add("firework");
            firework.style.left = Math.random() * 100 + "vw";
            firework.style.top = Math.random() * 50 + "vh";
            document.getElementsByClassName('fn-dot-mask')[0].append(firework);
            setTimeout(() => {
                firework.remove();
            }, 1000);
        }
    }, 500);
}

loadPayloads();
function loadPayloads() {
    var now = new Date();
    var anyPayloadTriggered = false;

    // 1st payload: Christmas and new years eve

    let distances = [0, 0];
    var lastYear = new Date(now.getFullYear() - 1, 11, 31);
    var thisYear = new Date(now.getFullYear(), 11, 31);
    distances[0] =  Math.floor(calcDays(now.getTime() - lastYear.getTime()))
    distances[1] = Math.abs(Math.floor(calcDays(now.getTime() - thisYear.getTime())))
    
    if (distances[0] <= 10 || distances[1] <= 10) {
        const christmas = sameDay(now, new Date(now.getFullYear(), 12, 25))
        christmasPayload(christmas);
        anyPayloadTriggered = true;
    }

    // 2nd payload: new years

    if (sameDay(now, new Date(now.getFullYear(), 11, 31))) {
        newYearPayloads();
        anyPayloadTriggered = true;
    }

    if (anyPayloadTriggered) {
        payloadTriggered();
    }
}