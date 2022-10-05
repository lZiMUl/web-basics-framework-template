const {
  info,
  error
} = console;

window.addEventListener('load', () => {

  document.getElementById('login').addEventListener('click', async () => {
    const [
      username, 
      password
    ] = [
      document.getElementById('username').value, 
      document.getElementById('password').value
    ];

    const url = new URL('https://localhost:8080/');
    const header = new Headers({
      username,
      password
    });
    const request = new Request(url, {
      method: 'get',
      path: '/doc',
      header
    });
    
    try {
      let value = await fetch(request);
      value = value.json();
      info(value);
      const $demo = new demo(value);
      $demo.addListener(data => {

      });
    } catch (err) {
      error(new Error(err))
    }
  })
})

class demo {
  constructor(config) {
    this.$config = config;
  }

  addListener(callback) {
    
  }
}

