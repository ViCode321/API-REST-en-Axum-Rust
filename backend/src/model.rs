// model.rs
use chrono::{DateTime, Utc};
use sqlx::FromRow;
use uuid::Uuid;
use diesel::{Queryable, Identifiable, Associations};
use crate::schema::{articles, comments};

#[derive(Debug, Serialize, Deserialize, Clone, FromRow, SimpleObject)]
pub struct User {
    #[serde(skip_serializing)]
    #[graphql(skip)]
    pub id: Uuid,
    pub name: String,
    pub email: String,
    #[serde(skip_serializing)]
    #[graphql(skip)]
    pub password: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl User {
    pub const TABLE: &'static str = "users";
}

#[derive(Debug)]
pub struct CreateUserData {
    pub name: String,
    pub email: String,
    pub password: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}


#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Identifiable, FromRow)]
pub struct Article {
    pub id: Uuid,
    pub title: String,
    pub content: String,
    pub status: String,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}


#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Identifiable, Associations)]
#[diesel(belongs_to(Article))]
pub struct Comment {
    pub id: Uuid,
    pub content: String,
    pub article_id: Uuid,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Debug, Deserialize)]
pub struct CreateArticleData {
    pub title: String,
    pub content: String,
    pub status: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateCommentData {
    pub content: String,
    pub article_id: Uuid,
}


#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateArticleData {
    pub title: String,
    pub content: String,
    pub status: String,
}

#[derive(Serialize)]
pub struct ArticleWithComments {
    pub id: Uuid,
    pub title: String,
    pub content: String,
    pub status: String,
    pub comments: Vec<Comment>,
}
