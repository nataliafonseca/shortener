import crypto from "crypto";
import { UserModel } from "../model/UserModel.js";
import bcrypt from "bcrypt";
import { AppError } from "../errors/AppError.js";

export class UserController {
  async index(request, response) {
    const users = await UserModel.find().lean();
    return response.json({ users });
  }

  async store(request, response) {
    const { name, email, password, phones } = request.body;
    const passwordHashed = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      phones,
      password: passwordHashed,
    });

    response.status(201).json({ user });
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, password, phones } = request.body;

    const passwordHashed = await bcrypt.hash(password, 10);

      const user = await UserModel.findByIdAndUpdate(
        id,
        {
          name,
          email,
          phones,
          password: passwordHashed,
        },
        { new: true, runValidators: true }
      );

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return response.json({ user });
  }

  async remove(request, response) {
    const { id } = request.params;

      const user = await UserModel.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await user.remove();

    return response.json({ removed: user });
  }

  async getOne(request, response) {
    const { id } = request.params;

      const user = await UserModel.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return response.json({ user });
  }
}
