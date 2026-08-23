#!/usr/bin/env bash
set -e

# ==============================================================================
# Script: create-release-branch.sh
# Purpose: Create a local release branch without pushing to remote
# Matching SemVer format: release/vX.Y.Z or release/X.Y.Z
# ==============================================================================

# Ensure we are at the repository root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 1. Read current version from VERSION file or package.json
if [[ -f "VERSION" ]]; then
  CURRENT_VERSION=$(tr -d '[:space:]' < VERSION)
elif [[ -f "package.json" ]]; then
  CURRENT_VERSION=$(node -p "require('./package.json').version")
else
  CURRENT_VERSION="0.1.0"
fi

echo "=================================================="
echo "🚀 Create Release Branch"
echo "📌 Current version: $CURRENT_VERSION"
echo "=================================================="

# 2. Determine target release version
TARGET_ARG="$1"

if [[ -z "$TARGET_ARG" ]]; then
  # Default to current version or prompt
  TARGET_VERSION="$CURRENT_VERSION"
elif [[ "$TARGET_ARG" == "patch" || "$TARGET_ARG" == "minor" || "$TARGET_ARG" == "major" ]]; then
  # Calculate next semver with npm
  TARGET_VERSION=$(node -e "
    const [maj, min, pat] = '$CURRENT_VERSION'.split('.').map(Number);
    if ('$TARGET_ARG' === 'major') console.log(\`\${maj + 1}.0.0\`);
    else if ('$TARGET_ARG' === 'minor') console.log(\`\${maj}.\${min + 1}.0\`);
    else console.log(\`\${maj}.\${min}.\${pat + 1}\`);
  ")
else
  # Explicit version argument passed (e.g. 0.2.0 or v0.2.0)
  TARGET_VERSION="${TARGET_ARG#v}"
fi

# 3. Validate SemVer format
SEMVER_REGEX="^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$"
if [[ ! "$TARGET_VERSION" =~ $SEMVER_REGEX ]]; then
  echo "❌ Error: Version '$TARGET_VERSION' is not a valid Semantic Version (format: X.Y.Z)"
  exit 1
fi

BRANCH_NAME="release/v${TARGET_VERSION}"

echo "🎯 Target release version: $TARGET_VERSION"
echo "🌿 Branch name:           $BRANCH_NAME"
echo "--------------------------------------------------"

# 4. Check if branch already exists
if git show-ref --quiet --heads "$BRANCH_NAME"; then
  echo "⚠️  Branch '$BRANCH_NAME' already exists locally."
  read -p "Do you want to switch to it? (y/N): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git checkout "$BRANCH_NAME"
  else
    echo "Aborted."
    exit 1
  fi
else
  # Create and checkout new branch
  echo "Creating and checking out branch: $BRANCH_NAME"
  git checkout -b "$BRANCH_NAME"
fi

# 5. Update VERSION file
echo "$TARGET_VERSION" > VERSION
echo "✅ Updated VERSION to $TARGET_VERSION"

# 6. Update package.json version
node -e "
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  pkg.version = '$TARGET_VERSION';
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"
echo "✅ Updated package.json version to $TARGET_VERSION"

# 7. Commit changes locally if modified
if [[ -n $(git status --porcelain VERSION package.json) ]]; then
  git add VERSION package.json
  git commit -m "chore(release): prepare release v${TARGET_VERSION}"
  echo "✅ Committed release version updates locally"
fi

echo "=================================================="
echo "🎉 Release branch '$BRANCH_NAME' created successfully!"
echo "⚠️  NOTE: No git push was performed."
echo ""
echo "Next steps:"
echo "  1. Test & verify:   npm test && npm run build"
echo "  2. Push to remote:  git push -u origin $BRANCH_NAME"
echo "=================================================="
