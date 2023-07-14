let detected;
let detected2;
let detected3;
let detected4;
let detected5;
let detected6;
let detected7;
let detected8;
let detected9;
let detected10;

detectAdBlock(detected);
console.log('Ad Blocker Detection - Starting 1/10 Ad Block Detections');
detectAdBlock2(detected2);
console.log('Ad Blocker Detection - Starting 2/10 Ad Block Detections');
detectAdBlock3(detected3);
console.log('Ad Blocker Detection - Starting 3/10 Ad Block Detections');
detectAdBlock4(detected4);
console.log('Ad Blocker Detection - Starting 4/10 Ad Block Detections');
detectAdBlock5(detected5);
console.log('Ad Blocker Detection - Starting 5/10 Ad Block Detections');
detectAdBlock6(detected6);
console.log('Ad Blocker Detection - Starting 6/10 Ad Block Detections');
detectAdBlock7(detected7);
console.log('Ad Blocker Detection - Starting 7/10 Ad Block Detections');
detectAdBlock8(detected8);
console.log('Ad Blocker Detection - Starting 8/10 Ad Block Detections');
detectAdBlock9(detected9);
console.log('Ad Blocker Detection - Starting 9/10 Ad Block Detections');
detectAdBlock10(detected10);
console.log('Ad Blocker Detection - Starting 10/10 Ad Block Detections');
setTimeout(check, 10000);
console.log('Ad Blocker Detection - Running Ad Blocker Detection Check to see successful blocks/loading ads.');

function detectAdBlock(detected) {
    fetch('https://pagead2.googlesyndication.com/pagead/show_ads.js', {
        method: 'HEAD',
        mode: 'no-cors',
    }).catch(() => {
        detected = true;
        console.log('Ad Blocker Detection - Failed task.');
        if (detected === true) adBlocked();
    })
}

function detectAdBlock2(detected2) {
    fetch('https://ads.youtube.com', {
        method: 'HEAD',
        mode: 'no-cors',
    }).catch(() => {
        detected2 = true;
        console.log('Ad Blocker Detection - Failed task.');
        if (detected2 === true) adBlocked();
    })
}

function detectAdBlock3(detected3) {
    fetch("https://c.amazon-adsystem.com/aax2/apstag.js", {
        "method": "GET",
        "mode": "no-cors",
    }).catch(() => {
        detected3 = true;
        console.log('Ad Blocker Detection - Failed task.');
        if (detected3 === true) adBlocked();
    })
}

function detectAdBlock4(detected4) {
    fetch("https://ad-delivery.net/px.gif?ch=2", {
        "method": "GET",
        "mode": "cors",
    }).catch(() => {
        detected4 = true;
        console.log('Ad Blocker Detection - Failed task.');
        if (detected4 === true) adBlocked();
    })
}

function detectAdBlock5(detected5) {
    fetch("https://ad.doubleclick.net/favicon.ico?ad=300x250&ad_box_=1&adnet=1&showad=1&size=250x250", {
        "method": "GET",
        "mode": "cors",
    }).catch(() => {
        detected5 = true;
        console.log('Ad Blocker Detection - Failed task.');
        if (detected5 === true) adBlocked();
    })
}

function detectAdBlock6(detected6) {
    fetch("https://static.ads-twitter.com/oct.js", {
        "method": "GET",
        "mode": "no-cors",
    }).catch(() => {
        detected6 = true;
        console.log('Ad Blocker Detection - Failed task.');
        if (detected6 === true) adBlocked();
    })
}

function detectAdBlock7(detected7) {
    fetch("https://advertising.apple.com", {
        "method": "GET",
        "mode": "no-cors",
    }).catch(() => {
        detected7 = true;
        console.log('Ad Blocker Detection - Failed task.');
        if (detected7 === true) adBlocked();
    })
}

function detectAdBlock8(detected8) {
    fetch("https://ads-sg.tiktok.com", {
        "method": "GET",
        "mode": "no-cors",
    }).catch(() => {
        detected8 = true;
        console.log('Ad Blocker Detection - Failed task.');
        if (detected8 === true) adBlocked();
    })
}

function detectAdBlock9(detected9) {
    fetch("https://www.imdb.com/ads/idsync?cid=a706a6beb&ex=imdb.com", {
        "method": "GET",
        "mode": "no-cors",
    }).catch(() => {
        detected9 = true;
        console.log('Ad Blocker Detection - Failed task.');
        if (detected9 === true) adBlocked();
    })
}

function detectAdBlock10(detected10) {
    fetch("https://ads.tiktok.com", {
        "method": "GET",
        "mode": "no-cors",
    }).catch(() => {
        detected10 = true;
        console.log('Ad Blocker Detection - Failed task.');
        if (detected10 === true) adBlocked();
    })
}

function adBlocked() {
    console.log('Ad Blocker Detection - Ad was blocked')
    var adB = false;
    setTimeout(check, 1000);
}

function check() {
    if (!adB) {
        swal("Ad Blocker Detected", "Please turn off the Ad Blocker when using our site.", "error", {
            buttons: {
                catch: {
                    text: "Refresh",
                    value: "refresh",
                }
            },
        }).then((value) => {
            switch (value) {
                case null:
                    window.location.href = 'https://verification.crashary.uk'
                    break;

                case "refresh":
                    window.location.href = '';
                    break;
            }
        });
    }
    if (adB) {
        console.log('Ad Blocker Detection - Nothing got blocked!')
    }
}