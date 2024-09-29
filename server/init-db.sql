create database test_tasks;


\c test_tasks;


create schema if not exists test_task_1;


create table if not exists test_task_1.authors
(
    author_id               serial primary key,
    author_name             varchar(50) not null,
    author_surname          varchar(50),
    author_patronymic       varchar(50),
    author_date_of_birthday date,
    author_points           integer,
    author_rating           numeric
);

create table if not exists test_task_1.books
(
    book_id           serial primary key,
    book_title        varchar(100) not null,
    book_release_date date,
    book_mark         numeric,
    book_price        integer,
    fk_author_id      integer,
    foreign key (fk_author_id) references test_task_1.authors (author_id)
);


insert into test_task_1.authors (author_name, author_surname, author_patronymic, author_date_of_birthday, author_points, author_rating)
values ('Владимир', 'Беляев', 'Маркович', '1997-03-30', 195, 80.0),
       ('София', 'Прокофьева', 'Александровна', '1982-03-07', 177, 50.3),
       ('Руслан', 'Терехов', 'Георгиевич', '1994-05-27', 182, 67.4),
       ('Виктория', 'Лебедева', 'Данииловна', '1999-10-01', 158, 42.6),
       ('Медина', 'Герасимова', 'Кирилловна', '1988-08-12', 165, 44.5),
       ('Теона', 'Некрасова', 'Ивановна', '2002-07-11', 174, 52.1),
       ('Ольга', 'Дубова', 'Максимовна', '1997-07-15', 187, 51.0),
       ('Мария', 'Леонтьева', 'Матвеевна', '2000-04-17', 150, 47.7),
       ('Тигран', 'Шмелев', 'Алексеевич', '1986-01-05', 161, 74.9),
       ('Ольга', 'Скворцова', 'Андреевна', '1989-10-03', 169, 51.0);


insert into test_task_1.books (book_title, book_release_date, book_price, book_mark, fk_author_id)
values ('Товарищи! постоянный количественный рост', '2024-09-01', 700, 3.3, 1),
       ('С другой стороны консультация с широким активом обеспечивает', '2024-09-01', 700, 3.3, 1),
       ('Равным образом рамки и место обучения кадров способствует', '2024-09-01', 700, 4.3, 2),
       ('Не следует, однако забывать, что дальнейшее развитие различных форм', '2024-09-01', 700, 4.5, 3),
       ('Равным образом постоянное информационно-пропагандистское', '2024-09-01', 700, 2.1, 3),
       ('Сложно сказать, почему представители современных', '2024-09-01', 700, 3.6, 4),
       ('Приятно, граждане, наблюдать, как явные признаки победы', '2024-09-01', 700, 4.4, 5),
       ('Таким образом, базовый вектор развития влечет за собой процесс', '2024-09-01', 700, 5.0, 5),
       ('Значимость этих проблем настолько очевидна, что укрепление', '2024-09-01', 700, 3.7, 5),
       ('Повседневная практика показывает, что понимание сути ресурсосберегающих технологий создаёт', '2024-09-01', 700,4.4, 5),
       ('Для современного мира существующая теория способствует', '2024-09-01', 700, 2.8, 5),
       ('Ясность нашей позиции очевидна: курс на социально-ориентированный', '2024-09-01', 700, 4.7, 6),
       ('Учитывая ключевые сценарии поведения, убеждённость', '2024-09-01', 700, 4.6, 7),
       ('С учётом сложившейся международной обстановки, понимание сути', '2024-09-01', 700, 3.9, 8),
       ('Внезапно, некоторые особенности внутренней политик', '2024-09-01', 700, 4.1, 8),
       ('Однозначно, явные признаки победы институционализации', '2024-09-01', 700, 4.0, 9),
       ('Значимость этих проблем настолько очевидна, что новая модель', '2024-09-01', 700, 3.0, 9),
       ('В рамках спецификации современных стандартов', '2024-09-01', 700, 4.3, 9);


