const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth.middleware");
const config = require("config");
const shortid = require("shortid");

const Link = require("../models/Link");

router.post("/generate", auth, async (request, response) => {
  try {
    const baseUrl = config.get("baseUrl");

    // с фронта получаем поле from - путь откуда мы делаем ссылку
    const { from } = request.body;

    // генерируем уникальный ключ - короткая ссылка
    const code = shortid.generate();

    const existing = await Link.findOne({ from });

    // если такая ссылка есть мы ее возвращаем чтобы не делать новую
    if (existing) {
      return response.json({ link: existing });
    }

    // формируем сокращенную ссылку
    const to = baseUrl + "/t/" + code;

    // создаем новую ссылку в базе и сохраняем ее
    const link = new Link({
      code,
      to,
      from,
      owner: request.user.userId,
    });

    await link.save();

    // 201 статус - Created
    response.status(201).json({ link });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Что-то пошло не так, попробуйте снова", error });
  }
});

router.get("/", auth, async (request, response) => {
  try {
    // делаем запрос в базу где ищем все ссылки которые относятся к текущему пользователю - owner
    const links = await Link.find({ owner: request.user.userId });

    response.json({ links });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (request, response) => {
  try {
    const link = await Link.findById(request.params.id);

    response.json(link);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
