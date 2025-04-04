import { Command, Option } from 'clipanion';
import { BaseCommand } from './base';

export class RunCommand extends BaseCommand {
  static override paths = [['run']];

  static override usage = Command.Usage({
    // category: `My category`,
    description: `Run a script from the scripts section in the .<%= config.bin %> file`,
    // details: `
    //   A longer description of the command with some \`markdown code\`.

    //   Multiple paragraphs are allowed. Clipanion will take care of both reindenting the content and wrapping the paragraphs as needed.
    // `,
    // examples: [
    //   [`A basic example`, `$0 my-command`],
    //   [`A second example`, `$0 my-command --with-parameter`],
    // ],
  });

  // name = Option.String(''

  script = Option.String('--script,-s', {
    description: `The script property from the scripts section in the .<%= config.bin %> file`,
    required: true,
  });

  dir = Option.String('--dir,--cwd,-d', {
    description: `Set the directory where the script is being executed. The default is the location of the .<%= config.bin %> file`,
  });

  async execute() {
    await this.init();

    // todo: improve fallback script - if script is not found on upperConfigu, also try to on the localConfigu
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.context.configu.input?.runScript(this.script, { cwd: this.dir }) ??
      this.context.configu.local.runScript(this.script);
  }
}
