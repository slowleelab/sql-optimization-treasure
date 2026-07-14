#!/usr/bin/env bash
#
# seed-db.sh — 单独执行造数据（某些案例数据量大，可提前造好）
#
# 用法: ./scripts/seed-db.sh <case-dir> [--ver 5.7|8.0]
#
set -euo pipefail

CASE_DIR="${1:-}"
MYSQL_VER="${2:-8.0}"

if [[ -z "$CASE_DIR" ]]; then
  echo "用法: $0 <case-dir> [--ver 5.7|8.0]"
  exit 1
fi

# 兼容 --ver 参数
if [[ "$MYSQL_VER" == "--ver" ]]; then
  MYSQL_VER="${3:-8.0}"
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CASE_PATH="$PROJECT_ROOT/sql/cases/$CASE_DIR"

case "$MYSQL_VER" in
  5.7) PORT=3307 ;;
  8.0) PORT=3308 ;;
  *) echo "错误: 不支持的版本 $MYSQL_VER"; exit 1 ;;
esac

MYSQL_CMD="mysql -h 127.0.0.1 -P $PORT -uroot -proot sql_treasure"

echo "▶ 在 MySQL $MYSQL_VER 上为案例 $CASE_DIR 造数据..."

if [[ -f "$CASE_PATH/schema.sql" ]]; then
  echo "  建表..."
  $MYSQL_CMD < "$CASE_PATH/schema.sql"
fi

if [[ -f "$CASE_PATH/seed.sql" ]]; then
  echo "  造数据（可能需要几十秒）..."
  $MYSQL_CMD < "$CASE_PATH/seed.sql"
  echo "  ✓ 完成"
else
  echo "  ⚠ 未找到 seed.sql"
fi
