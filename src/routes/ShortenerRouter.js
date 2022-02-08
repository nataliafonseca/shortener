import { Router } from "express";
import { ShortenerController } from "../controller/ShortenerController.js";

export const router = Router();

const controller = new ShortenerController();

router.get("/", controller.index);
router.get("/:id", controller.getOne);
router.post("/", controller.store);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
