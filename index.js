const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer((req, res) => {
    console.log("starting...");

    const params = url.parse(req.url, true).query;
    const name = params.archivo;
    const content = params.contenido;
    const newName = params.archivoNuevo;
    const delFile = params.archivoEliminar;

    if (req.url.includes("/crear")) {
      console.log("creando");
      fs.writeFile(name, content, "utf-8", () => {
        res.write("creado con exito");
        res.end();
      });
    }
    if (req.url.includes("/leer")) {
      fs.readFile(name, (err, data) => {
        if (!err) {
          res.write(`Contenido:\n${data}`);
        } else {
          res.write(err);
        }
        res.end();
      });
    }
    if (req.url.includes("/renombrar")) {
      console.log(newName);
      fs.rename(name, newName, (err, data) => {
        res.write(`Archivo ${name} renombrado por ${newName}`);
        res.end();
      });
    }
    if (req.url.includes("/eliminar")) {
      fs.unlink(delFile, (err, data) => {
        res.write(`Archivo ${nombre} eliminado con éxito`);
        res.end();
      });
    }
  })
  .listen(8080, () => {
    console.log("launched by port 8080");
  });
