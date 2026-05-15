import type { ReactNode } from 'react';

export interface CommandContext {
  raw: string;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
}

export interface CommandResult {
  output?: ReactNode;
  clear?: boolean;
  navigate?: { href: string; newTab?: boolean };
  scrollTo?: string;
}

export interface CommandDef {
  name: string;
  aliases?: string[];
  summary: string;
  hidden?: boolean;
  run: (args: string[], ctx: CommandContext) => CommandResult;
}

const ME = 'alex.platreta';
const EMAIL = 'platret.alex@gmail.com';
const GH = 'github.com/ia24b-platreta';
const LANGS = ['typescript', 'java', 'python', 'javascript', 'html/css', 'sql', 'c', 'c#'];
const FRAMEWORKS = ['react', 'thymeleaf', 'bootstrap'];
const TOOLS = ['vite', 'bun', 'npm', 'rollup', 'node.js', 'git'];
const DATABASES = ['mysql', 'mariadb', 'mongodb'];
const SECTIONS = ['about', 'skills', 'projects', 'contact', 'top'];

const README = `I build things on the web — clean interfaces, reliable backends, and the
occasional weekend experiment. Currently based in Zürich, sharpening my
craft across modern web tooling and full-stack work.`;

const ABOUT = README;

const ACHIEVEMENTS = `Regionalmeisterschaften 2026
  > Switzerland ........................ rank 11
  > Zürich       ........................ rank  4

// top 11 / CH · top 4 / ZH`;

const CONTACT = `email   ${EMAIL}
github  ${GH}`;

const MAN_PAGE = `NAME
       alex - swiss developer, frontend curious, backend capable

SYNOPSIS
       hire alex [--remote] [--in-zurich] [--stack=ts|java|py]

DESCRIPTION
       Developer based in Zürich, Switzerland. Comfortable across the
       stack with a current bias for clean, fast, accessible interfaces.
       Built this portfolio in React + Vite + a bunch of vanilla CSS.

LOCATION
       Zürich, CH (UTC+1 / UTC+2 DST)

RECOGNITION
       11th in Switzerland · 4th in Zürich
       Regionalmeisterschaften 2026

STACK
       languages    ${LANGS.join(', ')}
       frameworks   ${FRAMEWORKS.join(', ')}
       tools        ${TOOLS.join(', ')}
       data         ${DATABASES.join(', ')}

CONTACT
       email      ${EMAIL}
       github     ${GH}

SEE ALSO
       cat about · ls projects · contact --help`;

const FORTUNES = [
  '“There are two hard things in CS: cache invalidation, naming things, and off-by-one errors.”',
  '“Premature optimization is the root of all evil.” — Donald Knuth',
  '“Talk is cheap. Show me the code.” — Linus Torvalds',
  '“Programs must be written for people to read.” — Abelson & Sussman',
  '“The best error message is the one that never shows up.” — Thomas Fuchs',
  '“It works on my machine. ¯\\_(ツ)_/¯”',
];

