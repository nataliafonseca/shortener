import { Router } from "express";
import { ShortenerController } from "../controller/ShortenerController.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

export const router = Router();

const controller = new ShortenerController();

router.get("/:hash", controller.redirect);
router.get("/api/shortener/", ensureAuthenticated, controller.index);
router.get("/api/shortener/:id", ensureAuthenticated, controller.getOne);
router.post("/api/shortener/", ensureAuthenticated, controller.store);
router.put("/api/shortener/:id", ensureAuthenticated, controller.update);
router.delete("/api/shortener/:id", ensureAuthenticated, controller.remove);
