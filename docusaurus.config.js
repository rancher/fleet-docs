
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Fleet',
  tagline: '',
  url: 'https://fleet.rancher.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'rancher', // Usually your GitHub org/user name.
  projectName: 'fleet-docs', // Usually your repo name.
  trailingSlash: false,
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
            '0.6': {
              banner: 'none',
            },
          },
        },
        blog: false, // Optional: disable the blog plugin
        // ...
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
      },
    ],
  ],
};
