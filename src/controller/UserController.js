import crypto from "crypto";
import { UserModel } from "../model/UserModel.js";
import bcrypt from "bcrypt";

export class UserController {
  async index(request, response) {
    try {
      const users = await UserModel.find().lean();
      return response.json({ users });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async store(request, response) {
    const { body } = request;

    const passwordHashed = await bcrypt.hash(body.password, 10);

    try {
      const user = await UserModel.create({
        ...body,
        password: passwordHashed,
      });

      response.status(201).json({ user });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { body } = request;

    try {
      const passwordHashed = await bcrypt.hash(body.password, 10);

      const user = await UserModel.findByIdAndUpdate(
        id,
        {
          ...body,
          password: passwordHashed,
        },
        { new: true, runValidators: true }
      );

      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      return response.json({ user });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async remove(request, response) {
    const { id } = request.params;

    try {
      const user = await UserModel.findById(id);

      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      await user.remove();

      return response.json({ removed: user });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async getOne(request, response) {
    const { id } = request.params;

    try {
      const user = await UserModel.findById(id);

      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      return response.json({ user });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
