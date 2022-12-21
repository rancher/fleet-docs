module.exports = {
  docs: [
    'index',
    'quickstart',
    'concepts',
    'architecture',
    'examples',
    {
      type: 'category',
      label: 'Operator Guide',
      items:[
        {
          'Registering Clusters':
          [
            {type: 'doc', id: 'cluster-overview'},
            {type: 'doc', id: 'cluster-tokens'},
            {type: 'doc', id: 'agent-initiated'},
            {type: 'doc', id: 'manager-initiated'},
          ],
        },
        {type:'doc', id:'cluster-group'},
        'namespaces',
        'multi-tenancy',
      ],
    },
    {
      type: 'category',
      label: 'User Guide',
      items:[
            {type:'doc', id:'gitrepo-add'},
            {type:'doc', id:'gitrepo-structure'},
            {type:'doc', id:'gitrepo-targets'},
            {type:'doc', id:'bundle-diffs'},
            {type:'doc', id:'webhook'},
            {type:'doc', id:'imagescan'},
          ],
    },
    'troubleshooting',
    {
      type: 'category',
      label: 'Advanced Users',
      items:[
        'advanced-users',
        {
          'Installation':
          [
            {type:'doc', id:'installation'},
            {type:'doc', id:'single-cluster-install'},
            {type:'doc', id:'multi-cluster-install'},
            {type:'doc', id:'uninstall'},
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items:[
        {type:'doc', id:'cluster-bundles-state'},
        'ref-crd-gitrepo',
        'ref-fleet-yaml',
        'ref-bundle-stages',
        'ref-components',
        'ref-namespaces',
        'ref-resources',
        'ref-configuration',
        'ref-registration',
        "ref-crds",
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
      ],
    },
  ],
};
