const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer((req, res) => {
    console.log("starting...");

    const params = url.parse(req.url, true).query;
    const name = params.archivo;
    let content = params.contenido;
   
    //console.log(JSON.stringify(params));

    if (req.url.includes("/crear")) {
      console.log("creando");
     
      const getDate=()=>{
        let date = new Date();
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
              return `${day}/${month}/${year}`;
      }
      
      content=`${getDate} \n ${content}`;
      fs.writeFile(name, content, "utf-8", (err,data) => {        
        if (err) {
          res.write("error al crear el archivo");
          res.end();
        }
        
        res.write("creado con exito");
        res.end();
      });
    }
    if (req.url.includes("/leer")) {
      fs.readFile(name, (err, data) => {
        if(err){
          res.write("error al leer rl archivo");     
          res.end();   
        }       
        else {
          res.write(err);
          res.end();
        }
      
      });
    }
    if (req.url.includes("/renombrar")) {
      const newName = params.nuevoNombre;
      const name = params.nombre;
      fs.rename(name, newName, (err, data) => {
        if(err){
          res.write("error al renombrar el archivo");     
          res.end();   
        }
        res.write(`Archivo ${name} renombrado por ${newName}`);
        res.end();
      });
    }
    if (req.url.includes("/eliminar")) {
      const delFile=params.archivo;
      fs.unlink(delFile, (err, data) => {
        if(err){
          res.write("error al eliminar el archivo");     
          res.end();   
        }
        res.write(`Archivo ${delFile} eliminado con éxito`);
        res.end();
      });
    }
  })
  .listen(8080, () => {
    console.log("launched by port 8080");
  });

