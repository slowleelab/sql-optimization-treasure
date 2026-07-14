#!/usr/bin/env bash
#
# compare-explain.sh — 精简版：只跑 bad/good 的 EXPLAIN，输出横向对比
#
# 用法: ./scripts/compare-explain.sh <case-dir> [--ver 5.7|8.0]
#
set -euo pipefail

CASE_DIR=""
MYSQL_VER="8.0"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --ver) MYSQL_VER="$2"; shift 2 ;;
    *) CASE_DIR="$1"; shift ;;
  esac
done

[[ -z "$CASE_DIR" ]] && { echo "用法: $0 <case-dir> [--ver 5.7|8.0]"; exit 1; }

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CASE_PATH="$PROJECT_ROOT/sql/cases/$CASE_DIR"

case "$MYSQL_VER" in
  5.7) PORT=3307 ;;
  8.0) PORT=3308 ;;
esac

MYSQL_CMD="mysql -h 127.0.0.1 -P $PORT -uroot -proot sql_treasure -N -B"

echo "━━━ EXPLAIN 对比: $CASE_DIR (MySQL $MYSQL_VER) ━━━"
echo ""

for label in bad good; do
  FILE="$CASE_PATH/$label.sql"
  [[ ! -f "$FILE" ]] && continue
  echo "── $label.sql ──"
  $MYSQL_CMD -e "EXPLAIN $(cat "$FILE");" | awk -F'\t' 'BEGIN{print "id\tselect_type\ttable\tpartitions\ttype\tpossible_keys\tkey\tkey_len\tref\trows\tfiltered\tExtra"}{print}'
  echo ""
done
