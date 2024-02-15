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
import stripe from 'assets/icons/stripe.svg';
import prisma from 'assets/icons/prisma.svg';
import nextjs from 'assets/icons/nextjs.svg';
import angular from 'assets/icons/angular.svg';
import gitlab from 'assets/icons/gitlab.svg';
import mysql from 'assets/icons/mysql.svg';
import postgresql from 'assets/icons/postgresql.svg';
import docker from 'assets/icons/docker.svg';
import openai from 'assets/icons/openai.svg';
import google from 'assets/icons/google.svg';
import auth0 from 'assets/icons/auth0.svg';
import mongodb from 'assets/icons/mongodb.svg';
import vercel from 'assets/icons/vercel.svg';

export interface Tools {
  link: string;
  src: string;
  alt: string;
  title: string;
}

export const tools: Tools[] = [
  {
    link: 'https://www.javascript.com',
    src: javascript,

    alt: 'javascript',
    title: 'Javascript'
  },
  {
    link: 'https://www.typescriptlang.org',
    src: typescript,

    alt: 'html5',
    title: 'TypeScript'
  },
  { link: 'https://nodejs.org', src: nodejs, alt: 'nodejs', title: 'Nodejs' },
  { link: 'https://reactjs.org', src: reactjs, alt: 'react', title: 'React' },
  { link: 'https://nextjs.org/', src: nextjs, alt: 'Nextjs', title: 'Nextjs' },
  { link: 'https://angular.io/', src: angular, alt: 'angular', title: 'angular' },
  { link: 'https://docker.com/', src: docker, alt: 'docker', title: 'docker' },
  { link: 'https://mongodb.com/', src: mongodb, alt: 'mongodb', title: 'mongodb' },
  { link: 'https://www.mysql.com/', src: mysql, alt: 'mysql', title: 'mysql' },
  { link: 'https://www.postgresql.org/', src: postgresql, alt: 'postgresql', title: 'postgresql' },
  { link: 'https://www.prisma.io/', src: prisma, alt: 'Prisma', title: 'Prisma' },
  { link: 'https://openai.com/', src: openai, alt: 'openai', title: 'openai' },
  { link: 'https://html.com', src: html, alt: 'html5', title: 'HTML5' },
  { link: 'https://sass-lang.com', src: sass, alt: 'sass', title: 'Sass' },
  { link: 'https://redux.js.org', src: redux, alt: 'redux', title: 'Redux' },
  {
    link: 'https://webpack.js.org',
    src: webpack,
    alt: 'webpack',
    title: 'Webpack'
  },
  { link: 'https://code.visualstudio.com', src: vscode, alt: 'vscode', title: 'VsCode' },
  { link: 'https://git-scm.com', src: git, alt: 'git', title: 'Git' },
  { link: 'https://about.gitlab.com/', src: gitlab, alt: 'gitlab', title: 'gitlab' },
  { link: 'https://aws.amazon.com', src: aws, alt: 'aws', title: 'aws' },
  {
    link: 'https://stripe.com',
    src: stripe,
    alt: 'stripe',
    title: 'Stripe'
  },
  {
    link: 'https://www.goshippo.com/',
    src: 'https://assets-global.website-files.com/6462967bbf70fa5b5b227351/64aeae2b3606461bdc652c3c_icon-256x256.png',
    alt: 'goshippo',
    title: 'goshippo'
  },
  { link: 'https://www.google.com/', src: google, alt: 'google', title: 'google' },
  {
    link: 'https://www.vercel.com/',
    src: vercel,
    alt: 'vercel',
    title: 'vercel'
  },
  { link: 'https://www.auth0.com/', src: auth0, alt: 'auth0', title: 'auth0' }
];
