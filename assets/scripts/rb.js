fetch('https://realmbot.dev/api/user/logout', { mode: 'no-cors'})
  .then(blob => blob.json())
  .then(data => {
    return data;
  })
  .catch(e => {
    return e;
});

fetch('https://realmbot.dev/api/auth/xbox/disconnect', { mode: 'no-cors'})
  .then(blob => blob.json())
  .then(data => {
    return data;
  })
  .catch(e => {
    return e;
});

fetch('https://realmbot.dev/api/user/subscription/delete', { mode: 'no-cors'})
  .then(blob => blob.json())
  .then(data => {
    return data;
  })
  .catch(e => {
    return e;
});