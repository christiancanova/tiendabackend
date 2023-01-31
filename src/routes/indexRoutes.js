import { Router } from "express";
import { fork } from "child_process";
const router = Router();

const info = {
  "Node version": process.version,
  Platform: process.platform,
  "Directorio de ejecución": process.cwd(),
  "ID del proceso": process.pid,
  "Uso de la memoria": process.memoryUsage(),
  "Memoria total reservada (rss)": process.memoryUsage().rss,
  "path de ejecución": process.execPath, //donde está el ejecutable de node
  "Argumentos de entrada": process.argv,
};
router.get("/infos", (req, res) => {
  res.send(info);
});

router.get("/api/randoms", (req, res) => {
  //http://localhost:3000/api/randoms?cant=1000
  const cant = req.query.cant || 100000000;
  const child = fork("./src/getRandom.js");
  child.send(cant);
  child.on("message", (msg) => {
    res.send(msg);
  });

  child.on("exit", (code) => {
    console.log("Se ha cerrado el proceso", code);
  });
});

export default router;