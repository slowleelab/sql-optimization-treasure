-- bad.sql: url 列建了全索引 idx_url (url)，key_len 高达 1022 字节
-- 全列索引占用空间大，写入与 buffer pool 压力大
SELECT id, url, visit_count, created_at
FROM t_url_log
WHERE url = 'https://www.example.com/p/000123/detail?id=45678';
