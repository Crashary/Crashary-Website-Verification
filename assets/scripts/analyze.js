
var nqoybpxnanylgvpfpbz;

if (document.getElementById('nqoybpxnanylgvpfpbz')) {
    nqoybpxnanylgvpfpbz = 0;
} else {
    nqoybpxnanylgvpfpbz = 1;
}

var r = new XMLHttpRequest();
r.open('POST', 'https://www.adblockanalytics.com/analyze/');
r.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

if (typeof abaI !== 'undefined') {
    r.send('NqDATLQkJts=' + abaI + '|' + nqoybpxnanylgvpfpbz);
} else if (typeof inqoybpxnanylgvpfpbz !== 'undefined') {
    r.send('NqDATLQkJts=' + inqoybpxnanylgvpfpbz + '|' + nqoybpxnanylgvpfpbz);
} else {
    r.send('NqDATLQkJts=' + id + '|' + nqoybpxnanylgvpfpbz);
}

r.onreadystatechange = function () {
    if (r.readyState == 4 && r.status == 200) {

        if (nqoybpxnanylgvpfpbz == 0) {
            nqoybpxnanylgvpfpbz = 'No';
        } else {
            nqoybpxnanylgvpfpbz = 'Yes';
        }

        if (r.responseText.indexOf("intGaDimension") > -1) {
            if (typeof ga !== 'undefined') {
                ga('set', 'Blocking Ads', nqoybpxnanylgvpfpbz);
            }
        }

        if (r.responseText.indexOf("intGaEvent") > -1) {
            if (typeof ga !== 'undefined') {
                ga('send', 'event', 'Blocking Ads', nqoybpxnanylgvpfpbz, { 'nonInteraction': 1 });
            } else if (typeof _gaq !== 'undefined') {
                _gaq.push(['_trackEvent', 'Blocking Ads', nqoybpxnanylgvpfpbz, undefined, undefined, true]);
            }
        }

        if (r.responseText.indexOf("inactive") > -1) {
            var e = document.createElement('div');
            e.id = 'NqDATLQkJtsInactive';
            e.style.cssText = 'font-size: 14px; padding: 15px 0; text-align: center;';
            e.innerHTML = 'Usage of <a href="https://www.adblockanalytics.com/" target="_blank">Adblock Analytics</a> has expired.';
            document.body.appendChild(e);
        }
    }
}