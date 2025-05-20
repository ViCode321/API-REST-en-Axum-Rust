use chrono::Utc;
use sqlx::PgPool;
use uuid::Uuid;

use crate::{
    dto::{LoginInput, RegisterInput},
    error::{Error, Result},
    model::{
        Article, Comment, CreateArticleData, CreateCommentData, CreateUserData, UpdateArticleData,
        User,
    },
    utils::encryption,
};

pub struct AuthService;

impl AuthService {
    pub async fn sign_in(input: LoginInput, pool: &PgPool) -> Result<User> {
        let user = User::find_by_email(&input.email, &pool).await?;
        if encryption::verify_password(input.password, user.password.to_owned()).await? {
            Ok(user)
        } else {
            Err(Error::WrongPassword)
        }
    }

    pub async fn sign_up(input: RegisterInput, pool: &PgPool) -> Result<User> {
        if User::find_by_email(&input.email, &pool).await.is_ok() {
            return Err(Error::DuplicateUserEmail);
        }
        if User::find_by_name(&input.name, &pool).await.is_ok() {
            return Err(Error::DuplicateUserName);
        }

        let data = CreateUserData {
            name: input.name,
            email: input.email,
            password: encryption::hash_password(input.password).await?,
            created_at: Utc::now(),
            updated_at: Utc::now(),
        };
        Ok(User::create(data, &pool).await?)
    }
}

pub struct ArticleService;

impl ArticleService {
    pub async fn create_article(
        data: CreateArticleData,
        pool: &PgPool,
    ) -> Result<Article> {
        let now = Utc::now().naive_utc();
        let article = sqlx::query_as!(
            Article,
            r#"
            INSERT INTO articles (title, content, status, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, title, content, status, created_at, updated_at
            "#,
            data.title,
            data.content,
            data.status,
            now,
            now,
            )
            .fetch_one(pool)
            .await?;
        Ok(article)
    }

pub async fn find_by_id(id: Uuid, pool: &PgPool) -> Result<Article> {
    let article = sqlx::query_as!(
        Article,
        r#"
        SELECT id, title, content, status, created_at, updated_at
        FROM articles
        WHERE id = $1
        "#,
        id
    )
    .fetch_one(pool)
    .await?;

    Ok(article)
}



    pub async fn list_articles(pool: &PgPool) -> Result<Vec<Article>> {
        let articles = sqlx::query_as!(
            Article,
            r#"
            SELECT id, title, content, status, created_at, updated_at
            FROM articles
            ORDER BY created_at DESC
            "#
        )
        .fetch_all(pool)
        .await?;
        Ok(articles)
    }

    pub async fn get_article(id: Uuid, pool: &PgPool) -> Result<Article> {
        let article = sqlx::query_as!(
            Article,
            r#"
            SELECT id, title, content, status, created_at, updated_at
            FROM articles
            WHERE id = $1
            "#,
            id,
        )
        .fetch_one(pool)
        .await?;
        Ok(article)
    }

    pub async fn update_article(
        id: Uuid,
        data: UpdateArticleData,
        pool: &PgPool,
    ) -> Result<Article> {
        let now = Utc::now().naive_utc();
        let updated_article = sqlx::query_as!(
            Article,
            r#"
            UPDATE articles
            SET title = $1,
                content = $2,
                status = $3,
                updated_at = $4
            WHERE id = $5
            RETURNING id, title, content, status, created_at, updated_at
            "#,
            data.title,
            data.content,
            data.status,
            now,
            id,
        )
        .fetch_one(pool)
        .await?;
        Ok(updated_article)
    }

    pub async fn delete_article(
        id: Uuid,
        pool: &PgPool,
    ) -> Result<()> {
        sqlx::query!(
            "DELETE FROM articles WHERE id = $1",
            id
        )
        .execute(pool)
        .await?;

        Ok(())
    }
}

pub struct CommentService;

impl CommentService {
    pub async fn create_comment(
        data: CreateCommentData,
        _article_id: Uuid,
        pool: &PgPool,
    ) -> Result<Comment> {
        let _now = Utc::now().naive_utc();
        let comment = sqlx::query_as!(
            Comment,
            r#"
            INSERT INTO comments (content, article_id, created_at)
            VALUES ($1, $2, $3)
            RETURNING id, content, article_id, created_at
            "#,
            data.content,
            data.article_id,
            Utc::now().naive_utc(),
        )
        .fetch_one(pool)
        .await?;        
        Ok(comment)
    }

    pub async fn list_comments(article_id: Uuid, pool: &PgPool) -> Result<Vec<Comment>> {
        let comments = sqlx::query_as!(
            Comment,
            r#"
            SELECT id, content, article_id, created_at
            FROM comments
            WHERE article_id = $1
            ORDER BY created_at DESC
            "#,
            article_id,
        )
        .fetch_all(pool)
        .await?;
        Ok(comments)
    }

    pub async fn delete_comment(
        id: Uuid,
        pool: &PgPool,
    ) -> Result<()> {
        sqlx::query!(
            "DELETE FROM comments WHERE id = $1",
            id
        )
        .execute(pool)
        .await?;

        Ok(())
    }
}
