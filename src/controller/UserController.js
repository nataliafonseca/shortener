import crypto from "crypto";
import { UserModel } from "../model/UserModel.js";
import bcrypt from "bcrypt";
import { AppError } from "../errors/AppError.js";
import jwt from "jsonwebtoken";

export class UserController {
  async index(request, response) {
    const users = await UserModel.find().lean();
    return response.json({ users });
  }

  async store(request, response) {
    const { name, email, password, phones } = request.body;

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      throw new AppError("An user with this email already exists.");
    }

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
    const { name, email, password, phones, role } = request.body;
    const loggedUser = request.user._id;

    const passwordHashed = await bcrypt.hash(password, 10);

    const user = await UserModel.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (!loggedUser.equals(user._id)) {
      throw new AppError("Authentication error", 401);
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.phones = phones || user.phones;
    user.password = passwordHashed || user.password;

    await user.save();

    return response.json({ user });
  }

  async remove(request, response) {
    const { id } = request.params;
    const loggedUser = request.user._id;

    const user = await UserModel.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (!loggedUser.equals(user._id)) {
      throw new AppError("Authentication error", 401);
    }

    await user.remove();

    return response.json({ removed: user });
  }

  async getOne(request, response) {
    const { id } = request.params;
    const loggedUser = request.user._id;

    const user = await UserModel.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (!loggedUser.equals(user._id)) {
      throw new AppError("Authentication error", 401);
    }

    return response.json({ user });
  }

  async login(request, response) {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new AppError("Invalid email/password combination.", 401);
    }

    const passwordChecksOut = await bcrypt.compare(password, user.password);

    if (!passwordChecksOut) {
      throw new AppError("Invalid email/password combination.", 401);
    }

    const token = jwt.sign({ id: user.id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "1d",
    });
    console.log(token);

    return response.json({ user, token });
  }
}
