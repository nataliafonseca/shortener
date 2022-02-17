import crypto from "crypto";
import { AppError } from "../errors/AppError.js";
import { ShortenerModel } from "../model/ShortenerModel.js";

export class ShortenerController {
  async index(request, response) {
    const shorteners = await ShortenerModel.find({
      user: request.user._id,
    }).lean();
    return response.json({ shorteners });
  }

  async store(request, response) {
    const { link, name, expiredDate } = request.body;
    const [hash] = crypto.randomUUID().split("-");

    const shortener = await ShortenerModel.create({
      user: request.user._id,
      hash,
      link,
      name,
      expiredDate,
    });

    response.status(201).json({ shortener });
  }

  async update(request, response) {
    const { id } = request.params;
    const { link, name, expiredDate } = request.body;

    const shortener = await ShortenerModel.findByIdAndUpdate(
      id,
      {
        user: request.user._id,
        link,
        name,
        expiredDate,
      },
      { new: true }
    );

    if (!shortener) {
      throw new AppError("Shortener not found", 404);
    }

    return response.json({ shortener });
  }

  async remove(request, response) {
    const { id } = request.params;

    const shortener = await ShortenerModel.findById(id);

    if (!shortener) {
      throw new AppError("Shortener not found", 404);
    }

    await shortener.remove();

    return response.json({ removed: shortener });
  }

  async getOne(request, response) {
    const { id } = request.params;

    const shortener = await ShortenerModel.findById(id);

    if (!shortener) {
      throw new AppError("Shortener not found", 404);
    }

    return response.json({ shortener });
  }

  async redirect(request, response) {
    const { hash } = request.params;

    const metadata = {
      ip: request.ip,
      language: request.headers["accept-language"],
      userAgent: request.headers["user-agent"],
    };

    const shortener = await ShortenerModel.findOne({ hash });

    if (!shortener) {
      throw new AppError("Shortener not found", 404);
    }

    if (shortener.expired) {
      throw new AppError("Link expired");
    }

    shortener.hits++;
    shortener.metadata.push(metadata);

    await shortener.save();

    return response.status(301).redirect(shortener.link);
  }
}