function cowsay(text: string): string {
  const line = text || 'moo.';
  const width = Math.min(line.length, 40);
  const top = ' ' + '_'.repeat(width + 2);
  const body = `< ${line.slice(0, width)} >`;
  const bottom = ' ' + '-'.repeat(width + 2);
  return `${top}\n${body}\n${bottom}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
}

export const COMMANDS: CommandDef[] = [
  {
    name: 'help',
    aliases: ['?', 'h'],
    summary: 'show this help',
    run: () => ({
      output: `available commands:

  help, ?              show this help
  whoami               who are you?
  about                short bio
  cat <file>           print file contents
                       (readme.md · about.md · contact · achievements.log)
  ls [target]          list sections / projects / stack
  man alex             long-form info
  theme [green|paper]  get or set color theme
  goto <section>       jump to about · skills · projects · contact
  open <target>        open github · email · linkedin
  date, uptime, pwd    system trivia
  echo <text>          echo text
  fortune              random dev quote
  cowsay <text>        🐄
  clear                clear screen

shortcuts:
  ↑ / ↓                previous / next command
  enter                run command
  esc                  blur input

// hint: some commands you might know from a real shell also work.`,
    }),
  },
  {
    name: 'whoami',
    summary: 'print current user',
    run: () => ({ output: `${ME} — developer · Zürich, CH` }),
  },
  {
    name: 'pwd',
    summary: 'print working directory',
    run: () => ({ output: `/home/${ME}/portfolio` }),
  },
  {
    name: 'date',
    summary: 'print current date',
    run: () => ({ output: new Date().toString() }),
  },
  {
    name: 'uptime',
    summary: 'show how long the user has been at it',
    run: () => ({
      output: 'up since 2024 · regionalmeisterschaften 2026 vet · still curious',
    }),
  },
  {
    name: 'echo',
    summary: 'echo text',
    run: (args) => ({ output: args.join(' ') || '' }),
  },
  {
    name: 'about',
    summary: 'short bio',
    run: () => ({ output: ABOUT }),
  },
  {
    name: 'cat',
    summary: 'print file contents',
    run: (args) => {
      const file = (args[0] || '').toLowerCase().replace(/^\.\//, '');
      const map: Record<string, string> = {
        'readme.md': README,
        readme: README,
        'about.md': ABOUT,
        about: ABOUT,
        contact: CONTACT,
        'contact.md': CONTACT,
        'achievements.log': ACHIEVEMENTS,
        achievements: ACHIEVEMENTS,
        'sources.list': `deb https://github.com/${GH.split('/')[1]} stable main`,
        '/etc/passwd': `nice try.`,
      };
      if (!file) return { output: 'cat: missing operand. try `cat readme.md`.' };
      if (map[file]) return { output: map[file] };
      return { output: `cat: ${args[0]}: No such file or directory` };
    },
  },
  {
    name: 'ls',
    summary: 'list sections / projects / stack',
    run: (args) => {
      const target = (args[0] || '').replace(/\/$/, '').toLowerCase();
      if (!target || target === '.') {
        return {
          output: `about.md         skills/         projects/
contact.md       stack/          achievements.log
readme.md`,
        };
      }
      if (target === 'projects') {
        return {
          output: `total 3
01  project_one    2026  [WIP]
02  project_two    2025
03  project_three  2025`,
        };
      }
      if (target === 'stack' || target === 'skills') {
        return {
          output: `drwxr-xr-x  languages/    ${LANGS.length} items
drwxr-xr-x  frameworks/   ${FRAMEWORKS.length} items
drwxr-xr-x  tools/        ${TOOLS.length} items
drwxr-xr-x  databases/    ${DATABASES.length} items`,
        };
      }
      if (target === 'languages') return { output: LANGS.join('\n') };
      if (target === 'frameworks') return { output: FRAMEWORKS.join('\n') };
      if (target === 'tools') return { output: TOOLS.join('\n') };
      if (target === 'databases' || target === 'data') return { output: DATABASES.join('\n') };
      if (target === 'sections') return { output: SECTIONS.join('\n') };
      return { output: `ls: ${args[0]}: No such file or directory` };
    },
  },
  {
    name: 'man',
    summary: 'show manual page',
    run: (args) => {
      const page = (args[0] || '').toLowerCase();
      if (page === 'alex' || page === ME) return { output: MAN_PAGE };
      if (!page) return { output: 'What manual page do you want?  Try `man alex`.' };
      return { output: `No manual entry for ${args[0]}` };
    },
  },
  {
    name: 'theme',
    summary: 'get or set color theme',
    run: (args, ctx) => {
      const wanted = (args[0] || '').toLowerCase();
      if (!wanted) return { output: `current theme: ${ctx.theme === 'dark' ? 'green' : 'paper'}` };
      if (wanted === 'green' || wanted === 'dark') {
        ctx.setTheme('dark');
        return { output: 'theme set to green.' };
      }
      if (wanted === 'paper' || wanted === 'light') {
        ctx.setTheme('light');
        return { output: 'theme set to paper.' };
      }
      if (wanted === 'toggle') {
        const next = ctx.theme === 'dark' ? 'light' : 'dark';
        ctx.setTheme(next);
        return { output: `theme toggled → ${next === 'dark' ? 'green' : 'paper'}` };
      }
      return { output: `theme: unknown theme '${args[0]}'. try: green · paper.` };
    },
  },
  {
    name: 'goto',
    aliases: ['cd'],
    summary: 'jump to a section',
    run: (args) => {
      const target = (args[0] || '').replace(/^[\/#]/, '').toLowerCase();
      if (!target || target === '~' || target === 'home') return { scrollTo: 'top' };
      if (SECTIONS.includes(target)) return { scrollTo: target, output: `→ #${target}` };
      return { output: `${args[0]}: No such section. try: ${SECTIONS.join(', ')}` };
    },
  },
  {
    name: 'open',
    summary: 'open a link',
    run: (args) => {
      const target = (args[0] || '').toLowerCase();
      if (target === 'github' || target === 'gh') {
        return { navigate: { href: `https://${GH}`, newTab: true }, output: `→ opening ${GH}` };
      }
      if (target === 'email' || target === 'mail') {
        return { navigate: { href: `mailto:${EMAIL}` }, output: `→ ${EMAIL}` };
      }
      if (target === 'pages' || target === 'site') {
        return { navigate: { href: `https://ia24b-platreta.github.io/alex.github.io/`, newTab: true } };
      }
      if (!target) return { output: 'open: targets → github · email' };
      return { output: `open: unknown target '${args[0]}'. try: github, email.` };
    },
  },
  {
    name: 'clear',
    aliases: ['cls'],
    summary: 'clear the screen',
    run: () => ({ clear: true }),
  },
  {
    name: 'fortune',
    summary: 'random dev quote',
    run: () => ({ output: FORTUNES[Math.floor(Math.random() * FORTUNES.length)] }),
  },
  {
    name: 'cowsay',
    summary: 'have a cow say something',
    run: (args) => ({ output: cowsay(args.join(' ')) }),
  },
  {
    name: 'ping',
    summary: 'pong',
    hidden: true,
    run: () => ({ output: 'pong' }),
  },
  {
    name: 'hello',
    aliases: ['hi', 'hey'],
    summary: 'say hi',
    hidden: true,
    run: () => ({ output: 'hello, friend.' }),
  },

  // ────────────── easter eggs ──────────────
  {
    name: 'sudo',
    summary: 'execute as superuser',
    hidden: true,
    run: (args) => {
      const rest = args.join(' ').toLowerCase();
      if (rest === 'hire-me' || rest === 'hire alex' || rest === 'hire-alex') {
        return {
          output: `✓ access granted.
drop me a line: ${EMAIL}`,
        };
      }
      if (rest === 'make sandwich' || rest === 'make me a sandwich') {
        return { output: 'okay.' };
      }
      return {
        output: `${ME} is not in the sudoers file.  This incident will be reported.`,
      };
    },
  },
  {
    name: 'rm',
    summary: 'remove files',
    hidden: true,
    run: (args) => {
      const joined = args.join(' ');
      if (/-rf?\s*\/\s*$/.test(joined) || joined === '-rf /' || joined === '-rf /*' || joined === '-rf *') {
        return {
          output: `rm: refusing to remove '/': that's how you get fired.
(also, this is a static site. there is nothing to remove.)`,
        };
      }
      return { output: `rm: cannot remove '${args.join(' ') || '?'}': Operation not permitted` };
    },
  },
  {
    name: 'vim',
    summary: 'vi improved',
    hidden: true,
    run: () => ({ output: `you cannot leave vim. (try :q — wait, no, you cannot do that either.)` }),
  },
  {
    name: 'nano',
    summary: 'gnu nano',
    hidden: true,
    run: () => ({ output: `not even nano can save you now.` }),
  },
  {
    name: 'emacs',
    summary: 'gnu emacs',
    hidden: true,
    run: () => ({ output: `emacs: a great operating system, lacking only a decent editor.` }),
  },
  {
    name: ':q',
    aliases: [':wq', ':q!', ':wq!', ':x'],
    summary: 'quit vim',
    hidden: true,
    run: () => ({ output: 'you are not in vim.' }),
  },
  {
    name: 'exit',
    aliases: ['quit', 'logout', 'bye'],
    summary: 'log out',
    hidden: true,
    run: () => ({ output: 'no exit. (have you tried `sudo hire-me`?)' }),
  },
  {
    name: 'coffee',
    aliases: ['make-coffee'],
    summary: 'brew coffee',
    hidden: true,
    run: () => ({ output: `HTTP/1.1 418 I'm a teapot` }),
  },
  {
    name: 'donut',
    summary: 'show the donut',
    hidden: true,
    run: () => ({
      output: 'tip: stop touching things for 30 seconds. 🍩',
    }),
  },
];

const INDEX = new Map<string, CommandDef>();
for (const c of COMMANDS) {
  INDEX.set(c.name, c);
  c.aliases?.forEach((a) => INDEX.set(a, c));
}

export function findCommand(name: string): CommandDef | undefined {
  return INDEX.get(name.toLowerCase());
}

export function commandNames(includeHidden = false): string[] {
  return COMMANDS.filter((c) => includeHidden || !c.hidden).map((c) => c.name);
}
