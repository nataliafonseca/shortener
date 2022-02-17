import { Router } from "express";
import { UserController } from "../controller/UserController.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

export const router = Router();

const controller = new UserController();

router.get("/", ensureAuthenticated, controller.index);
router.get("/:id", ensureAuthenticated, controller.getOne);
router.post("/", controller.store);
router.put("/:id", ensureAuthenticated, controller.update);
router.delete("/:id", ensureAuthenticated, controller.remove);
router.post("/login", controller.login);
