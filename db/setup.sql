CREATE TABLE jobs(
    id SERIAL PRIMARY KEY,
    customer_id INT,
    name varchar(62),
    price INT,
    description varchar(2000),
    time_spent decimal DEFAULT 0.0,
    status varchar(32),
    parent_job_id INT,
    date_created DATE DEFAULT NOW(),
    date_update DATE DEFAULT NOW(),
    priorty_level INT DEFAULT 1,
    due_date DATE,
    staff_id int,
    received_payment boolean default false,
    completion_date date,
    last_altered_by int
);

CREATE TABLE people(
    id SERIAL PRIMARY KEY,
    name varchar(100),
    email varchar(52),
    phone_number varchar(20),
    username varchar(52),
    password varchar(52),
    person_type varchar(20),
    street varchar(40),
    city varchar(20),
    state varchar(5),
    zip varchar(10)
);

CREATE TABLE staff(
    id SERIAL PRIMARY KEY,
    person_id int,
    title varchar(12),
    pay_amount decimal,
    pay_rate varchar(12),
    admin boolean
);
