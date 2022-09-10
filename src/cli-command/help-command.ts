import { CliCommandInterface } from './cli-command.interface';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`${chalk.bold.underline.bgGreen.black('Программа для подготовки данных для REST API сервера.')}
        ${chalk.bold.bgGreen.black('Пример:')}
        main.js ${chalk.italic('--<command> [--arguments]')}

        ${chalk.bold.bgGreen.black('Команды:')}
        ${chalk.italic('--version:')}                   # выводит номер версии
        ${chalk.italic('--help:')}                   # печатает этот текст
        ${chalk.italic('--import <path>:')}                   # импортирует данные из TSV
        ${chalk.italic(' --generator <n> <path> <url>')}                   # генерирует произвольное количество тестовых данных
        `);
  }
}
