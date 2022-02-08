import { ShortenerModel } from "../model/ShortenerModel.js";

export class ShortenerController {
  async index(request, response) {
    const shorteners = await ShortenerModel.find().lean();
    return response.json({ shorteners });
  }

  async store(request, response) {
    const body = request.body;
    const shortener = await ShortenerModel.create(body);

    response.status(201).json({ shortener });
  }

  async update(request, response) {}

  async remove(request, response) {}

  async getOne(request, response) {}
}
