module.exports = {
  docs: [
    'index',
    {
      type: 'category',
      label: 'Tutorials',
      collapsed: false,
      items:[
        'quickstart',
        'tut-deployment',
        {type:'doc', id:'uninstall'},
      ],
    },
    {
      type: 'category',
      label: 'Explanations',
      collapsed: false,
      items:[
        'architecture',
        'concepts',
        'ref-bundle-stages',
        'ref-components',
        'namespaces',
        'ref-resources',
      ],
    },
    {
      type: 'category',
      label: 'How-tos for Operators',
      collapsed: false,
      items:[
        {type: 'doc', id: 'installation'},
        {
          'Registering Clusters':
          [
            {type: 'doc', id: 'cluster-overview'},
            {type: 'doc', id: 'agent-initiated'},
            {type: 'doc', id: 'manager-initiated'},
          ],
        },
        {type:'doc', id:'cluster-group'},
        'multi-tenancy',
      ],
    },
    {
      type: 'category',
      label: 'How-tos for Users',
      collapsed: false,
      items:[
        {type:'doc', id:'gitrepo-add'},
        {type:'doc', id:'gitrepo-structure'},
        {type:'doc', id:'gitrepo-targets'},
        {type:'doc', id:'bundle-diffs'},
        {type:'doc', id:'webhook'},
        {type:'doc', id:'imagescan'},
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items:[
        {
          'CLI':
          [
            {type: 'doc', id: 'cli/fleet-agent/fleet-agent'},
            {
              'fleet-gitjob-cli': [
                {type: 'doc', id: 'cli/fleet-cli/fleet'},
                {type: 'doc', id: 'cli/fleet-cli/fleet_apply'},
                {type: 'doc', id: 'cli/fleet-cli/fleet_test'},
              ],
            },
            {type: 'doc', id: 'cli/fleet-controller/fleet-manager'},
          ],
        },
        {type:'doc', id:'cluster-bundles-state'},
        'ref-registration',
        'ref-configuration',
        "ref-crds",
        'ref-fleet-yaml',
        'ref-crd-gitrepo',
      ],
    },
    'troubleshooting',
  ],
};
