-- setup-good.sql: 删除全列索引，建立前缀索引 url(20)
ALTER TABLE t_url_log DROP INDEX idx_url;
ALTER TABLE t_url_log ADD KEY idx_url_prefix (url(20));
