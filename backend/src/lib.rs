// lib.rs
#[macro_use]
extern crate async_graphql;
#[macro_use]
extern crate lazy_static;
#[macro_use]
extern crate serde;

pub mod schema;

use async_graphql::{EmptySubscription, Schema};
use axum::{
    routing::{get, post},
    AddExtensionLayer, Router,
};
use sqlx::PgPool;
use tower::ServiceBuilder;
use tower_http::cors::{CorsLayer, any};
use tower_http::trace::TraceLayer;


mod dto;
mod error;
mod extractors;
mod graphql;
mod handlers;
mod model;
mod service;
mod sql;
mod utils;

pub mod config;

use axum::{http::StatusCode, response::IntoResponse};

async fn options_handler() -> impl IntoResponse {
    StatusCode::OK
}


pub fn app(pg_pool: PgPool) -> Router {
    use self::graphql::{AppSchema, MutationRoot, QueryRoot};

    let schema: AppSchema = Schema::build(QueryRoot, MutationRoot, EmptySubscription)
        .data(pg_pool.to_owned())
        .finish();

    let middleware_stack = ServiceBuilder::new()
        .layer(TraceLayer::new_for_http())
        .layer(
            CorsLayer::new()
                .allow_origin(any())
                .allow_methods(any())
                .allow_headers(any()),
        )
        .layer(AddExtensionLayer::new(schema))
        .layer(AddExtensionLayer::new(pg_pool.to_owned()))
        .into_inner();

    Router::new()
        .route("/api/auth/login", post(handlers::login))
        .route("/api/auth/register", post(handlers::register))
        .route("/api/auth/authorize", get(handlers::authorize))
        .route(
            "/graphql",
            get(handlers::graphql_playground).post(handlers::graphql),
        )
        .route("/api/articles", get(handlers::list_articles).post(handlers::create_article))
        .route(
            "/api/articles/:id",
            get(handlers::get_article)
                .put(handlers::update_article)
                .delete(handlers::delete_article),
        )
        .route("/api/comments/:id", post(handlers::create_comment))
        .route("/api/comments/:id", get(handlers::list_comments).delete(handlers::delete_comment))
        .layer(middleware_stack)
}
