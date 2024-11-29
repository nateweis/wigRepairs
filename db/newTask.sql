INSERT INTO tasks (
    title, pg, priority, count, current_progress, max_progress, measurement, type, status, date_created, date_updated, user_id
) 
VALUES (
    ${title}, ${pg}, ${priority}, ${count}, ${current_progress}, ${max_progress}, ${measurement}, ${type}, ${status}, now(), now(), ${user_id}
)RETURNING id;