const esbuild = require('esbuild');
const fs = require("fs");
// const path = require("path");

// // Tạo thư mục dist nếu chưa có
if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}
if (!fs.existsSync("dist/assets")) {
  fs.mkdirSync("dist/assets");
}
if (!fs.existsSync("dist/lib")) {
  fs.mkdirSync("dist/lib");
}

// 👉 1) Copy index.html từ project → dist
let html = fs.readFileSync("index.html", "utf8");

let moment_locale = fs.readFileSync("./lib/moment-with-locales.min.js", "utf8");

let moment = fs.readFileSync("./lib/moment.min.js", "utf8");

// Nếu bạn build ra file với tên cố định
// html = html.replace("./assets/style.css", "./assets/style.css");
// html = html.replace("./assets/main.css", "./assets/main.css");
// html = html.replace("./scripts/main.js", "./main.js");

fs.writeFileSync("dist/index.html", html);
fs.writeFileSync("dist/lib/moment-with-locales.min.js", moment_locale);
fs.writeFileSync("dist/lib/moment.min.js", moment);


esbuild.build({
  entryPoints: ['./scripts/main.js'],
  bundle: true,
  minify: true,
  outfile: 'dist/scripts/main.js',
  loader: { '.js': 'js' },
  sourcemap: false,
}).catch(() => process.exit(1));

esbuild.build({
  entryPoints: ['./assets/style.css'],
  bundle: true,
  minify: true,
  outfile: 'dist/assets/style.css',
});

esbuild.build({
  entryPoints: ['./assets/main.css'],
  bundle: true,
  minify: true,
  outfile: 'dist/assets/main.css',
});
