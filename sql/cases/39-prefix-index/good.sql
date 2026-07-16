-- good.sql: 改用前缀索引 idx_url_prefix (url(20))，key_len 仅 82 字节
-- 需先执行 setup-good.sql 删除全索引并建立前缀索引
SELECT id, url, visit_count, created_at
FROM t_url_log
WHERE url = 'https://www.example.com/p/000123/detail?id=45678';
