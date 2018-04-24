var express= require('express'),
    app= express(),
    port= 3000 || env.process.PORT,
    http=require('http'),
    server= http.createServer(app),
    io= require('socket.io')(server);
server.listen(port,'192.168.0.102',function(){
  console.log('On server');
});
app.use(express.static('publics'));
app.set('view engine','ejs');
app.set('views','./views');
io.sockets.on('connection',function(socket){
  ids=socket.id;
  console.log('On Socket',ids);
  socket.emit('hello',{id: socket.id});
  socket.on('den', function (data) {
    console.log(data);
    if (data.data == '1') io.sockets.emit('change',{data: '1'});
    if (data.data == '0') io.sockets.emit('change',{data: '0'});
  });
});
app.get("/check", function (req,res) {
  res.send("hello Tung");
});
app.get("/", function (req,res) {
  res.render("socket");
});
