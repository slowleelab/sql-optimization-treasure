#!/usr/bin/env bash
# ============================================================
# lint-cases.sh - 校验所有案例是否包含必需文件
# 用法: ./scripts/lint-cases.sh
# ============================================================
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

CASES_DIR="sql/cases"
ERRORS=0
WARNINGS=0

# 必需文件列表
REQUIRED_FILES=(
  "case.yml"
  "schema.sql"
  "seed.sql"
  "bad.sql"
  "good.sql"
)

# expected 目录下必需的文件
REQUIRED_EXPECTED=(
  "explain-bad.md"
  "explain-good.md"
)

echo "🔍 检查案例文件完整性..."
echo ""

for case_dir in "$CASES_DIR"/*/; do
  [[ -d "$case_dir" ]] || continue
  case_name=$(basename "$case_dir")
  has_error=false

  # 检查必需文件
  for file in "${REQUIRED_FILES[@]}"; do
    if [[ ! -f "${case_dir}${file}" ]]; then
      echo -e "${RED}❌ ${case_name}: 缺少 ${file}${NC}"
      ERRORS=$((ERRORS + 1))
      has_error=true
    fi
  done

  # 检查 expected 目录
  if [[ ! -d "${case_dir}expected" ]]; then
    echo -e "${RED}❌ ${case_name}: 缺少 expected/ 目录${NC}"
    ERRORS=$((ERRORS + 1))
    has_error=true
  else
    for file in "${REQUIRED_EXPECTED[@]}"; do
      if [[ ! -f "${case_dir}expected/${file}" ]]; then
        echo -e "${YELLOW}⚠️  ${case_name}: 缺少 expected/${file}${NC}"
        WARNINGS=$((WARNINGS + 1))
        has_error=true
      fi
    done
  fi

  # 检查对应的文档 .md 是否存在
  # 从 case.yml 读取 category
  if command -v yq &>/dev/null; then
    category=$(yq '.category' "${case_dir}case.yml" 2>/dev/null || echo "")
  else
    category=$(grep '^category:' "${case_dir}case.yml" 2>/dev/null | awk '{print $2}' || echo "")
  fi

  if [[ -n "$category" ]]; then
    doc_file="docs/cases/${category}/${case_name}.md"
    if [[ ! -f "$doc_file" ]]; then
      echo -e "${YELLOW}⚠️  ${case_name}: 缺少文档 ${doc_file}${NC}"
      WARNINGS=$((WARNINGS + 1))
    fi
  fi

  if [[ "$has_error" == false ]]; then
    echo -e "${GREEN}✅ ${case_name}${NC}"
  fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "错误: ${RED}${ERRORS}${NC}  警告: ${YELLOW}${WARNINGS}${NC}"

if [[ $ERRORS -gt 0 ]]; then
  exit 1
else
  exit 0
fi
