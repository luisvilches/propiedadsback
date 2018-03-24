const router = require("express").Router();
const ctrl = require("../controllers");
const body = require("connect-multiparty")();

router.get("/",body, ctrl.main.main);
router.post("/create",body,ctrl.product.create);
router.post("/gallery/:id",body,ctrl.product.addGallery);
router.get("/filter/:page/:region/:comuna/:transa/:type",body,ctrl.product.filter);
router.get("/ficha/:code", body, ctrl.product.ficha);
router.get("/destacados",body,ctrl.product.destacados);
router.get("/adminall",body,ctrl.product.allData);
router.delete("/deleteGallery/:id",body,ctrl.product.deleteGallery);
router.delete("/delete/:id",body,ctrl.product.delete);
router.put("/update/:id",body,ctrl.product.update);

module.exports = router;