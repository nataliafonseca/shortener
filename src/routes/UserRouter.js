import { Router } from "express";
import { UserController } from "../controller/UserController.js";

export const router = Router();

const controller = new UserController();

router.get("/", controller.index);
router.get("/:id", controller.getOne);
router.post("/", controller.store);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
