
diesel::table! {
    users (id) {
        id -> Integer,
        name -> Varchar,
        email -> Varchar,
        password -> Varchar,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    articles (id) {
        id -> Integer,
        title -> Varchar,
        content -> Text,
        status -> Varchar,
        created_at -> Timestamp,
    }
}

diesel::table! {
    comments (id) {
        id -> Integer,
        content -> Text,
        article_id -> Integer,
        created_at -> Timestamp,
    }
}

diesel::joinable!(comments -> articles (article_id));

diesel::allow_tables_to_appear_in_same_query!(
    articles,
    comments,
    users,
);
