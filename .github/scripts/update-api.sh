#!/bin/bash
set -euxo pipefail

BINARY_URL="https://github.com/clamoriniere/crd-to-markdown/releases/download/v0.0.3/crd-to-markdown_Linux_x86_64"
BINARY_CHECKSUM="2552e9bb3ee2c80e952961ae0de1a7d88aa1c2d859a3ba85e4b88cd6874ea13c"

RELEVANT_CRD_FILES=(
    "pkg/apis/fleet.cattle.io/v1alpha1/bundle_types.go"
    "pkg/apis/fleet.cattle.io/v1alpha1/bundledeployment_types.go"
    "pkg/apis/fleet.cattle.io/v1alpha1/bundlenamespacemapping_types.go"
    "pkg/apis/fleet.cattle.io/v1alpha1/cluster_types.go"
    "pkg/apis/fleet.cattle.io/v1alpha1/clustergroup_types.go"
    "pkg/apis/fleet.cattle.io/v1alpha1/clusterregistration_types.go"
    "pkg/apis/fleet.cattle.io/v1alpha1/clusterregistrationtoken_types.go"
    "pkg/apis/fleet.cattle.io/v1alpha1/content_types.go"
    "pkg/apis/fleet.cattle.io/v1alpha1/gitrepo_types.go"
    "pkg/apis/fleet.cattle.io/v1alpha1/gitreporestriction_types.go"
    "pkg/apis/fleet.cattle.io/v1alpha1/imagescan_types.go"
    # pre v0.9 api files
    "pkg/apis/fleet.cattle.io/v1alpha1/git.go"
    "pkg/apis/fleet.cattle.io/v1alpha1/bundle.go"
    "pkg/apis/fleet.cattle.io/v1alpha1/image.go"
    "pkg/apis/fleet.cattle.io/v1alpha1/target.go"
)

download_binary() {
    curl --fail -L -o crd-to-markdown "$BINARY_URL"
    echo "$BINARY_CHECKSUM crd-to-markdown" | sha256sum --check --status
    chmod +x crd-to-markdown
}

create_markdown() {
    local ref_crd_path="$1"
    local crd_files=""

    for file_path in "${RELEVANT_CRD_FILES[@]}"; do
        [ -f "$file_path" ] && crd_files="$crd_files -f $file_path"
    done

    # shellcheck disable=SC2086
    ../crd-to-markdown $crd_files \
        -n Bundle -n BundleDeployment -n GitRepo -n GitRepoRestriction -n BundleNamespaceMapping -n Content \
        -n Cluster -n ClusterRegistration -n ClusterRegistrationToken -n ClusterGroup -n ImageScan \
        | sed -e 's/\[\]\[/\\[\\]\[/' \
        | sed -e '1 s/### Custom Resources/# Custom Resources Spec/; t' -e '1,// s//# Custom Resources Spec/' \
        | sed -e '1 s/### Sub Resources/# Sub Resources/; t' -e '1,// s//# Sub Resources/' \
        | sed 's/\\n/\
/g' \
        | tail -n +2 \
        > "$ref_crd_path"
}

generate_markdown_files() {
    pushd fleet || exit
    git checkout main
    create_markdown "../fleet-docs/docs/ref-crds.md"
    popd || exit

    for directory in ./fleet-docs/versioned_docs/*; do
        # The old doc versions did not have a ref-crds.md file yet (0.4 and 0.5)
        # or the according api files did not provide a description
        [[ "$directory" =~ \./fleet-docs/versioned_docs/version-0\.[4-8] ]] && continue

        pushd fleet || exit
        version="${directory##*/}"
        version="${version#version-}"
        git checkout "release/v$version"
        create_markdown "../fleet-docs/versioned_docs/version-$version/ref-crds.md"
        popd || exit
    done
}

download_binary
generate_markdown_files