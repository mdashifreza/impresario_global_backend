# News Blog Web App Assignment

## Overview
This project aims to create a responsive and user-friendly News Blog application with Crud Operation storing news from https://newsdata.io/ throungh api in mongoDB.

1. **User Registration and Login:**
   - Users can create accounts and log in to access personalized Blog preferences.
   - Firebase used for authentication.
   - **Dummy Login Credentials:**
   - **Email ID:** impresario_global@gmail.com
   - **Password:** global@123

This project is a web application that provides features for user authentication, a dashboard to display articles, article detail pages, and functionality to create, edit, and delete articles.

## Video Demo
link: (https://www.loom.com/share/152f9869ac664bfda7080fb1bc4f1a05?sid=26b68225-1897-475d-bb4d-856f1884474f)

## Features implemented

- [Authentication](#authentication)
- [Dashboard](#dashboard)
- [Article Detail Page](#article-detail-page)
- [Create/Edit Article](#createedit-article)
- [Delete Article](#delete-article)

## Authentication

- Users can register with a username, email, and password.
- Users can log in with their credentials.
- Authentication is required to access certain features (e.g., creating and deleting articles).

## Dashboard

- After logging in, users are directed to a dashboard displaying a list of articles.
- Each article card shows the title, a brief excerpt, and the author's username.

## Article Detail Page

- Clicking on an article card leads to a detailed view of the article.
- The detailed view includes the full content of the article, the author's username, and a back button to return to the dashboard.

## Create/Edit Article

- Authenticated users can create new articles.
- Users can edit their own articles.
- Form fields for the article title and content.

## Delete Article

- Authenticated users can delete their own articles.
- A confirmation modal might be implemented for safety.
  2. **News API Integration:**
   - Utilize an open-source news API (https://newsapi.org/) to fetch the latest news articles.

Utilize an open-source news API (https://newsapi.org/) to fetch the latest news articles.
Display articles in a list and Grid view.
# Test endpoint here : https://impresario-global-backend.vercel.app/api/news-blog-fetch
