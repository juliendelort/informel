// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const description = `informel is Web Component that wraps native HTML forms. Features: validation errors,
        Native & custom validation rules.validity state, dirty check, auto submission via AJAX call`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'informel',
  tagline: 'Forms with superpowers',
  url: 'https://juliendelort.github.io',

  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'juliendelort', // Usually your GitHub org/user name.
  projectName: 'informel', // Usually your repo name.
  customFields: {
    description,
  },
  clientModules: [
    require.resolve('./visitor.js'),
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-221499687-1',
          anonymizeIP: false,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.svg',
      metadata: [{
        name: 'keywords',
        content: 'informel, forms, form, ajax, html, web component, submit, input, formdata, library, form management'
      }, {
        name: 'description',
        content: description
      }],
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
        disableSwitch: false
      },
      navbar: {
        title: 'informel',
        logo: {
          alt: 'informel Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            href: 'https://github.com/juliendelort/informel',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/',
              },
              {
                label: 'API',
                to: '/api',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                html: '<img src="img/github-mark.svg" width="18" align="center"/>&nbsp;&nbsp;<a style="display:inline-block;" class="footer__link-item" href="https://github.com/juliendelort/informel">Github</a>'
              },
              {
                html: '<img src="img/Twitter-logo.svg" width="18" align="center"/>&nbsp;&nbsp;<a style="display:inline-block;" class="footer__link-item" href="https://twitter.com/informel_js">Twitter</a>'
              }
            ],
          },

        ],
        copyright: `Copyright © ${new Date().getFullYear()} informel, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },

    }),
};

module.exports = config;
