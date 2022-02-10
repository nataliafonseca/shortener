import crypto from "crypto";
import { ShortenerModel } from "../model/ShortenerModel.js";

export class ShortenerController {
  async index(request, response) {
    try {
      const shorteners = await ShortenerModel.find().lean();
      return response.json({ shorteners });
    } catch (error) {
      return response.status(400).json({ message: "Unexpected Error " });
    }
  }

  async store(request, response) {
    const { link, name, expiredDate } = request.body;
    const [hash] = crypto.randomUUID().split("-");

    try {
      const shortener = await ShortenerModel.create({
        hash,
        link,
        name,
        expiredDate,
      });

      response.status(201).json({ shortener });
    } catch (error) {
      return response.status(400).json({ message: "Unexpected Error " });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { link, name, expiredDate } = request.body;

    try {
      const shortener = await ShortenerModel.findByIdAndUpdate(
        id,
        {
          link,
          name,
          expiredDate,
        },
        { new: true }
      );

      if (!shortener) {
        return response.status(404).json({ message: "Shortener not found" });
      }

      return response.json({ shortener });
    } catch (error) {
      return response.status(400).json({ message: "Unexpected Error " });
    }
  }

  async remove(request, response) {
    const { id } = request.params;

    try {
      const shortener = await ShortenerModel.findById(id);

      if (!shortener) {
        return response.status(404).json({ message: "Shortener not found" });
      }

      await shortener.remove();

      return response.json({ removed: shortener });
    } catch (error) {
      return response.status(400).json({ message: "Unexpected Error " });
    }
  }

  async getOne(request, response) {
    const { id } = request.params;

    try {
      const shortener = await ShortenerModel.findById(id);

      if (!shortener) {
        return response.status(404).json({ message: "Shortener not found" });
      }

      return response.json({ shortener });
    } catch (error) {
      return response.status(400).json({ message: "Unexpected Error " });
    }
  }

  async redirect(request, response) {
    const { hash } = request.params;

    const metadata = {
      ip: request.ip,
      language: request.headers["accept-language"],
      userAgent: request.headers["user-agent"],
    };

    try {
      const shortener = await ShortenerModel.findOne({ hash });

      if (!shortener) {
        return response.status(404).json({ message: "Shortener not found" });
      }

      if (shortener.expired) {
        return response.json({ message: "Link expired" });
      }

      shortener.hits++;
      shortener.metadata.push(metadata);

      await shortener.save();

      return response.status(301).redirect(shortener.link);
    } catch (error) {
      return response.status(400).json({ message: "Unexpected Error " });
    }
  }
}
