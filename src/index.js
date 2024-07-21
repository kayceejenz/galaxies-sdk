import { GalaxiesAccessLayer } from "galaxies-access-layer/dist/galaxies-access-layer.es.js";
import TelegramBot from "node-telegram-bot-api";

export class GalaxiesSdk {
  dal;
  bot;
  website;
  constructor({
    websiteUrl,
    botToken,
    firebaseConfig,
    welcomeMessage,
    buttonLabel,
  }) {
    this.website = websiteUrl;
    this.dal = new GalaxiesAccessLayer().setConfig(firebaseConfig);

    this.bot = new TelegramBot(botToken, { polling: true });

    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const userId = msg.from.id;

      this.bot.sendMessage(chatId, `Welcome ${username}, ${welcomeMessage}`, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: buttonLabel,
                web_app: { url: `${this.website}?userId=${userId}` },
              },
            ],
          ],
        },
      });
    });

    this.bot.on("new_chat_members", (msg) => {
      const chatId = msg.chat.id;
      const newMembers = msg.new_chat_members;

      newMembers.forEach((member) => {
        const userId = member.id;
        const username = member.username || "No username";

        this.bot.sendMessage(chatId, `Welcome ${username}, ${welcomeMessage}`, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: buttonLabel,
                  web_app: { url: `${this.website}?userId=${userId}` },
                },
              ],
            ],
          },
        });
      });
    });

    this.bot.on("message", async (msg) => {
      const chatId = msg.chat.id;
      const userId = msg.from.id;
      const username = msg.from.username || "No username";

      this.bot.sendMessage(chatId, `Welcome ${username}, ${welcomeMessage}`, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `Launch Game`,
                web_app: { url: `${this.website}?userId=${userId}` },
              },
            ],
          ],
        },
      });
    });
  }

  async getTelegramUser(userId) {
    const user = await this.bot.getChat(userId);
    const profilePhotos = await this.bot.getUserProfilePhotos(userId);

    const username = user.username || "No username";

    let photoUrl = null;
    if (profilePhotos.photos.length > 0) {
      const photoFileId = profilePhotos.photos[0][0].file_id;
      const photo = await this.bot.getFile(photoFileId);
      photoUrl = `https://api.telegram.org/file/bot${this.bot.token}/${photo.file_path}`;
    }

    return {
      userId,
      username,
      photoUrl,
    };
  }

  async checkNewUser(userId) {
    const [user] = await this.dal.query("user", "userId", "==", userId);
    return !!user;
  }

  async createNewUser(user) {
    user.ticketCount = 7;
    return await this.dal.add("user", user);
  }

  async reduceTicket(userId) {
    const [user] = await this.dal.query("user", "userId", "==", userId);
    if (user) {
      user.ticketCount = parseFloat(user.ticketCount) - 1;

      return await this.dal.update("user", user.id, user);
    }
  }

  async addTicket(userId) {
    const [user] = await this.dal.query("user", "userId", "==", userId);
    if (user) {
      user.ticketCount = parseFloat(user.ticketCount) + 1;

      return await this.dal.update("user", user.id, user);
    }
  }

  async setScore(userId, score) {
    const [userScoreSheet] = await this.dal.query(
      "scoresheet",
      "userId",
      "==",
      userId
    );
    if (userScoreSheet) {
      userScoreSheet.score =
        parseFloat(userScoreSheet.score) + parseFloat(score);
      return await this.dal.update(
        "scoresheet",
        userScoreSheet.id,
        userScoreSheet
      );
    } else {
      return await this.dal.add("scoresheet", { userId, score });
    }
  }

  async getScore(userId) {
    const [scoreSheet] = await this.dal.query(
      "scoresheet",
      "userId",
      "==",
      userId
    );
    return scoreSheet;
  }
}
