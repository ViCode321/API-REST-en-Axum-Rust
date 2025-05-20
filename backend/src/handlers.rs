// handlers.rs
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{
    extract::Extension,
    http::StatusCode,
    response::{Html, IntoResponse},
    Json,
};
use sqlx::PgPool;
use axum::extract::Path;
use crate::{
    config::constants::BEARER,
    dto::{LoginInput, RegisterInput, TokenPayload},
    error::{ApiResult, Error},
    graphql::AppSchema,
    model::User,
    service::AuthService,
    utils::{jwt, validate_payload},
};

use crate::model::CreateArticleData;
use crate::model::Article;
use crate::service::ArticleService;
use uuid::Uuid;
use crate::model::CreateCommentData;
use crate::model::Comment;
use crate::service::CommentService;
use crate::model::UpdateArticleData;
use crate::model::ArticleWithComments;

pub async fn authorize(user: User) -> Json<User> {
    Json(user)
}

pub async fn login(
    Json(input): Json<LoginInput>,
    Extension(pool): Extension<PgPool>,
) -> ApiResult<Json<TokenPayload>> {
    validate_payload(&input)?;
    let user = AuthService::sign_in(input, &pool)
        .await
        .map_err(|_| Error::WrongCredentials)?;
    let token = jwt::sign(user.id)?;
    Ok(Json(TokenPayload {
        token: token,
        //token_type: BEARER.to_string(),
    }))
}

pub async fn register(
    Json(input): Json<RegisterInput>,
    Extension(pool): Extension<PgPool>,
) -> ApiResult<(StatusCode, Json<TokenPayload>)> {
    validate_payload(&input)?;
    let user = AuthService::sign_up(input, &pool).await?;
    let token = jwt::sign(user.id)?;
    Ok((
        StatusCode::CREATED,
        Json(TokenPayload {
            token: token,
            //token_type: BEARER.to_string(),
        }),
    ))
}

pub async fn graphql_playground() -> impl IntoResponse {
    Html(playground_source(GraphQLPlaygroundConfig::new("/graphql")))
}

pub async fn graphql(
    schema: Extension<AppSchema>,
    req: GraphQLRequest,
    user: Option<User>,
) -> GraphQLResponse {
    schema.execute(req.into_inner().data(user)).await.into()
}


pub async fn create_article(
    _user: User,
    Json(payload): Json<CreateArticleData>,
    Extension(pool): Extension<sqlx::PgPool>,
) -> ApiResult<Json<Article>> {
    let article = ArticleService::create_article(payload, &pool).await?;
    Ok(Json(article))
}

pub async fn list_articles(
    _user: User,
    Extension(pool): Extension<sqlx::PgPool>,
) -> ApiResult<Json<Vec<Article>>> {
    let articles = ArticleService::list_articles(&pool).await?;
    Ok(Json(articles))
}

pub async fn get_article(
    Path(id): Path<Uuid>,
    Extension(pool): Extension<PgPool>,
) -> ApiResult<Json<ArticleWithComments>> {
    let article = ArticleService::find_by_id(id, &pool).await?;
    let comments = CommentService::list_comments(article.id, &pool).await?;

    let article_with_comments = ArticleWithComments {
        id: article.id,
        title: article.title,
        content: article.content,
        status: article.status,
        comments,
    };

    Ok(Json(article_with_comments))
}


pub async fn create_comment(
    Path(article_id): Path<Uuid>,
    Json(payload): Json<CreateCommentData>,
    Extension(pool): Extension<sqlx::PgPool>,
) -> ApiResult<Json<Comment>> {
    let comment =
        CommentService::create_comment(payload, article_id, &pool).await?;
    Ok(Json(comment))
}

pub async fn list_comments(
    Path(article_id): Path<Uuid>,
    Extension(pool): Extension<sqlx::PgPool>,
) -> ApiResult<Json<Vec<Comment>>> {
    let comments = CommentService::list_comments(article_id, &pool).await?;
    Ok(Json(comments))
}

pub async fn update_article(
    _user: User,
    Path(id): Path<Uuid>,
    Json(payload): Json<UpdateArticleData>,
    Extension(pool): Extension<sqlx::PgPool>,
) -> ApiResult<Json<Article>> {
    let article = ArticleService::update_article(id, payload, &pool).await?;
    Ok(Json(article))
}

pub async fn delete_article(
    _user: User,
    Path(id): Path<Uuid>,
    Extension(pool): Extension<sqlx::PgPool>,
) -> ApiResult<StatusCode> {
    ArticleService::delete_article(id, &pool).await?;
    Ok(StatusCode::NO_CONTENT)
}

pub async fn delete_comment(
    Path(id): Path<Uuid>,
    Extension(pool): Extension<sqlx::PgPool>,
) -> ApiResult<StatusCode> {
    CommentService::delete_comment(id, &pool).await?;
    Ok(StatusCode::NO_CONTENT)
}
