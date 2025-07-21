#!/bin/bash

echo "📈 CI/CD Performance Monitor"
echo "============================"

# Project analysis
echo ""
echo "📁 Project Analysis:"
echo "==================="
echo "Source files: $(find src -name '*.js' 2>/dev/null | wc -l)"
echo "Test files: $(find tests -name '*.js' 2>/dev/null | wc -l)"
echo "Workflow files: $(find .github/workflows -name '*.yml' 2>/dev/null | wc -l)"

if [ -f "package.json" ]; then
    echo "Dependencies: $(jq -r '.dependencies // {} | keys | length' package.json 2>/dev/null || echo 'unknown')"
    echo "Dev dependencies: $(jq -r '.devDependencies // {} | keys | length' package.json 2>/dev/null || echo 'unknown')"
fi

if [ -d "node_modules" ]; then
    echo "Node modules size: $(du -sh node_modules 2>/dev/null | cut -f1)"
fi

# Build analysis
echo ""
echo "🏗️ Build Analysis:"
echo "=================="
if [ -d "dist" ]; then
    echo "Build output size: $(du -sh dist 2>/dev/null | cut -f1)"
    echo "Build files: $(find dist -type f | wc -l)"
else
    echo "No build output found (run 'npm run build')"
fi

# Performance recommendations
echo ""
echo "💡 Performance Recommendations:"
echo "==============================="

if [ -f "package-lock.json" ]; then
    echo "✅ Package lock file present (good for caching)"
else
    echo "⚠️ No package lock file (impacts cache effectiveness)"
fi

WORKFLOW_COUNT=$(find .github/workflows -name '*.yml' 2>/dev/null | wc -l)
if [ "$WORKFLOW_COUNT" -le 5 ]; then
    echo "✅ Workflow count is manageable ($WORKFLOW_COUNT workflows)"
else
    echo "⚠️ Many workflows ($WORKFLOW_COUNT) - consider consolidation"
fi

echo ""
echo "🎯 Optimization Tips:"
echo "- Use npm ci instead of npm install in CI"
echo "- Implement dependency caching"
echo "- Use parallel job execution"
echo "- Cache build outputs between stages"
echo "- Monitor build times and set timeouts"

echo ""
echo "🔗 View workflows: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]//' | sed 's/.git$//')/actions"