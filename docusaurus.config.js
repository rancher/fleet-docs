
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Fleet',
  tagline: '',
  url: 'https://fleet.rancher.io',
  baseUrl: '/',
  onBrokenAnchors: 'throw',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'rancher', // Usually your GitHub org/user name.
  projectName: 'fleet-docs', // Usually your repo name.
  trailingSlash: false,
   markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  themeConfig: {
    colorMode: {
      // "light" | "dark"
      defaultMode: "light",

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true,
    },
    algolia: {
      appId: '5YEVIM7OXD',
      apiKey: '7b97c69c2984ccf1637bedb9b3c43628',
      indexName: 'fleet-rancher',
      contextualSearch: true,
    },
    navbar: {
      title: "Fleet",
      logo: {
        alt: 'logo',
        src: 'img/logo.svg',
      },
      items: [
        {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          {
          type: 'doc',
          docId: 'index',
          position: 'right',
          label: 'Docs',
          className: 'navbar__docs',
        },
        {
          href: 'https://github.com/rancher/fleet',
          label: 'GitHub',
          position: 'right',
          className: 'navbar__github btn btn-secondary icon-github',
        },
        {
          href: 'https://rancher-users.slack.com/channels/fleet',
          position: 'right',
          className: 'header-slack-link',
          'aria-label': 'Slack Channel',
        },
        {
          type: 'dropdown',
          label: 'More from SUSE',
          position: 'right',
          items: [
            {
              href: 'https://www.rancher.com',
              label: 'Rancher',
              className: 'navbar__icon navbar__rancher',
            },
            {
              type: 'html',
              value: '<hr style="margin: 0.3rem 0;">',
            },
            {
              href: 'https://elemental.docs.rancher.com/',
              label: 'Elemental',
              className: 'navbar__icon navbar__elemental'
            },
            {
              href: 'https://harvesterhci.io',
              label: 'Harvester',
              className: 'navbar__icon navbar__harvester',
            },
            {
              href: 'https://rancherdesktop.io',
              label: 'Rancher Desktop',
              className: 'navbar__icon navbar__rd',
            },
            {
              type: 'html',
              value: '<hr style="margin: 0.3rem 0;">',
            },
            {
              href: 'https://opensource.suse.com',
              label: 'More Projects...',
              className: 'navbar__icon navbar__suse',
            },
          ]
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} SUSE Rancher. All Rights Reserved.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          /* other docs plugin options */
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
          editUrl: 'https://github.com/rancher/fleet-docs/edit/main/',
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Next 🚧',
            },
            '0.10': {
              banner: 'none',
            },
            '0.11': {
              banner: 'none',
            },
            '0.12': {
              banner: 'none',
            },
            '0.13': {
              banner: 'none',
            },
          },
        },
        blog: false, // Optional: disable the blog plugin
        // ...
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
        googleTagManager: {
          containerId: 'GTM-57KS2MW',
        },
      },
    ],
  ],
  scripts: [
    {
      src: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
      type:'text/javascript',
      charset: 'UTF-8',
      'data-domain-script': '0f98beb0-fc4c-417d-a42e-564e2cae42d2',
      async: true
    },
    {
      src: '/scripts/optanonwrapper.js',
      type:'text/javascript',
      async: true
    },
  ],
};
