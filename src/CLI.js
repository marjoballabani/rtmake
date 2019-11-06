import inquirer from 'inquirer'
import fs from 'fs'
import simpleGit from 'simple-git/promise'
import figlet from 'figlet'
import ora from 'ora'
import marked from 'marked'
import TerminalRenderer from 'marked-terminal'
import {constants} from './const'

const TYPES = constants.TYPES
const GITHUB_BASE = constants.GITHUB_BASE

const QUESTIONS = [
    {
      name: 'type',
      type: 'list',
      message: 'What kind of project do you want to create?',
      choices: TYPES
    },
    {
      name: 'name',
      type: 'input',
      message: 'Project name:',
      validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else return 'Project name may only include letters, numbers, underscores and hashes.';
      }
    }
  ];

export default class RTmake {

    _documentation(name) {
        marked.setOptions({ renderer: new TerminalRenderer() })
        const markdown = fs.readFileSync(`${process.cwd()}/${name}/README.md`, "utf8")
        console.log(marked(markdown))
    }

    _welcome() {
        let data = figlet.textSync('Ritech')
        console.log(data)
    }

    async _clone(name) {
        try {
            const spinner = ora('Cloning project boilerplate').start();
            await simpleGit().silent(true).clone(`${GITHUB_BASE}uber-giphy`, name)
            this._documentation(name)
            spinner.succeed("Project generated")
            process.exit()
        } catch (err) {
            console.error(' failed: \n', err.message)
            process.exit()
        }
    }

     async _askQuestions () {
        const answers = await inquirer.prompt(QUESTIONS)
        switch (answers.type) {
            case 'React':
                this._clone(answers.name)
                break;
            default:
                console.log("At this version only React.js works, still a beta version")
                break;
        }
    }

    async execute(args) {
        this._welcome()
        await this._askQuestions()
    }

}
