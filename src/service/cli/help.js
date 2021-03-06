"use strict";

const chalk = require(`chalk`);

const HELP_MESSAGE = `
Программа запускает http-сервер и формирует файл с данными для API.

     Гайд:
     service.js <command>
     Команды:
      --version: выводит номер версии
      --help: печатает этот текст
      --generate <count> формирует файл mocks.json
      --fill <count> формирует файл с запросами для заполнения базы данных
      --filldb <count> заполняет базу данных <count> записями
`;

module.exports = {
  name: `--help`,
  run: () => console.info(chalk.gray(HELP_MESSAGE)),
};