create or replace function test_task_1.get_authors(ofs int, lim int) returns json as
$$
declare
    authors_json json;
begin

    select json_agg(
                   json_build_object(
                           'id', author_id,
                           'name', u.author_name,
                           'surname', u.author_surname,
                           'patronymic', u.author_patronymic,
                           'dateOfBirthday', u.author_date_of_birthday,
                           'points', u.author_points,
                           'rating', u.author_rating
                   )
           )
    from (select author_id,
                 author_name,
                 author_surname,
                 author_patronymic,
                 author_date_of_birthday,
                 author_points,
                 author_rating
          from test_task_1.authors
          order by author_surname || author_name || author_patronymic, author_id
          offset ofs limit lim) as u
    into authors_json;

    return authors_json;
end
$$
    language plpgsql;


create or replace function test_task_1.get_authors_count() returns int as
$$
declare
    author_count int;
begin

    select count(*)
    from test_task_1.authors
    into author_count;

    return author_count;

end
$$
    language plpgsql;


create or replace function test_task_1.get_short_list_authors() returns json as
$$
declare
    authors_json json;
begin

    select json_agg(
                   json_build_object(
                           'id', author_id,
                           'name', u.author_name,
                           'surname', u.author_surname,
                           'patronymic', u.author_patronymic
                   )
           )
    from (select author_id,
                 author_name,
                 author_surname,
                 author_patronymic
          from test_task_1.authors
          order by author_surname || author_name || author_patronymic, author_id) as u
    into authors_json;

    return authors_json;
end
$$
    language plpgsql;


create or replace function test_task_1.get_books(ofs int, lim int) returns json as
$$
declare
    books_json json;
begin

    select json_agg(
                   json_build_object(
                           'id', p.book_id,
                           'title', p.book_title,
                           'releaseDate', p.book_release_date,
                           'price', p.book_price,
                           'mark', p.book_mark,
                           'author', json_build_object(
                                   'id', p.fk_author_id,
                                   'name', p.author_name,
                                   'surname', p.author_surname,
                                   'patronymic', p.author_patronymic
                                     )
                   )
           )
    from (select book_id,
                 book_title,
                 book_release_date,
                 book_price,
                 book_mark,
                 fk_author_id,
                 u.author_name,
                 u.author_surname,
                 u.author_patronymic
          from test_task_1.books
                   left join test_task_1.authors u on u.author_id = books.fk_author_id
          order by book_release_date DESC, u.author_id
          offset ofs limit lim) as p
    into books_json;

    return books_json;
end
$$
    language plpgsql;


create or replace function test_task_1.get_books_count() returns int as
$$
declare
    books_count int;
begin

    select count(*)
    from test_task_1.books
    into books_count;

    return books_count;

end
$$
    language plpgsql;


create or replace procedure test_task_1.create_book(bookData json) as
$$
begin

    insert into test_task_1.books (book_title,
                                   book_release_date,
                                   book_price,
                                   book_mark,
                                   fk_author_id)
    values ((bookData ->> 'title')::text,
            (bookData ->> 'releaseDate')::timestamp,
            (bookData ->> 'price')::int,
            (bookData ->> 'mark')::numeric,
            (bookData ->> 'authorId')::int);

end
$$
    language plpgsql;


create or replace procedure test_task_1.update_book(id int, bookData json) as
$$
begin

    update test_task_1.books
    set book_title        = (bookData ->> 'title')::text,
        book_release_date = (bookData ->> 'releaseDate')::timestamp,
        book_price        = (bookData ->> 'price')::int,
        book_mark         = (bookData ->> 'mark')::numeric,
        fk_author_id      = (bookData ->> 'authorId')::int
    where books.book_id = id;

end
$$
    language plpgsql;


create or replace procedure test_task_1.delete_book(id int) as
$$
begin

    delete
    from test_task_1.books
    where book_id = id;

end
$$
    language plpgsql;