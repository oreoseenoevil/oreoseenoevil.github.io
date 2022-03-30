import html from 'assets/icons/html-1.svg';
import sass from 'assets/icons/node-sass.svg';
import javascript from 'assets/icons/logo-javascript.svg';
import typescript from 'assets/icons/typescript.svg';
import nodejs from 'assets/icons/nodejs-1.svg';
import reactjs from 'assets/icons/reactjs.svg';
import redux from 'assets/icons/redux.svg';
import webpack from 'assets/icons/webpack-icon.svg';
import vscode from 'assets/icons/vscode.svg';
import git from 'assets/icons/git-icon.svg';
import aws from 'assets/icons/aws-logo.svg';

export interface Tools {
  link: string;
  src: string;
  alt: string;
  title: string;
}

export const tools: Tools[] = [
  { link: 'https:html.com', src: html, alt: 'html5', title: 'HTML5' },
  { link: 'https:sass-lang.com', src: sass, alt: 'sass', title: 'Sass' },
  {
    link: 'https:www.javascript.com',
    src: javascript,

    alt: 'javascript',
    title: 'Javascript'
  },
  {
    link: 'https:www.typescriptlang.org',
    src: typescript,

    alt: 'html5',
    title: 'TypeScript'
  },
  { link: 'https:www.javascript.com', src: nodejs, alt: 'nodejs', title: 'Nodejs' },
  { link: 'https:reactjs.org', src: reactjs, alt: 'react', title: 'React' },
  { link: 'https:redux.js.org', src: redux, alt: 'redux', title: 'Redux' },
  {
    link: 'https:webpack.js.org',
    src: webpack,
    alt: 'webpack',
    title: 'Webpack'
  },
  { link: 'https:code.visualstudio.com', src: vscode, alt: 'vscode', title: 'VsCode' },
  { link: 'https:git-scm.com', src: git, alt: 'git', title: 'Git' },
  { link: 'https:aws.amazon.com', src: aws, alt: 'git', title: 'Git' }
];
