drop type if exists grocery;
create type if not exists grocery as enum(
    'Main',
    'Snack',
    'Lunch',
    'Breakfast'
);

