const fs = require("fs");
const fetch = require("node-fetch");

function buscarExistencia(...nodesPath) {
  nodesPath = nodesPath.filter((e) => e);
  let last = nodesPath.pop() ?? "index";
  let folders = ["views", "public"];
  let extensiones = ["", ".ejs", ".html"];
  for (const folder of folders) {
    for (const ext of extensiones) {
      {
        let test = `${nodesPath.join("/")}/${last}` + ext;
        test = test.replaceAll("//", "/")
        if (test.startsWith("/")) {
          test = test.substr(1);
        }
        if (fs.existsSync(folder + "/" +test)) {
          let stat = fs.statSync(folder + "/" +test);
          if (stat.isFile()) {
            return {
              fullpath: test,
              ext,
              path: nodesPath.join("/"),
              name: last,
            };
          }
        }
      }
      {
        let test = `${nodesPath.join("/")}/${last}/index` + ext;
        test = test.replaceAll("//", "/")
        if (test.startsWith("/")) {
          test = test.substr(1);
        }
        if (fs.existsSync(folder + "/" +test)) {
          let stat = fs.statSync(folder + "/" +test);
          if (stat.isFile()) {
            return {
              fullpath: test,
              ext,
              path: nodesPath.join("/") + "/" + last,
              name: "index",
            };
          }
        }
      }
    }
  }
}

let mapa = {
  "/": buscarRuta,
};

let nodos = [];
for (let i = 1; i < 10; i++) {
  nodos.push(`node${i}`);
  mapa[`/:${nodos.join("/:")}`] = buscarRuta;
}

function buscarRuta(req, res, next) {
  let folders = [];
  for (let i = 1; i < 10; i++) {
    folders.push(req.params[`node${i}`]);
  }
  let view = folders.pop();
  let args = buscarExistencia(...folders, view);
  if (!args) {
    return res.render("404");
  }
  if (args.ext == ".ejs") {
    res.render(args.fullpath, args);
  } else {
    res.sendFile(args.fullpath);
  }
}

module.exports = function (app_pack) {
  let {
    app,
    // passport
  } = app_pack;
  //renderiza el get de la ruta
  // app.get('/logout', function (req, res) {
  //   req.session.destroy(function (err) {
  //     res.redirect('/');
  //   });
  // });
  for (const key in mapa) {
    app.get(key, mapa[key]);
  }
  // app.post("/login", passport.authenticate("local", {
  //   successRedirect: "/home",
  //   failureRedirect: "/auth/login",
  // }));
};
