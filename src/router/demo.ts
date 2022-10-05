import kr from 'koa-router';
import getView from 'src/tool/getView';

const Krs = new kr();

Krs.get('/demo', (socket) => {
  socket.status = 200;
  socket.type = 'text/html';
  socket.body = getView('demo')
});

export default Krs.routes();