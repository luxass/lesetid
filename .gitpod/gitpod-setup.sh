#!/usr/bin/env bash

# Convert context URL to an array
mapfile -t CONTEXT_URL_ITEMS < <(echo "$GITPOD_WORKSPACE_CONTEXT_URL" | tr '/' '\n')

# Install latest pnpm
curl -fsSL https://get.pnpm.io/install.sh | SHELL=`which bash` bash -

# Check if Gitpod started from a specific example directory in the repository
if [ "${CONTEXT_URL_ITEMS[7]}" = "examples" ]; then
    EXAMPLE_PROJECT=${CONTEXT_URL_ITEMS[8]}
# Otherwise, set the default example project - 'nuxt'
else
    EXAMPLE_PROJECT="nuxt"
fi

# Wait for VSCode to be ready (port 23000)
gp ports await 23000 > /dev/null 2>&1

echo "Loading example project: $EXAMPLE_PROJECT"

# Go to the requested example project
cd "$GITPOD_REPO_ROOT"/examples/"$EXAMPLE_PROJECT" || exit

code README.md

# Run Example
pnpm dev
