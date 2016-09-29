
//1
// console.log(process.argv);

//2
// var result = 0;
// for (var i = 2; i < process.argv.length; i++) {
//   result += Number(process.argv[i]);
// }
//
// console.log(result);

//3
//编写一个程序，执行一个异步的对文件系统的操作：读取一个文件，并且在终端（标
//准输出 stdout）打印出这个文件中的内容的行数。类似于执行 cat file | wc -l
//这个命令。
// var fs = require('fs');
// var contents = fs.readFileSync(process.argv[2]);
// //供测试的文件末尾的最后一行并没有进行换行，即没有
// //  '\n' 的存在，因此，使用这个方法的话，所得的数组的长度会比行数多一个。
// var lines = contents.toString().split('\n').length - 1;
// console.log(lines);
// 只要把 'utf8' 作为 readFileSync 的第二个参数传入
// 就可以不用 .toString() 来得到一个字符串
//
// fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1

//4
//异步
// var fs = require('fs');
// var file = process.argv[2];
// fs.readFile(file, function(err, contents) {
//   //also can use fs.readFile(file, 'utf8', callback)
//   var lines = contents.toString().split('\n').length - 1;
//   console.log(lines);
// })

//5
//编写一个程序来打印出指定目录下的文件列表，并且以特定的文件名扩展名来过滤这
//个列表。这次会有两个参数提供给你，第一个是所给的文件目录路径（如：path/to/
//dir），第二个参数则是需要过滤出来的文件的扩展名。
// var fs = require('fs');
// var path = require('path');
// var folder = process.argv[2];
// var ext = '.' + process.argv[3];
// fs.readdir(folder, function(err, files) {
//   if(err) return console.error(err);
//   files.forEach(function(file) {
//     if (path.extname(file) === ext) {
//       console.log(file);
//     }
//   })
// })

//6
//模块
//» 导出一个函数，这个函数能准确接收上述的参数。
//» 当有错误发生，或者有数据的时候，准确调用回调函数。
//» 不要改变其他的任何东西，比如全局变量或者 stdout。
//» 处理所有可能发生的错误，并把它们传递给回调函数。
// var filterFn = require('./program_filter.js');
// var dir = process.argv[2];
// var filterStr = process.argv[3];
//
// filterFn(dir, filterStr, function (err, list) {
//   if (err)
//     return console.error('There was an error:', err);
//
//   list.forEach(function (file) {
//     console.log(file);
//   })
// })

//7
//编写一个程序来发起一个 HTTP GET 请求，所请求的 URL
//为命令行参数的第一个。然后将每一个 "data"
//事件所得的数据，以字符串形式在终端（标准输出 stdout）的新的一行打印出来。
// var http = require('http');
//
// http.get(process.argv[2], function(response) {
//   response.setEncoding('utf8');
//   response.on('data', console.log);
//   response.on('error', console.error);
// }).on('error', console.error);

//8.
//编写一个程序，发起一个 HTTP GET 请求，请求的 URL
//为所提供给你的命令行参数的第一个。收集所有服务器所返回的数据（不仅仅包括
//"data" 事件）然后在终端（标准输出 stdout）用两行打印出来。
//你所打印的内容，第一行应该是一个整数，用来表示你所收到的字符串内容长度，第
//二行则是服务器返回给你的完整的字符串结果。
// var http = require('http');
// var bl = require('bl');
//
// http.get(process.argv[2], function(response) {
//   response.pipe(bl(function (err, data) {
//     if (err)
//       return console.error(err);
//     data = data.toString();
//     console.log(data.length);
//     console.log(data);
//   }))
// })

//9
//这次的问题和之前的问题（HTTP 收集器）很像，也是需要使用到 http.get()方法。
//然而，这一次，将有三个 URL 作为前三个命令行参数提供给你。
//你需要收集每一个 URL 所返回的完整内容，然后将它们在终端（标准输出stdout）打印出来。
//这次你不需要打印出这些内容的长度，仅仅是内容本身即可（字符串形式）；
//每个 URL 对应的内容为一行。重点是你必须按照这些 URL在参数列表中的顺序将相应的内容排列打印出来才算完成。
// var http = require('http');
// var bl = require('bl');
// var results = [];
// var count = 0;
//
// function printResults () {
//   for (var i = 0; i < 3; i++)
//     console.log(results[i]);
// }
//
// function httpGet (index) {
//   http.get(process.argv[2 + index], function (response) {
//     response.pipe(bl(function (err, data) {
//       if(err)
//         return console.error(err);
//
//       results[index] = data.toString();
//       count++;
//
//       if(count == 3)
//         printResults()
//     }));
//   });
// }
//
// for (var i = 0 ; i < 3; i++)
//   httpGet(i);

//10
// 编写一个 TCP 时间服务器
//你的服务器应当监听一个端口，以获取一些 TCP 连接，
//这个端口会经由第一个命令行参数传递给你的程序。
//针对每一个 TCP  连接，你都必须写入当前的日期和24小时制的时间，如下格式：
//   "YYYY-MM-DD hh:mm"
//然后紧接着是一个换行符。月份、日、小时和分钟必须用零填充成为固定的两位数：
//   "2013-07-06 17:42"
// var net = require('net');
// function zeroFill(i) {
//   return (i < 10 ? '0' : '') + i;
// }
// function now () {
//   var d = new Date();
//   return d.getFullYear() + '-'
//     + zeroFill(d.getMonth() + 1) + '-'
//     + zeroFill(d.getDate()) + ' '
//     + zeroFill(d.getHours()) + ':'
//     + zeroFill(d.getMinutes());
// }
// var server = net.createServer(function (socket) {
//   socket.end(now() + '\n');
// })
// server.listen(Number(process.argv[2]));

//11
//编写一个 HTTP 文件 服务器，它用于将每次所请求的文件返回给客户端。
//你的服务器需要监听所提供给你的第一个命令行参数所制定的端口。
//同时，第二个会提供给你的程序的参数则是所需要响应的文本文件的位置。
//在这一题中，你必须使用 fs.createReadStream() 方法以 stream 的形式作出请求相应。
// var http = require('http');
// var fs = require('fs');
// var server = http.createServer(function (req, res) {
//   res.writeHead(200, { 'content-type': 'text/plain'});
//   fs.createReadStream(process.argv[3]).pipe(res);
// })
// server.listen(Number(process.argv[2]));

//12
//编写一个 HTTP 服务器，它只接受 POST 形式的请求，并且将 POST
//请求主体（body）所带的字符转换成大写形式，然后返回给客户端。
//你的服务器需要监听由第一个命令行参数所指定的端口。
// var http = require('http');
// var map = require('through2-map');
// var server = http.createServer(function (req, res) {
//   if(req.method !== 'POST')
//     return res.end('send me a POST\n')
//
//   req.pipe(map(function (chunk) {
//     return chunk.toString().toUpperCase();
//   })).pipe(res);
// })
// server.listen(Number(process.argv[2]));

//13.
//编写一个 HTTP 服务器，每当接收到一个路径为 '/api/parsetime' 的 GET
//请求的时候，响应一些 JSON 数据。我们期望请求会包含一个查询参数（query
//string），key 是 "iso"，值是 ISO 格式的时间。
var http = require('http');
var url = require('url');
function parsetime(time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}
function unixtime(time) {
  return { unixtime : time.getTime() }
}
var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true)
  var time = new Date(parsedUrl.query.iso)
  var result

  if (/^\/api\/parsetime/.test(req.url))
    result = parsetime(time)
  else if (/^\/api\/unixtime/.test(req.url))
    result = unixtime(time)

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(process.argv[2]))












//
