import { Router } from "express";
import { ShortenerController } from "../controller/ShortenerController.js";

export const router = Router();

const controller = new ShortenerController();

router.get("/:hash", controller.redirect);
router.get("/api/shortener/", controller.index);
router.get("/api/shortener/:id", controller.getOne);
router.post("/api/shortener/", controller.store);
router.put("/api/shortener/:id", controller.update);
router.delete("/api/shortener/:id", controller.remove);
