INSERT INTO PERMISSIONS (name) VALUES ('financial');
INSERT INTO PERMISSIONS (name) VALUES ('accountability');
INSERT INTO PERMISSIONS (name) VALUES ('sales');

INSERT INTO USERS (is_admin, password, username) VALUES (false, 'hash1', 'João');
INSERT INTO USERS (is_admin, password, username) VALUES (false, 'hash2', 'José');
INSERT INTO USERS (is_admin, password, username) VALUES (false, 'hash3', 'Ana');
INSERT INTO USERS (is_admin, password, username) VALUES (false, 'hash4', 'Maria');
INSERT INTO USERS (is_admin, password, username) VALUES (true, '$2a$10$8y85glhwwS3tCvdkVHREzuhl2RNcbPOXj6ihuMdvj2K7WqWi0LvDS', 'arthur.estevao');
INSERT INTO USERS(is_admin, password, username) VALUES (FALSE, '$2a$10$f664DFGV39cXiRx55s3iyubxLlLeQVSap7WctJgkOjGj7Rp5jg9me', 'drielly.santiago');


INSERT INTO USERS_PERMISSIONS (permission_id, user_id) VALUES (1, 3);
INSERT INTO USERS_PERMISSIONS (permission_id, user_id) VALUES (2, 2);
INSERT INTO USERS_PERMISSIONS (permission_id, user_id) VALUES (3, 1);
INSERT INTO USERS_PERMISSIONS (permission_id, user_id) VALUES (3, 4);
INSERT INTO USERS_PERMISSIONS (permission_id, user_id) VALUES (3, 3);
INSERT INTO USERS_PERMISSIONS (permission_id, user_id) VALUES (2, 3);
INSERT INTO USERS_PERMISSIONS (permission_id, user_id) VALUES (1, 6);
INSERT INTO USERS_PERMISSIONS (permission_id, user_id) VALUES (3, 6);
