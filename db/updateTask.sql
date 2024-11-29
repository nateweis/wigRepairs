UPDATE tasks SET title = ${title}, pg = ${pg}, priority = ${priority}, 
                 count = ${count}, current_progress = ${current_progress}, max_progress = ${max_progress}, measurement = ${measurement}, 
                 type = ${type}, status = ${status}, date_updated = now()
            WHERE id = ${id};